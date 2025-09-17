'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, Star, Crown, Gift, Download, Play, Calendar, Users, Settings, Loader2 } from 'lucide-react'

interface MembershipData {
  membership: {
    tier: string
    startDate: string
    active: boolean
  }
  exclusiveContent: any[]
  upcomingEvents: any[]
  stats: {
    daysAsMember: number
    contentAccessed: number
    eventsAttended: number
  }
}

const TIER_ICONS = {
  FREE: <Heart className="w-6 h-6" />,
  FAN: <Star className="w-6 h-6" />,
  SUPERFAN: <Crown className="w-6 h-6" />,
  VIP: <Gift className="w-6 h-6" />
}

const TIER_COLORS = {
  FREE: 'gray',
  FAN: 'blue',
  SUPERFAN: 'purple',
  VIP: 'gold'
}

export default function FanClubDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<MembershipData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/artists/sign-in?redirect=/fan-club/dashboard')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchDashboardData()
    }
  }, [session])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/fan-club/dashboard')
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!data || !data.membership) {
    return (
      <div className="min-h-screen py-20">
        <div className="container text-center">
          <h1 className="text-3xl font-bold mb-4">You're not a fan club member yet!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join today to access exclusive content and perks
          </p>
          <Link href="/fan-club" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition">
            View Membership Options
          </Link>
        </div>
      </div>
    )
  }

  const tierColor = TIER_COLORS[data.membership.tier as keyof typeof TIER_COLORS]

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {session?.user?.name || 'Fan'}!</h1>
              <div className="flex items-center gap-3">
                <div className={`text-${tierColor}-200`}>
                  {TIER_ICONS[data.membership.tier as keyof typeof TIER_ICONS]}
                </div>
                <span className="text-xl">{data.membership.tier} Member</span>
                <span className="text-sm opacity-75">
                  Since {new Date(data.membership.startDate).toLocaleDateString()}
                </span>
              </div>
            </div>
            <Link href="/fan-club/settings" className="p-2 hover:bg-white/20 rounded-lg transition">
              <Settings className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-base-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {data.stats.daysAsMember}
            </div>
            <p className="text-gray-600 dark:text-gray-400">Days as Member</p>
          </div>
          <div className="bg-white dark:bg-base-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {data.stats.contentAccessed}
            </div>
            <p className="text-gray-600 dark:text-gray-400">Content Accessed</p>
          </div>
          <div className="bg-white dark:bg-base-800 rounded-xl p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {data.stats.eventsAttended}
            </div>
            <p className="text-gray-600 dark:text-gray-400">Events Attended</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Exclusive Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Exclusive Content</h2>
            
            {/* Mock exclusive content */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-base-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Behind the Scenes: Studio Session</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Exclusive footage from Jane Lee's latest recording session
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <Play className="w-4 h-4" />
                        Watch Now
                      </button>
                      <span className="text-sm text-gray-500">15 min</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-base-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Unreleased Demo: "Midnight Dreams"</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      ECLYP5ED shares an early version of their upcoming single
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <Play className="w-4 h-4" />
                        Listen
                      </button>
                      <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-base-800 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Live Q&A Recording</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      Last week's member-only livestream with multiple artists
                    </p>
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                        <Play className="w-4 h-4" />
                        Watch
                      </button>
                      <span className="text-sm text-gray-500">45 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/fan-club/content" className="inline-flex items-center gap-2 mt-6 text-blue-600 dark:text-blue-400 hover:underline">
              View All Exclusive Content →
            </Link>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            <div>
              <h2 className="text-2xl font-bold mb-4">Member Events</h2>
              <div className="bg-white dark:bg-base-800 rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 dark:text-blue-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Virtual Meet & Greet</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">March 25, 2024 • 7:00 PM EST</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">VIP Members Only</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-purple-600 dark:text-purple-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Listening Party</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">March 30, 2024 • 8:00 PM EST</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">All Fan+ Members</p>
                  </div>
                </div>
                <Link href="/fan-club/events" className="block text-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 py-2 rounded-lg transition">
                  View All Events
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/fan-club/community" className="block bg-white dark:bg-base-800 hover:shadow-lg p-4 rounded-xl transition">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span>Community Forum</span>
                  </div>
                </Link>
                <Link href="/merch" className="block bg-white dark:bg-base-800 hover:shadow-lg p-4 rounded-xl transition">
                  <div className="flex items-center gap-3">
                    <Gift className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span>Member Discount Store</span>
                  </div>
                </Link>
                <Link href="/fan-club/upgrade" className="block bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg p-4 rounded-xl transition">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Upgrade Membership</span>
                    <span className="text-sm opacity-90">Get more perks →</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}