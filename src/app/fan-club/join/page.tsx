'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Heart, Star, Crown, Gift, Loader2, CreditCard, Check } from 'lucide-react'

const MEMBERSHIP_TIERS = {
  FREE: {
    name: 'Free Fan',
    price: 0,
    icon: <Heart className="w-6 h-6" />,
    color: 'gray'
  },
  FAN: {
    name: 'Fan Member',
    price: 9.99,
    icon: <Star className="w-6 h-6" />,
    color: 'blue'
  },
  SUPERFAN: {
    name: 'Superfan',
    price: 24.99,
    icon: <Crown className="w-6 h-6" />,
    color: 'purple'
  },
  VIP: {
    name: 'VIP',
    price: 99.99,
    icon: <Gift className="w-6 h-6" />,
    color: 'gold'
  }
}

function JoinFanClubContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status } = useSession()
  const [selectedTier, setSelectedTier] = useState(searchParams.get('tier') || 'FAN')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('selection') // selection, payment, confirmation
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
    email: session?.user?.email || ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/artists/sign-in?redirect=/fan-club/join')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.email) {
      setFormData(prev => ({ ...prev, email: session.user.email! }))
    }
  }, [session])

  const handleJoin = async () => {
    if (selectedTier === 'FREE') {
      // Free tier - no payment needed
      setLoading(true)
      try {
        const response = await fetch('/api/fan-club/join', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tier: selectedTier })
        })
        
        if (response.ok) {
          setStep('confirmation')
        } else {
          alert('Failed to join. Please try again.')
        }
      } catch (_error) {
        alert('An error occurred. Please try again.')
      } finally {
        setLoading(false)
      }
    } else {
      // Paid tiers - go to payment
      setStep('payment')
    }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // In a real app, this would integrate with Stripe
      const response = await fetch('/api/fan-club/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: selectedTier,
          paymentMethod: 'card',
          ...formData
        })
      })
      
      if (response.ok) {
        setStep('confirmation')
      } else {
        alert('Payment failed. Please try again.')
      }
    } catch (_error) {
      alert('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const selectedTierInfo = MEMBERSHIP_TIERS[selectedTier as keyof typeof MEMBERSHIP_TIERS]

  return (
    <div className="min-h-screen py-20">
      <div className="container max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-8">
            <div className={`flex items-center gap-2 ${step === 'selection' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'selection' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                1
              </div>
              <span className="hidden sm:inline">Select Plan</span>
            </div>
            
            <div className="w-16 h-0.5 bg-gray-200 dark:bg-gray-700" />
            
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                2
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
            
            <div className="w-16 h-0.5 bg-gray-200 dark:bg-gray-700" />
            
            <div className={`flex items-center gap-2 ${step === 'confirmation' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
              }`}>
                3
              </div>
              <span className="hidden sm:inline">Confirmation</span>
            </div>
          </div>
        </div>

        {/* Selection Step */}
        {step === 'selection' && (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Membership</h1>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {Object.entries(MEMBERSHIP_TIERS).map(([tier, info]) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`p-6 rounded-xl border-2 transition text-left ${
                    selectedTier === tier
                      ? 'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className={`text-${info.color}-600 dark:text-${info.color}-400 mb-2`}>
                        {info.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-1">{info.name}</h3>
                      <div>
                        {info.price === 0 ? (
                          <span className="text-2xl font-bold">Free</span>
                        ) : (
                          <>
                            <span className="text-2xl font-bold">${info.price}</span>
                            <span className="text-gray-600 dark:text-gray-400">/month</span>
                          </>
                        )}
                      </div>
                    </div>
                    {selectedTier === tier && (
                      <Check className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
            
            <div className="flex gap-4 justify-center">
              <Link href="/fan-club" className="px-8 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                Back
              </Link>
              <button
                onClick={handleJoin}
                disabled={loading}
                className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:bg-gray-400"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Continue'}
              </button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {step === 'payment' && (
          <div>
            <h1 className="text-3xl font-bold mb-8 text-center">Payment Information</h1>
            
            <div className="bg-gray-50 dark:bg-base-800/50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`text-${selectedTierInfo.color}-600 dark:text-${selectedTierInfo.color}-400`}>
                    {selectedTierInfo.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedTierInfo.name} Membership</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Billed monthly</p>
                  </div>
                </div>
                <div className="text-2xl font-bold">${selectedTierInfo.price}/mo</div>
              </div>
            </div>
            
            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-base-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-white dark:bg-base-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    className="w-full pl-12 pr-4 py-2 rounded-lg bg-white dark:bg-base-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Expiry</label>
                  <input
                    type="text"
                    value={formData.expiry}
                    onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-base-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    placeholder="123"
                    className="w-full px-4 py-2 rounded-lg bg-white dark:bg-base-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  This is a demo. In production, payment would be processed securely through Stripe.
                </p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <button
                  type="button"
                  onClick={() => setStep('selection')}
                  className="px-8 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:bg-gray-400"
                >
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Payment'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Confirmation Step */}
        {step === 'confirmation' && (
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Welcome to the Fan Club!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              You're now a {selectedTierInfo.name} member
            </p>
            
            <div className="bg-gray-50 dark:bg-base-800/50 rounded-xl p-6 max-w-md mx-auto mb-8">
              <h3 className="font-semibold mb-4">What's Next?</h3>
              <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Check your email for membership confirmation</li>
                <li>• Access exclusive content in the members area</li>
                <li>• Join our community forums</li>
                <li>• Set up your profile preferences</li>
              </ul>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Link href="/fan-club/dashboard" className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition">
                Go to Dashboard
              </Link>
              <Link href="/" className="px-8 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function JoinFanClubPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <JoinFanClubContent />
    </Suspense>
  )
}