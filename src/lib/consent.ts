import { cookies, headers } from 'next/headers'
import 'server-only'

export type ConsentFlags = {
  necessary: true
  functional: boolean
  analytics: boolean
  advertising: boolean
  doNotSellShare: boolean
  gpc: boolean
  version: number
  ts: string // ISO timestamp
}

export const CONSENT_COOKIE = 'mmeg_consent'
export const CONSENT_VERSION = Number(process.env.CONSENT_VERSION ?? 1)

export function defaultConsent(gpc = false): ConsentFlags {
  // If GPC present, default to opt-out of advertising/analytics
  return {
    necessary: true,
    functional: false,
    analytics: gpc ? false : false,
    advertising: gpc ? false : false,
    doNotSellShare: gpc,
    gpc,
    version: CONSENT_VERSION,
    ts: new Date().toISOString(),
  }
}

export async function getServerConsent(): Promise<ConsentFlags> {
  const cookieStore = await cookies()
  const headersList = await headers()
  
  const c = cookieStore.get(CONSENT_COOKIE)?.value
  const gpcHeader = headersList.get('Sec-GPC') // '1' if GPC enabled
  const gpc = gpcHeader === '1'
  
  if (!c) return defaultConsent(gpc)
  
  try {
    const parsed = JSON.parse(c) as ConsentFlags
    // If version bumped, force re-consent
    if ((parsed.version ?? 0) !== CONSENT_VERSION) return defaultConsent(gpc)
    // Respect GPC stronger stance
    if (gpc && (!parsed.gpc || !parsed.doNotSellShare || parsed.advertising || parsed.analytics)) {
      return { ...parsed, gpc: true, doNotSellShare: true, advertising: false, analytics: false }
    }
    return parsed
  } catch {
    return defaultConsent(gpc)
  }
}

