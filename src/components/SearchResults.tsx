'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Loader2, Music, Calendar, FileText, ShoppingBag, Users, Disc } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface SearchResult {
  query: string
  totalResults: number
  results: {
    artists?: any[]
    albums?: any[]
    tracks?: any[]
    events?: any[]
    blog?: any[]
    merch?: any[]
  }
}

const CATEGORIES = [
  { id: 'all', label: 'All', icon: null },
  { id: 'artists', label: 'Artists', icon: Users },
  { id: 'albums', label: 'Albums', icon: Disc },
  { id: 'tracks', label: 'Tracks', icon: Music },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'merch', label: 'Merch', icon: ShoppingBag }
]

export function SearchResults() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState('all')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)

  const performSearch = useCallback(async (searchQuery: string, searchCategory: string) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults(null)
      return
    }

    setLoading(true)
    try {
      const typeParam = searchCategory === 'all' ? '' : `&type=${searchCategory}`
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}${typeParam}`)
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Perform search on mount if query exists
  useEffect(() => {
    const initialQuery = searchParams.get('q')
    if (initialQuery) {
      setQuery(initialQuery)
      performSearch(initialQuery, 'all')
    }
  }, [searchParams, performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch(query, category)
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    if (query) {
      performSearch(query, newCategory)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Search Header */}
      <section className="bg-gradient-to-b from-blue-900/20 to-base-900 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold mb-8 text-center">Search</h1>
          
          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artists, music, events, and more..."
                className="w-full pl-12 pr-32 py-4 rounded-xl bg-white dark:bg-base-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || query.length < 2}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
              </button>
            </div>
          </form>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  category === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-base-800 hover:bg-gray-100 dark:hover:bg-base-700'
                }`}
              >
                {cat.icon && <cat.icon className="w-4 h-4" />}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="container py-12">
        {results && results.totalResults > 0 && (
          <>
            <div className="text-center mb-8">
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Found <span className="font-semibold text-gray-900 dark:text-white">{results.totalResults}</span> results for "<span className="font-semibold text-gray-900 dark:text-white">{results.query}</span>"
              </p>
            </div>

            {/* Artists */}
            {results.results.artists && results.results.artists.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Artists
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.results.artists.map((artist) => (
                    <Link
                      key={artist.id}
                      href={`/artists/${artist.id}`}
                      className="bg-white dark:bg-base-800 rounded-xl p-6 hover:shadow-lg transition"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0">
                          {artist.image && (
                            <Image
                              src={artist.image}
                              alt={artist.name}
                              width={64}
                              height={64}
                              className="rounded-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{artist.name}</h3>
                          {artist.artistProfile?.genre && (
                            <p className="text-sm text-gray-600 dark:text-gray-400">{artist.artistProfile.genre}</p>
                          )}
                          {artist.artistProfile?.bio && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                              {artist.artistProfile.bio}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Albums */}
            {results.results.albums && results.results.albums.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Disc className="w-6 h-6" />
                  Albums
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {results.results.albums.map((album) => (
                    <Link
                      key={album.id}
                      href={`/music/album/${album.id}`}
                      className="bg-white dark:bg-base-800 rounded-xl overflow-hidden hover:shadow-lg transition"
                    >
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700">
                        {album.coverImage && (
                          <Image
                            src={album.coverImage}
                            alt={album.title}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold truncate">{album.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{album.artist.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(album.releaseDate).getFullYear()}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Tracks */}
            {results.results.tracks && results.results.tracks.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Music className="w-6 h-6" />
                  Tracks
                </h2>
                <div className="bg-white dark:bg-base-800 rounded-xl overflow-hidden">
                  {results.results.tracks.map((track) => (
                    <Link
                      key={track.id}
                      href={`/music/track/${track.id}`}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-base-700 transition border-b border-gray-100 dark:border-gray-700 last:border-0"
                    >
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0">
                        {track.album.coverImage && (
                          <Image
                            src={track.album.coverImage}
                            alt={track.album.title}
                            width={48}
                            height={48}
                            className="rounded object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{track.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {track.album.artist.name} • {track.album.title}
                        </p>
                      </div>
                      <div className="text-sm text-gray-500">
                        {Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Events */}
            {results.results.events && results.results.events.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Events
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {results.results.events.map((event) => (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className="bg-white dark:bg-base-800 rounded-xl p-6 hover:shadow-lg transition"
                    >
                      <div className="flex gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            {new Date(event.date).getDate()}
                          </div>
                          <div className="text-sm uppercase text-gray-600 dark:text-gray-400">
                            {new Date(event.date).toLocaleDateString('en', { month: 'short' })}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{event.title}</h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {event.venue}, {event.city}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {event.artist.name}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Blog Posts */}
            {results.results.blog && results.results.blog.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Blog Posts
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {results.results.blog.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="bg-white dark:bg-base-800 rounded-xl p-6 hover:shadow-lg transition"
                    >
                      <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{post.author.name}</span>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Merch */}
            {results.results.merch && results.results.merch.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6" />
                  Merchandise
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {results.results.merch.map((item) => (
                    <Link
                      key={item.id}
                      href={`/merch/${item.id}`}
                      className="bg-white dark:bg-base-800 rounded-xl overflow-hidden hover:shadow-lg transition"
                    >
                      <div className="aspect-square bg-gray-200 dark:bg-gray-700">
                        {item.images?.[0] && (
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            width={300}
                            height={300}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
                        <p className="font-bold mt-2">${item.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* No Results */}
        {results && results.totalResults === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No results found for "{results.query}"
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Try searching with different keywords or check the spelling
            </p>
          </div>
        )}

        {/* Initial State */}
        {!results && !loading && query.length >= 2 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Press Enter or click Search to find results
            </p>
          </div>
        )}
      </section>
    </div>
  )
}