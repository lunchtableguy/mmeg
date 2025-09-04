'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  BarChart2, User, Music, Calendar, MessageSquare, 
  FileText, Users, Settings, Loader2, TrendingUp,
  DollarSign, Eye
} from 'lucide-react'

export default function ArtistDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/artists/sign-in?redirect=/artists/dashboard')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  const sections = [
    {
      title: 'Analytics',
      description: 'View your performance metrics and insights',
      icon: <BarChart2 className="w-6 h-6" />,
      href: '/artists/analytics',
      color: 'text-purple-600 dark:text-purple-400',
      stats: { label: 'Total Plays', value: '125K' }
    },
    {
      title: 'Profile',
      description: 'Manage your artist profile and bio',
      icon: <User className="w-6 h-6" />,
      href: '/artists/profile',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Music',
      description: 'Upload and manage your tracks',
      icon: <Music className="w-6 h-6" />,
      href: '/artists/music',
      color: 'text-green-600 dark:text-green-400',
      stats: { label: 'Releases', value: '12' }
    },
    {
      title: 'Events',
      description: 'Manage your tour dates and appearances',
      icon: <Calendar className="w-6 h-6" />,
      href: '/artists/events',
      color: 'text-orange-600 dark:text-orange-400',
      stats: { label: 'Upcoming', value: '5' }
    },
    {
      title: 'Messages',
      description: 'Connect with fans and other artists',
      icon: <MessageSquare className="w-6 h-6" />,
      href: '/artists/messages',
      color: 'text-pink-600 dark:text-pink-400',
      badge: '3 new'
    },
    {
      title: 'Documents',
      description: 'Access contracts and important files',
      icon: <FileText className="w-6 h-6" />,
      href: '/artists/documents',
      color: 'text-indigo-600 dark:text-indigo-400'
    },
    {
      title: 'Community',
      description: 'Join the MMEG artist community',
      icon: <Users className="w-6 h-6" />,
      href: '/artists/community',
      color: 'text-cyan-600 dark:text-cyan-400'
    },
    {
      title: 'Settings',
      description: 'Manage your account settings',
      icon: <Settings className="w-6 h-6" />,
      href: '/artists/settings',
      color: 'text-gray-600 dark:text-gray-400'
    }
  ]

  // Mock quick stats
  const quickStats = [
    {
      label: 'Monthly Listeners',
      value: '45.2K',
      change: '+12%',
      icon: <Eye className="w-5 h-5" />,
      positive: true
    },
    {
      label: 'Revenue (MTD)',
      value: '$3,247',
      change: '+8%',
      icon: <DollarSign className="w-5 h-5" />,
      positive: true
    },
    {
      label: 'Fan Engagement',
      value: '87%',
      change: '-2%',
      icon: <TrendingUp className="w-5 h-5" />,
      positive: false
    }
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {session?.user?.name || 'Artist'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your music today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-base-800 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.icon}
                </div>
                <div className={`text-sm font-medium flex items-center gap-1 ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Navigation Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="bg-white dark:bg-base-800 rounded-xl p-6 hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className={`${section.color} mb-4`}>
                {section.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                {section.description}
              </p>
              {section.stats && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{section.stats.label}</span>
                  <span className="font-semibold">{section.stats.value}</span>
                </div>
              )}
              {section.badge && (
                <div className="inline-block bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs px-2 py-1 rounded-full">
                  {section.badge}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white dark:bg-base-800 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2" />
              <div>
                <p className="font-medium">New milestone reached!</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  "Into the Light" surpassed 1 million streams
                </p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-700">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
              <div>
                <p className="font-medium">New fan message</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sarah M. commented on your latest post
                </p>
                <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2" />
              <div>
                <p className="font-medium">Playlist addition</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Added to "Indie Vibes 2024" with 250K followers
                </p>
                <p className="text-xs text-gray-500 mt-1">Yesterday</p>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-8">
          <h2 className="text-xl font-bold mb-4">MMEG Announcements</h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 dark:text-blue-400">•</span>
              <div>
                <p className="font-medium">Summer Tour Support Applications Open</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Apply by March 31st for tour support funding
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 dark:text-purple-400">•</span>
              <div>
                <p className="font-medium">New Sync Opportunities Available</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Major brands looking for indie tracks - check sync portal
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}