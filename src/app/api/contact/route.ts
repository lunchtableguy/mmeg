import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json().catch(()=> ({}))
  if (!name || !email || !message) {
    return NextResponse.json({ ok:false, error:'Missing fields' }, { status: 400 })
  }

  // TODO: send email via Resend/SendGrid/etc.
  console.log('CONTACT', { name, email, subject, message })

  return NextResponse.json({ ok:true })
}