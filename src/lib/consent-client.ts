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
export const CONSENT_VERSION = Number(process.env.NEXT_PUBLIC_CONSENT_VERSION ?? 1)

// Client-side consent reader
export function getClientConsent(): ConsentFlags | null {
  if (typeof window === 'undefined') return null
  
  try {
    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(CONSENT_COOKIE + '='))
      ?.split('=')[1]
    
    if (!cookie) return null
    
    const parsed = JSON.parse(decodeURIComponent(cookie)) as ConsentFlags
    const hasGpc = typeof (navigator as any).globalPrivacyControl === 'boolean' && 
                   (navigator as any).globalPrivacyControl
    
    // Apply GPC restrictions if needed
    if (hasGpc && (!parsed.gpc || parsed.advertising || parsed.analytics)) {
      return { 
        ...parsed, 
        gpc: true, 
        doNotSellShare: true, 
        advertising: false, 
        analytics: false 
      }
    }
    
    return parsed
  } catch (_error) {
    return null
  }
}