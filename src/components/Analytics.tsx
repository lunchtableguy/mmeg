'use client'

import { useEffect } from 'react'
import { useCookieAllowed } from '@/contexts/CookieConsent'
import Script from 'next/script'

// Google Analytics component that respects cookie consent
export function GoogleAnalytics({ ga_id }: { ga_id: string }) {
  const analyticsAllowed = useCookieAllowed('analytics')

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && analyticsAllowed) {
      window.gtag('config', ga_id)
    }
  }, [analyticsAllowed, ga_id])

  if (!analyticsAllowed) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ga_id}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Facebook Pixel component that respects cookie consent
export function FacebookPixel({ pixel_id }: { pixel_id: string }) {
  const marketingAllowed = useCookieAllowed('marketing')

  if (!marketingAllowed) return null

  return (
    <>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixel_id}');
          fbq('track', 'PageView');
        `}
      </Script>
    </>
  )
}

// Generic tracking event that respects consent
export function trackEvent(category: string, action: string, label?: string, value?: number) {
  // Only track if analytics cookies are allowed
  if (typeof window !== 'undefined' && window.gtag) {
    const consent = localStorage.getItem('mmeg-cookie-preferences')
    if (consent) {
      const preferences = JSON.parse(consent)
      if (preferences.analytics) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value
        })
      }
    }
  }
}