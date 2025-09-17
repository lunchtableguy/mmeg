'use client'

import { useState, useEffect } from 'react'
import { Cookie, Check, Shield } from 'lucide-react'
import { getClientConsent } from '@/lib/consent-client'

export default function CookieSettingsPage() {
  const [functional, setFunctional] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [advertising, setAdvertising] = useState(false)
  const [doNotSellShare, setDoNotSellShare] = useState(false)
  const [gpc, setGpc] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load current preferences
    const consent = getClientConsent()
    if (consent) {
      setFunctional(consent.functional)
      setAnalytics(consent.analytics)
      setAdvertising(consent.advertising)
      setDoNotSellShare(consent.doNotSellShare)
    }
    
    // Detect GPC
    const hasGpc = typeof (navigator as any).globalPrivacyControl === 'boolean' && 
                   (navigator as any).globalPrivacyControl
    setGpc(hasGpc)
  }, [])

  const handleSave = async (custom?: { functional: boolean; analytics: boolean; advertising: boolean; doNotSellShare: boolean; source: string }, source = 'settings') => {
    setLoading(true)
    const payload = custom || {
      functional,
      analytics: gpc ? false : analytics,
      advertising: gpc ? false : advertising,
      doNotSellShare: gpc ? true : doNotSellShare,
      source
    }
    
    try {
      const response = await fetch('/api/consent', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(payload) 
      })
      
      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
        window.dispatchEvent(new CustomEvent('mmeg:consent-updated'))
      }
    } catch (error) {
      console.error('Failed to save preferences:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptAll = () => {
    handleSave({
      functional: true,
      analytics: !gpc,
      advertising: !gpc,
      doNotSellShare: gpc,
      source: 'settings-all'
    })
  }

  const handleRejectAll = () => {
    handleSave({
      functional: false,
      analytics: false,
      advertising: false,
      doNotSellShare: true,
      source: 'settings-none'
    })
  }

  const cookieCategories = [
    {
      id: 'necessary',
      name: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
      examples: [
        'Session cookies for user authentication',
        'Security cookies to prevent fraud',
        'Cookies that remember your cookie consent choices'
      ],
      required: true
    },
    {
      id: 'functional',
      name: 'Functionality & Preference Cookies',
      description: 'These cookies allow the website to remember choices you make and provide enhanced, personalized features.',
      examples: [
        'Language preferences',
        'Theme preferences (dark/light mode)',
        'Playback preferences for media'
      ],
      required: false,
      checked: functional,
      onChange: setFunctional
    },
    {
      id: 'analytics',
      name: 'Analytics & Performance Cookies',
      description: 'These cookies help us understand how visitors interact with our website. We use this information to improve our services and user experience.',
      examples: [
        'Google Analytics to measure website usage',
        'Performance monitoring cookies',
        'A/B testing cookies to improve features'
      ],
      required: false,
      checked: analytics,
      onChange: setAnalytics,
      disabled: gpc
    },
    {
      id: 'advertising',
      name: 'Marketing & Advertising Cookies',
      description: 'These cookies are used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.',
      examples: [
        'Facebook Pixel for targeted advertising',
        'Google Ads remarketing',
        'LinkedIn insight tags'
      ],
      required: false,
      checked: advertising,
      onChange: setAdvertising,
      disabled: gpc
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 mb-6">
            <Cookie className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Cookie Settings</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Manage your cookie preferences and learn how we use cookies
          </p>
          {gpc && (
            <div className="mt-4 inline-flex items-center gap-2 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full">
              <Shield className="w-4 h-4" />
              Global Privacy Control detected — some options are restricted
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 dark:bg-base-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAcceptAll}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition"
            >
              Accept All Cookies
            </button>
            <button
              onClick={handleRejectAll}
              disabled={loading}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-400 px-6 py-2.5 rounded-lg font-medium transition"
            >
              Essential Only
            </button>
          </div>
        </div>

        {/* Cookie Categories */}
        <div className="space-y-6 mb-8">
          {cookieCategories.map((category) => (
            <div key={category.id} className="bg-white dark:bg-base-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Examples:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {category.examples.map((example, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="ml-6">
                  {category.required ? (
                    <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                      Always Active
                    </div>
                  ) : (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={category.checked}
                        onChange={(e) => category.onChange?.(e.target.checked)}
                        disabled={category.disabled}
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Do Not Sell/Share Section */}
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Do Not Sell or Share My Personal Information</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Under the California Privacy Rights Act (CPRA), you have the right to opt out of the "sale" or 
                  "sharing" of your personal information for cross-context behavioral advertising purposes.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  When enabled, we will not share your data with third parties for targeted advertising.
                </p>
              </div>
              
              <div className="ml-6">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={doNotSellShare || gpc}
                    onChange={(e) => setDoNotSellShare(e.target.checked)}
                    disabled={gpc}
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between bg-white dark:bg-base-800 rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Your preferences will be saved and applied across the website
          </p>
          <button
            onClick={() => handleSave()}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-medium transition flex items-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" />
                Saved!
              </>
            ) : loading ? (
              'Saving...'
            ) : (
              'Save Preferences'
            )}
          </button>
        </div>

        {/* Additional Information */}
        <div className="mt-12 prose prose-gray dark:prose-invert max-w-none">
          <h2>More About Our Cookie Use</h2>
          <p>
            We respect your privacy and are committed to being transparent about our data collection practices. 
            Cookies help us provide you with a better experience by remembering your preferences and understanding 
            how you use our website.
          </p>
          <h3>Your Rights</h3>
          <p>
            You have the right to withdraw your consent at any time. You can do this by changing your preferences 
            on this page or by clearing your browser's cookies. Note that disabling certain cookies may impact 
            the functionality of some features on our website.
          </p>
          <h3>Global Privacy Control (GPC)</h3>
          <p>
            We honor the Global Privacy Control signal. When GPC is enabled in your browser, we automatically 
            set your preferences to opt out of analytics and advertising cookies, and we do not sell or share 
            your personal information.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have any questions about our use of cookies or your privacy, please contact us at{' '}
            <a href="mailto:privacy@mmeg.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              privacy@mmeg.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}