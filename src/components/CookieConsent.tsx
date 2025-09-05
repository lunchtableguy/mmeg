'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Cookie, X, Settings, Check, Shield } from 'lucide-react'
import { getClientConsent, CONSENT_VERSION } from '@/lib/consent-client'

export function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [functional, setFunctional] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [advertising, setAdvertising] = useState(false)
  const [doNotSellShare, setDoNotSellShare] = useState(false)
  const [gpc, setGpc] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Check for existing consent
    const consent = getClientConsent()
    
    // Detect GPC
    const hasGpc = typeof (navigator as any).globalPrivacyControl === 'boolean' && 
                   (navigator as any).globalPrivacyControl
    setGpc(hasGpc)
    
    // Show banner if no consent or version changed
    if (!consent || consent.version !== CONSENT_VERSION) {
      setShowBanner(true)
      // Set defaults based on GPC
      if (hasGpc) {
        setAnalytics(false)
        setAdvertising(false)
        setDoNotSellShare(true)
      }
    } else {
      // Load existing preferences
      setFunctional(consent.functional)
      setAnalytics(consent.analytics)
      setAdvertising(consent.advertising)
      setDoNotSellShare(consent.doNotSellShare)
    }
  }, [])

  const handleSubmit = async (mode: 'accept-all' | 'reject-all' | 'custom') => {
    setLoading(true)
    
    let preferences = {
      functional: mode === 'accept-all' ? true : mode === 'reject-all' ? false : functional,
      analytics: mode === 'accept-all' ? true : mode === 'reject-all' ? false : analytics,
      advertising: mode === 'accept-all' ? true : mode === 'reject-all' ? false : advertising,
      doNotSellShare: mode === 'accept-all' ? false : mode === 'reject-all' ? true : doNotSellShare,
      source: 'banner'
    }
    
    // Override with GPC if present
    if (gpc) {
      preferences = {
        ...preferences,
        analytics: false,
        advertising: false,
        doNotSellShare: true
      }
    }
    
    try {
      const response = await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences)
      })
      
      if (response.ok) {
        setShowBanner(false)
        // Dispatch event for other components to update
        window.dispatchEvent(new CustomEvent('mmeg:consent-updated'))
      }
    } catch (error) {
      console.error('Failed to save consent:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!showBanner) return null

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Necessary',
      description: 'Essential for website functionality',
      required: true,
      checked: true
    },
    {
      id: 'functional',
      name: 'Functional',
      description: 'Remember your preferences',
      required: false,
      checked: functional,
      onChange: (v: boolean) => setFunctional(v)
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Help us improve our website',
      required: false,
      checked: analytics,
      onChange: (v: boolean) => setAnalytics(v),
      disabled: gpc
    },
    {
      id: 'advertising',
      name: 'Advertising',
      description: 'Show relevant ads',
      required: false,
      checked: advertising,
      onChange: (v: boolean) => setAdvertising(v),
      disabled: gpc
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
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">We use cookies</h3>
                      {gpc && (
                        <span className="inline-flex items-center gap-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                          <Shield className="w-3 h-3" />
                          GPC Detected
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      We use cookies to enhance your experience, analyze site traffic, and for marketing purposes. 
                      By clicking "Accept All", you consent to our use of cookies.
                      {gpc && (
                        <span className="block text-sm mt-2 text-purple-600 dark:text-purple-400">
                          Global Privacy Control detected — analytics and advertising disabled by default.
                        </span>
                      )}
                      <Link href="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                        Learn more
                      </Link>
                    </p>
                    
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleSubmit('accept-all')}
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition"
                      >
                        Accept All
                      </button>
                      <button
                        onClick={() => handleSubmit('reject-all')}
                        disabled={loading}
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-400 px-6 py-2.5 rounded-lg font-medium transition"
                      >
                        Reject Non-Essential
                      </button>
                      <button
                        onClick={() => setShowDetails(true)}
                        disabled={loading}
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
                    <div>
                      <h3 className="text-xl font-semibold">Cookie Preferences</h3>
                      {gpc && (
                        <p className="text-sm text-purple-600 dark:text-purple-400 flex items-center gap-1 mt-1">
                          <Shield className="w-3 h-3" />
                          Global Privacy Control is active
                        </p>
                      )}
                    </div>
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
                                checked={type.checked}
                                onChange={(e) => type.onChange?.(e.target.checked)}
                                disabled={type.disabled}
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Do Not Sell/Share */}
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">Do Not Sell or Share My Personal Information</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Opt out of the sale or sharing of personal information for targeted advertising (CPRA)
                        </p>
                      </div>
                      <div className="ml-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={doNotSellShare || gpc}
                            onChange={(e) => setDoNotSellShare(e.target.checked)}
                            disabled={gpc}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600 peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleSubmit('custom')}
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2"
                  >
                    {loading ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        Save Preferences
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleSubmit('accept-all')}
                    disabled={loading}
                    className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:bg-gray-400 px-6 py-2.5 rounded-lg font-medium transition"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={() => handleSubmit('reject-all')}
                    disabled={loading}
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