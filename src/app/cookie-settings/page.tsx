'use client'

import { useState, useEffect } from 'react'
import { Cookie, Check, X } from 'lucide-react'
import { useCookieConsent, CookiePreferences } from '@/contexts/CookieConsent'

export default function CookieSettingsPage() {
  const { preferences, updatePreferences, acceptAll, rejectAll } = useCookieConsent()
  const [currentPreferences, setCurrentPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (preferences) {
      setCurrentPreferences(preferences)
    }
  }, [preferences])

  const handleSave = () => {
    updatePreferences(currentPreferences)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
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
      id: 'analytics',
      name: 'Analytics & Performance Cookies',
      description: 'These cookies help us understand how visitors interact with our website. We use this information to improve our services and user experience.',
      examples: [
        'Google Analytics to measure website usage',
        'Performance monitoring cookies',
        'A/B testing cookies to improve features'
      ],
      required: false
    },
    {
      id: 'marketing',
      name: 'Marketing & Advertising Cookies',
      description: 'These cookies are used to track visitors across websites to display relevant advertisements and measure campaign effectiveness.',
      examples: [
        'Facebook Pixel for targeted advertising',
        'Google Ads remarketing',
        'LinkedIn insight tags'
      ],
      required: false
    },
    {
      id: 'preferences',
      name: 'Functionality & Preference Cookies',
      description: 'These cookies allow the website to remember choices you make and provide enhanced, personalized features.',
      examples: [
        'Language preferences',
        'Theme preferences (dark/light mode)',
        'Playback preferences for media'
      ],
      required: false
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
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-50 dark:bg-base-800/50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={acceptAll}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
            >
              Accept All Cookies
            </button>
            <button
              onClick={rejectAll}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-2.5 rounded-lg font-medium transition"
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
                        checked={currentPreferences[category.id as keyof CookiePreferences]}
                        onChange={(e) => setCurrentPreferences({
                          ...currentPreferences,
                          [category.id]: e.target.checked
                        })}
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between bg-white dark:bg-base-800 rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 dark:text-gray-400">
            Your preferences will be saved and applied across the website
          </p>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition flex items-center gap-2"
          >
            {saved ? (
              <>
                <Check className="w-5 h-5" />
                Saved!
              </>
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