import Script from 'next/script'
import { getServerConsent } from '@/lib/consent'

export default async function AnalyticsLoader() {
  const consent = await getServerConsent()
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID
  const META_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <>
      {/* Google Analytics 4 */}
      {consent.analytics && GA_ID && (
        <>
          <Script 
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} 
            strategy="afterInteractive" 
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              
              // Configure with consent mode
              gtag('consent', 'default', {
                'ad_storage': '${consent.advertising ? 'granted' : 'denied'}',
                'ad_user_data': '${consent.advertising ? 'granted' : 'denied'}',
                'ad_personalization': '${consent.advertising ? 'granted' : 'denied'}',
                'analytics_storage': '${consent.analytics ? 'granted' : 'denied'}',
                'functionality_storage': '${consent.functional ? 'granted' : 'denied'}',
                'personalization_storage': '${consent.functional ? 'granted' : 'denied'}',
                'security_storage': 'granted'
              });
              
              gtag('config', '${GA_ID}', { 
                anonymize_ip: true,
                allow_google_signals: ${!consent.doNotSellShare}
              });
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel (Facebook) */}
      {consent.advertising && META_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('consent', '${consent.advertising ? 'grant' : 'revoke'}');
            fbq('init', '${META_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* LinkedIn Insight Tag Example */}
      {consent.advertising && process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID && (
        <Script id="linkedin-insight" strategy="afterInteractive">
          {`
            _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          `}
        </Script>
      )}

      {/* Consent Update Listener */}
      <Script id="consent-listener" strategy="afterInteractive">
        {`
          // Listen for consent updates
          window.addEventListener('mmeg:consent-updated', function() {
            // Reload page to apply new consent settings
            // In production, you might want to update consent mode without reload
            window.location.reload();
          });
        `}
      </Script>
    </>
  )
}