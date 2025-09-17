import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Star, Crown, Gift, Music, Users, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fan Club',
  description: 'Join the MMEG Fan Club for exclusive content, early access, and special perks'
}

const MEMBERSHIP_TIERS = [
  {
    name: 'Free Fan',
    id: 'FREE',
    price: 0,
    color: 'gray',
    icon: <Heart className="w-8 h-8" />,
    features: [
      'Newsletter updates',
      'New release notifications',
      'Basic artist updates',
      'Community forum access'
    ]
  },
  {
    name: 'Fan Member',
    id: 'FAN',
    price: 9.99,
    color: 'blue',
    icon: <Star className="w-8 h-8" />,
    features: [
      'Everything in Free, plus:',
      'Early access to new releases',
      'Exclusive content & demos',
      'Monthly member-only livestreams',
      'Digital downloads',
      '10% merch discount'
    ],
    popular: true
  },
  {
    name: 'Superfan',
    id: 'SUPERFAN',
    price: 24.99,
    color: 'purple',
    icon: <Crown className="w-8 h-8" />,
    features: [
      'Everything in Fan, plus:',
      'Pre-sale ticket access',
      'Exclusive merch items',
      'Behind-the-scenes content',
      'Direct artist messaging',
      '20% merch discount',
      'Birthday surprises'
    ]
  },
  {
    name: 'VIP',
    id: 'VIP',
    price: 99.99,
    color: 'gold',
    icon: <Gift className="w-8 h-8" />,
    features: [
      'Everything in Superfan, plus:',
      'Meet & greet opportunities',
      'Signed merchandise',
      'VIP concert experiences',
      'Personal video messages',
      '30% merch discount',
      'Annual exclusive gift',
      'Name in album credits'
    ]
  }
]

export default function FanClubPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-900/20 to-base-900 py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">Join the MMEG Fan Club</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Get closer to your favorite artists with exclusive content, early access, and VIP experiences
          </p>
        </div>
      </section>

      {/* Benefits Overview */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Join the Fan Club?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Exclusive Content</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Access unreleased tracks, demos, and behind-the-scenes content
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Early Access</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Be first to hear new releases and get pre-sale ticket access
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Connect with other fans and artists in our exclusive forums
            </p>
          </div>
          <div className="text-center">
            <div className="bg-orange-100 dark:bg-orange-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Special Perks</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Enjoy merch discounts, exclusive items, and VIP experiences
            </p>
          </div>
        </div>

        {/* Membership Tiers */}
        <h2 className="text-3xl font-bold mb-12 text-center">Choose Your Membership</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {MEMBERSHIP_TIERS.map((tier) => (
            <div 
              key={tier.id} 
              className={`relative bg-white dark:bg-base-800 rounded-2xl p-6 ${
                tier.popular ? 'ring-2 ring-blue-600 dark:ring-blue-400' : ''
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 dark:bg-blue-400 text-white text-sm px-4 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className={`text-${tier.color}-600 dark:text-${tier.color}-400 mb-4`}>
                {tier.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <div className="mb-6">
                {tier.price === 0 ? (
                  <span className="text-3xl font-bold">Free</span>
                ) : (
                  <>
                    <span className="text-3xl font-bold">${tier.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </>
                )}
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href={`/fan-club/join?tier=${tier.id}`}
                className={`block w-full text-center py-3 rounded-lg font-semibold transition ${
                  tier.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tier.price === 0 ? 'Join Free' : 'Subscribe'}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-base-800/30 py-16">
        <div className="container max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">Can I change my membership tier?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! You can upgrade or downgrade your membership at any time. Changes take effect at the next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Do memberships apply to all artists?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, your MMEG Fan Club membership gives you benefits across all artists in our family. Some artists may offer additional exclusive perks for their fans.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">How do I access exclusive content?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Once you're a member, you'll have access to a special members-only section where you can browse and download exclusive content, join livestreams, and more.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Can I cancel my membership?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Of course! You can cancel your membership at any time. You'll continue to have access until the end of your current billing period.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Join the Family?</h2>
          <p className="text-xl mb-8 opacity-90">
            Start with our free membership and upgrade anytime
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/fan-club/join?tier=FREE" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition">
              Start Free
            </Link>
            <Link href="/fan-club/compare" className="bg-purple-700 hover:bg-purple-800 px-8 py-3 rounded-full font-semibold transition">
              Compare Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}