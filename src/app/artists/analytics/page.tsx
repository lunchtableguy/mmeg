'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { 
  BarChart3, TrendingUp, Users, Music, Eye, Download, 
  Calendar, Globe, DollarSign, Loader2, ArrowUp, ArrowDown 
} from 'lucide-react'

interface AnalyticsData {
  overview: {
    totalPlays: number
    totalFans: number
    totalRevenue: number
    totalEvents: number
    playsChange: number
    fansChange: number
    revenueChange: number
  }
  playsByTime: {
    date: string
    plays: number
  }[]
  topTracks: {
    title: string
    plays: number
    revenue: number
  }[]
  demographics: {
    country: string
    percentage: number
  }[]
  revenue: {
    source: string
    amount: number
  }[]
}

export default function ArtistAnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/artists/sign-in?redirect=/artists/analytics')
    } else if (session?.user?.role !== 'BAND') {
      router.push('/')
    }
  }, [status, session, router])

  useEffect(() => {
    if (session) {
      fetchAnalytics()
    }
  }, [session, timeRange])

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`/api/artists/analytics?range=${timeRange}`)
      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
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

  if (!data) {
    return (
      <div className="min-h-screen py-20">
        <div className="container text-center">
          <h1 className="text-3xl font-bold mb-4">No analytics data available</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Analytics will appear once your music starts getting plays
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Artist Analytics</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white dark:bg-base-800 border border-gray-300 dark:border-gray-700"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* Overview Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-base-800 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                <Music className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                data.overview.playsChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {data.overview.playsChange >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(data.overview.playsChange)}%
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">
              {data.overview.totalPlays.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Plays</p>
          </div>

          <div className="bg-white dark:bg-base-800 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                data.overview.fansChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {data.overview.fansChange >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(data.overview.fansChange)}%
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">
              {data.overview.totalFans.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Fans</p>
          </div>

          <div className="bg-white dark:bg-base-800 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                data.overview.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {data.overview.revenueChange >= 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {Math.abs(data.overview.revenueChange)}%
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">
              ${data.overview.totalRevenue.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
          </div>

          <div className="bg-white dark:bg-base-800 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
            <div className="text-2xl font-bold mb-1">
              {data.overview.totalEvents}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Upcoming Events</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Plays Over Time */}
          <div className="lg:col-span-2 bg-white dark:bg-base-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Plays Over Time
            </h2>
            <div className="h-64 flex items-end gap-2">
              {data.playsByTime.map((item, index) => {
                const maxPlays = Math.max(...data.playsByTime.map(d => d.plays))
                const height = (item.plays / maxPlays) * 100
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-600 dark:bg-blue-400 rounded-t transition-all hover:bg-blue-700 dark:hover:bg-blue-300"
                      style={{ height: `${height}%` }}
                      title={`${item.plays} plays`}
                    />
                    {index % 5 === 0 && (
                      <span className="text-xs text-gray-500 mt-2">
                        {new Date(item.date).toLocaleDateString('en', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Top Tracks */}
          <div className="bg-white dark:bg-base-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">Top Tracks</h2>
            <div className="space-y-4">
              {data.topTracks.map((track, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {track.plays.toLocaleString()} plays
                    </div>
                  </div>
                  <div className="text-sm font-medium text-green-600 dark:text-green-400">
                    ${track.revenue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Demographics */}
          <div className="bg-white dark:bg-base-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Top Countries
            </h2>
            <div className="space-y-3">
              {data.demographics.map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{item.country}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Sources */}
          <div className="bg-white dark:bg-base-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Revenue Sources
            </h2>
            <div className="space-y-4">
              {data.revenue.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      source.source === 'Streaming' ? 'bg-blue-600' :
                      source.source === 'Downloads' ? 'bg-green-600' :
                      source.source === 'Merch' ? 'bg-purple-600' :
                      source.source === 'Sync' ? 'bg-orange-600' :
                      'bg-gray-600'
                    }`} />
                    <span>{source.source}</span>
                  </div>
                  <span className="font-medium">${source.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Export Button */}
        <div className="mt-12 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition inline-flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Analytics Report
          </button>
        </div>
      </div>
    </div>
  )
}