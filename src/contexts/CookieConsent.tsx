'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CookiePreferences {
  necessary: boolean // Always true
  analytics: boolean
  marketing: boolean
  preferences: boolean
}

interface CookieConsentContextType {
  preferences: CookiePreferences | null
  hasConsented: boolean
  updatePreferences: (prefs: CookiePreferences) => void
  acceptAll: () => void
  rejectAll: () => void
  showBanner: boolean
  setShowBanner: (show: boolean) => void
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined)

const COOKIE_CONSENT_KEY = 'mmeg-cookie-consent'
const COOKIE_PREFERENCES_KEY = 'mmeg-cookie-preferences'

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
  const [hasConsented, setHasConsented] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  // Load preferences from localStorage on mount
  useEffect(() => {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    const storedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY)

    if (storedConsent && storedPreferences) {
      setHasConsented(true)
      setPreferences(JSON.parse(storedPreferences))
      setShowBanner(false)
      
      // Apply preferences
      applyPreferences(JSON.parse(storedPreferences))
    } else {
      // Show banner if no consent stored
      setShowBanner(true)
    }
  }, [])

  const applyPreferences = (prefs: CookiePreferences) => {
    // Google Analytics example
    if (typeof window !== 'undefined' && window.gtag) {
      if (prefs.analytics) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        })
      } else {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        })
      }
    }

    // Marketing cookies
    if (typeof window !== 'undefined' && window.fbq) {
      if (!prefs.marketing) {
        // Disable Facebook Pixel
        window.fbq('consent', 'revoke')
      }
    }

    // You can add more third-party service configurations here
  }

  const updatePreferences = (prefs: CookiePreferences) => {
    setPreferences(prefs)
    setHasConsented(true)
    setShowBanner(false)
    
    // Save to localStorage
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true')
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs))
    
    // Apply the preferences
    applyPreferences(prefs)
  }

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    }
    updatePreferences(allAccepted)
  }

  const rejectAll = () => {
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    }
    updatePreferences(onlyNecessary)
  }

  return (
    <CookieConsentContext.Provider
      value={{
        preferences,
        hasConsented,
        updatePreferences,
        acceptAll,
        rejectAll,
        showBanner,
        setShowBanner
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  )
}

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext)
  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider')
  }
  return context
}

// Helper hook to check if a specific cookie type is allowed
export const useCookieAllowed = (type: keyof CookiePreferences) => {
  const { preferences } = useCookieConsent()
  return preferences ? preferences[type] : false
}

// TypeScript declarations for global analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    fbq?: (...args: any[]) => void
  }
}