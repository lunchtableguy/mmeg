import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET(_request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's membership
    const membership = await prisma.membership.findFirst({
      where: {
        userId: session.user.id,
        active: true
      }
    })

    if (!membership) {
      return NextResponse.json({ membership: null })
    }

    // Calculate stats
    const daysAsMember = Math.floor(
      (new Date().getTime() - new Date(membership.startDate).getTime()) / (1000 * 60 * 60 * 24)
    )

    // Mock data for now - in production, fetch from actual content/event tables
    const exclusiveContent = [
      {
        id: '1',
        title: 'Behind the Scenes: Studio Session',
        type: 'video',
        artist: 'Jane Lee',
        duration: '15 min',
        thumbnail: '/artist-placeholder.jpg'
      },
      {
        id: '2', 
        title: 'Unreleased Demo: "Midnight Dreams"',
        type: 'audio',
        artist: 'ECLYP5ED',
        downloadable: membership.tier !== 'FREE',
        thumbnail: '/artist-placeholder.jpg'
      },
      {
        id: '3',
        title: 'Live Q&A Recording',
        type: 'video',
        artist: 'Multiple Artists',
        duration: '45 min',
        thumbnail: '/artist-placeholder.jpg'
      }
    ]

    const upcomingEvents = [
      {
        id: '1',
        title: 'Virtual Meet & Greet',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'online',
        tierRequired: 'VIP'
      },
      {
        id: '2',
        title: 'Listening Party',
        date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'online',
        tierRequired: 'FAN'
      }
    ]

    return NextResponse.json({
      membership: {
        tier: membership.tier,
        startDate: membership.startDate,
        active: membership.active
      },
      exclusiveContent: filterContentByTier(exclusiveContent, membership.tier),
      upcomingEvents: filterEventsByTier(upcomingEvents, membership.tier),
      stats: {
        daysAsMember,
        contentAccessed: Math.floor(Math.random() * 50) + 10, // Mock data
        eventsAttended: Math.floor(Math.random() * 10) + 1    // Mock data
      }
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}

function filterContentByTier(content: any[], tier: string) {
  const tierHierarchy = {
    VIP: 4,
    SUPERFAN: 3,
    FAN: 2,
    FREE: 1
  }
  
  return content.filter(item => {
    if (!item.tierRequired) return true
    return tierHierarchy[tier as keyof typeof tierHierarchy] >= 
           tierHierarchy[item.tierRequired as keyof typeof tierHierarchy]
  })
}

function filterEventsByTier(events: any[], tier: string) {
  const tierHierarchy = {
    VIP: 4,
    SUPERFAN: 3,
    FAN: 2,
    FREE: 1
  }
  
  return events.filter(event => {
    if (!event.tierRequired) return true
    return tierHierarchy[tier as keyof typeof tierHierarchy] >= 
           tierHierarchy[event.tierRequired as keyof typeof tierHierarchy]
  })
}