'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Cookie, X, Settings, Check } from 'lucide-react'
import { useCookieConsent, CookiePreferences } from '@/contexts/CookieConsent'

export function CookieConsentBanner() {
  const { showBanner, acceptAll, rejectAll, updatePreferences } = useCookieConsent()
  const [showDetails, setShowDetails] = useState(false)
  const [customPreferences, setCustomPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
    preferences: true
  })

  if (!showBanner) return null

  const handleCustomSave = () => {
    updatePreferences(customPreferences)
  }

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They cannot be disabled.',
      required: true
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website by collecting anonymous information.',
      required: false
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant advertisements.',
      required: false
    },
    {
      id: 'preferences',
      name: 'Preference Cookies',
      description: 'Allow the website to remember your preferences such as language and region.',
      required: false
    }
  ]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-base-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700">
            {!showDetails ? (
              // Simple Banner
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                    <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">We use cookies</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
                      By clicking "Accept All", you consent to our use of cookies. 
                      <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                        Learn more
                      </Link>
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={acceptAll}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={rejectAll}
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-2.5 rounded-lg font-medium transition"
                      >
                        Reject All
                      </button>
                      <button
                        onClick={() => setShowDetails(true)}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                      >
                        <Settings className="w-4 h-4" />
                        Customize
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Detailed Preferences
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                      <Cookie className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Cookie Preferences</h3>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Choose which cookies you want to allow. You can change these settings at any time.
                </p>

                <div className="space-y-4 mb-6">
                  {cookieTypes.map((type) => (
                    <div key={type.id} className="bg-gray-50 dark:bg-base-700/50 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{type.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {type.description}
                          </p>
                        </div>
                        <div className="ml-4">
                          {type.required ? (
                            <div className="text-sm text-gray-500 bg-gray-200 dark:bg-gray-600 px-3 py-1 rounded">
                              Always On
                            </div>
                          ) : (
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={customPreferences[type.id as keyof CookiePreferences]}
                                onChange={(e) => setCustomPreferences({
                                  ...customPreferences,
                                  [type.id]: e.target.checked
                                })}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleCustomSave}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Save Preferences
                  </button>
                  <button
                    onClick={acceptAll}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-6 py-2.5 rounded-lg font-medium transition"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={rejectAll}
                    className="bg-white dark:bg-base-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 px-6 py-2.5 rounded-lg font-medium transition"
                  >
                    Reject All
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}