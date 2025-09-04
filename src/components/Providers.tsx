'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/ThemeProvider'
import { CookieConsentBanner } from '@/components/CookieConsent'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <CookieConsentBanner />
      </ThemeProvider>
    </SessionProvider>
  )
}