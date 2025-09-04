import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')?.toLowerCase().trim()
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '20')

    if (!query || query.length < 2) {
      return NextResponse.json({ 
        results: [],
        message: 'Query must be at least 2 characters' 
      })
    }

    const results: any = {}

    // Search Artists/Bands
    if (!type || type === 'artists') {
      const artists = await prisma.user.findMany({
        where: {
          AND: [
            { role: 'BAND' },
            {
              OR: [
                { name: { contains: query, mode: 'insensitive' } },
                { artistProfile: { bio: { contains: query, mode: 'insensitive' } } }
              ]
            }
          ]
        },
        select: {
          id: true,
          name: true,
          image: true,
          artistProfile: {
            select: {
              bio: true,
              genre: true
            }
          }
        },
        take: limit
      })
      results.artists = artists
    }

    // Search Albums
    if (!type || type === 'albums') {
      const albums = await prisma.album.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          title: true,
          coverImage: true,
          releaseDate: true,
          artist: {
            select: {
              id: true,
              name: true
            }
          }
        },
        take: limit
      })
      results.albums = albums
    }

    // Search Tracks
    if (!type || type === 'tracks') {
      const tracks = await prisma.track.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { album: { title: { contains: query, mode: 'insensitive' } } },
            { album: { artist: { name: { contains: query, mode: 'insensitive' } } } }
          ]
        },
        select: {
          id: true,
          title: true,
          duration: true,
          album: {
            select: {
              id: true,
              title: true,
              coverImage: true,
              artist: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
          }
        },
        take: limit
      })
      results.tracks = tracks
    }

    // Search Events
    if (!type || type === 'events') {
      const events = await prisma.event.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { venue: { contains: query, mode: 'insensitive' } },
            { city: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          title: true,
          date: true,
          venue: true,
          city: true,
          ticketUrl: true,
          artist: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { date: 'asc' },
        take: limit
      })
      results.events = events
    }

    // Search Blog Posts
    if (!type || type === 'blog') {
      const posts = await prisma.blogPost.findMany({
        where: {
          published: true,
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { excerpt: { contains: query, mode: 'insensitive' } },
            { content: { contains: query, mode: 'insensitive' } },
            { author: { name: { contains: query, mode: 'insensitive' } } }
          ]
        },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          publishedAt: true,
          author: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: { publishedAt: 'desc' },
        take: limit
      })
      results.blog = posts
    }

    // Search Merch Items
    if (!type || type === 'merch') {
      const merchItems = await prisma.merchItem.findMany({
        where: {
          available: true,
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { category: { contains: query, mode: 'insensitive' } }
          ]
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          images: true,
          category: true
        },
        take: limit
      })
      results.merch = merchItems
    }

    // Count total results
    const totalResults = Object.values(results).reduce((total: number, items: any) => {
      return total + (Array.isArray(items) ? items.length : 0)
    }, 0)

    return NextResponse.json({ 
      query,
      totalResults,
      results 
    })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Failed to search' },
      { status: 500 }
    )
  }
}