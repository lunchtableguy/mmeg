import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { UserRole } from '@/generated/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user.role !== UserRole.BAND) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const range = searchParams.get('range') || '30d'

    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    
    switch (range) {
      case '7d':
        startDate.setDate(endDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(endDate.getDate() - 30)
        break
      case '90d':
        startDate.setDate(endDate.getDate() - 90)
        break
      case '1y':
        startDate.setFullYear(endDate.getFullYear() - 1)
        break
    }

    // Mock data - in production, this would query actual analytics tables
    const mockData = generateMockAnalytics(startDate, endDate)
    
    return NextResponse.json(mockData)
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

function generateMockAnalytics(startDate: Date, endDate: Date) {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  
  // Generate plays by time data
  const playsByTime = []
  for (let i = 0; i < Math.min(days, 30); i++) {
    const date = new Date(endDate)
    date.setDate(date.getDate() - i)
    playsByTime.unshift({
      date: date.toISOString(),
      plays: Math.floor(Math.random() * 5000) + 1000
    })
  }

  // Calculate totals with some randomness
  const totalPlays = playsByTime.reduce((sum, item) => sum + item.plays, 0)
  const totalFans = Math.floor(totalPlays * 0.15) // ~15% conversion
  const totalRevenue = Math.floor(totalPlays * 0.003 * 100) / 100 // ~$0.003 per play
  
  // Generate percentage changes
  const playsChange = Math.floor(Math.random() * 40) - 10 // -10% to +30%
  const fansChange = Math.floor(Math.random() * 50) - 10  // -10% to +40%
  const revenueChange = Math.floor(Math.random() * 30) - 5 // -5% to +25%

  return {
    overview: {
      totalPlays,
      totalFans,
      totalRevenue,
      totalEvents: Math.floor(Math.random() * 10) + 2,
      playsChange,
      fansChange,
      revenueChange
    },
    playsByTime,
    topTracks: [
      { title: 'Into the Light', plays: Math.floor(totalPlays * 0.3), revenue: Math.floor(totalRevenue * 0.35 * 100) / 100 },
      { title: 'Summer Nights', plays: Math.floor(totalPlays * 0.25), revenue: Math.floor(totalRevenue * 0.28 * 100) / 100 },
      { title: 'Digital Dreams', plays: Math.floor(totalPlays * 0.2), revenue: Math.floor(totalRevenue * 0.22 * 100) / 100 },
      { title: 'Midnight Run', plays: Math.floor(totalPlays * 0.15), revenue: Math.floor(totalRevenue * 0.1 * 100) / 100 },
      { title: 'City Lights', plays: Math.floor(totalPlays * 0.1), revenue: Math.floor(totalRevenue * 0.05 * 100) / 100 }
    ],
    demographics: [
      { country: 'United States', percentage: 35 },
      { country: 'United Kingdom', percentage: 18 },
      { country: 'Canada', percentage: 12 },
      { country: 'Germany', percentage: 8 },
      { country: 'Japan', percentage: 7 },
      { country: 'Other', percentage: 20 }
    ],
    revenue: [
      { source: 'Streaming', amount: Math.floor(totalRevenue * 0.6 * 100) / 100 },
      { source: 'Downloads', amount: Math.floor(totalRevenue * 0.15 * 100) / 100 },
      { source: 'Merch', amount: Math.floor(totalRevenue * 0.15 * 100) / 100 },
      { source: 'Sync', amount: Math.floor(totalRevenue * 0.1 * 100) / 100 }
    ]
  }
}