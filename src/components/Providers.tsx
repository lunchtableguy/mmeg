'use client'

import { SessionProvider } from 'next-auth/react'
import { CookieConsentProvider } from '@/contexts/CookieConsent'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CookieConsentBanner } from '@/components/CookieConsent'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CookieConsentProvider>
        <ThemeProvider>
          {children}
          <CookieConsentBanner />
        </ThemeProvider>
      </CookieConsentProvider>
    </SessionProvider>
  )
}