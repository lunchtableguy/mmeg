import { NextResponse } from 'next/server'
import { cookies, headers } from 'next/headers'
import crypto from 'crypto'
import { prisma } from '@/lib/db'
import { CONSENT_COOKIE, CONSENT_VERSION, defaultConsent } from '@/lib/consent'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  const data = await req.json().catch(() => null)
  if (!data) return NextResponse.json({ ok: false }, { status: 400 })

  const { functional, analytics, advertising, doNotSellShare, source } = data as {
    functional: boolean
    analytics: boolean
    advertising: boolean
    doNotSellShare: boolean
    source: string
  }

  // Get session info if available
  const session = await getServerSession()
  const userId = session?.user?.id || null

  // Get request metadata
  const hdrs = await headers()
  const ip = (hdrs.get('x-forwarded-for') || hdrs.get('x-real-ip') || '').split(',')[0]?.trim() || '0.0.0.0'
  const ipHash = crypto.createHash('sha256').update(ip).digest('hex')
  const userAgent = hdrs.get('user-agent') || ''
  const gpc = hdrs.get('Sec-GPC') === '1'
  const region = hdrs.get('x-vercel-ip-country') || null
  
  // Get or create session ID
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('mmeg_sid')?.value || crypto.randomUUID()
  if (!cookieStore.get('mmeg_sid')) {
    cookieStore.set('mmeg_sid', sessionId, { 
      httpOnly: true, 
      sameSite: 'lax', 
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 365 // 1 year
    })
  }

  // Get current consent state
  const beforeCookie = cookieStore.get(CONSENT_COOKIE)?.value
  const before = beforeCookie ? JSON.parse(beforeCookie) : defaultConsent(gpc)
  
  // Build new consent state (respecting GPC)
  const after = {
    necessary: true,
    functional: !!functional,
    analytics: gpc ? false : !!analytics,
    advertising: gpc ? false : !!advertising,
    doNotSellShare: gpc ? true : !!doNotSellShare,
    gpc,
    version: CONSENT_VERSION,
    ts: new Date().toISOString(),
  }

  try {
    // Upsert consent state by session
    const state = await prisma.consentState.upsert({
      where: { sessionId },
      update: {
        userId,
        functional: after.functional,
        analytics: after.analytics,
        advertising: after.advertising,
        doNotSellShare: after.doNotSellShare,
        gpc: after.gpc,
        version: after.version,
        region,
      },
      create: {
        sessionId,
        userId,
        region,
        necessary: true,
        functional: after.functional,
        analytics: after.analytics,
        advertising: after.advertising,
        doNotSellShare: after.doNotSellShare,
        gpc: after.gpc,
        version: after.version,
      },
    })

    // Log consent event
    await prisma.consentEvent.create({
      data: {
        stateId: state.id,
        sessionId,
        userId,
        ipHash,
        userAgent: userAgent.substring(0, 500), // limit length
        region,
        gpc,
        source: source || 'banner',
        version: CONSENT_VERSION,
        beforeJson: before,
        afterJson: after,
      },
    })
  } catch (error) {
    console.error('Failed to log consent:', error)
    // Continue even if DB logging fails
  }

  // Set consent cookie
  cookieStore.set(CONSENT_COOKIE, JSON.stringify(after), {
    httpOnly: false, // Needs to be readable by client-side scripts
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365 * 2, // 2 years
    secure: process.env.NODE_ENV === 'production',
  })

  return NextResponse.json({ ok: true, consent: after })
}

export async function GET() {
  const consent = getServerConsent()
  return NextResponse.json(consent)
}