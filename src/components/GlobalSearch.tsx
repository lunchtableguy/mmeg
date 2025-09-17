'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, X, Loader2, Music, Calendar, FileText, ShoppingBag, Users, Disc } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined)

  const getTotalItems = useCallback(() => {
    if (!results) return 0
    let count = 0
    Object.values(results.results).forEach(items => {
      if (Array.isArray(items)) count += items.length
    })
    return count
  }, [results])

  const handleResultClick = useCallback((index: number) => {
    if (!results) return
    
    let currentIndex = 0
    
    // Navigate based on selected index
    for (const [type, items] of Object.entries(results.results)) {
      if (Array.isArray(items)) {
        for (const item of items) {
          if (currentIndex === index) {
            // Navigate to appropriate page based on type
            let url = ''
            switch (type) {
              case 'artists':
                url = `/artists/${item.id}`
                break
              case 'albums':
                url = `/music/album/${item.id}`
                break
              case 'tracks':
                url = `/music/track/${item.id}`
                break
              case 'events':
                url = `/events/${item.id}`
                break
              case 'blog':
                url = `/blog/${item.slug}`
                break
              case 'merch':
                url = `/merch/${item.id}`
                break
            }
            if (url) {
              router.push(url)
              setIsOpen(false)
              setQuery('')
              setResults(null)
            }
            return
          }
          currentIndex++
        }
      }
    }
  }, [results, router])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
      
      // Escape to close
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }

      // Arrow keys for navigation when results are shown
      if (isOpen && results && results.totalResults > 0) {
        const totalItems = getTotalItems()
        
        if (event.key === 'ArrowDown') {
          event.preventDefault()
          setSelectedIndex(prev => (prev + 1) % totalItems)
        } else if (event.key === 'ArrowUp') {
          event.preventDefault()
          setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems)
        } else if (event.key === 'Enter' && selectedIndex >= 0) {
          event.preventDefault()
          handleResultClick(selectedIndex)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, getTotalItems, handleResultClick])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Debounced search
  const performSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 2) {
      setResults(null)
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setResults(data)
      setSelectedIndex(-1)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    // Clear previous timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current)
    }

    // Debounce search
    searchTimeout.current = setTimeout(() => {
      performSearch(value)
    }, 300)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'artists': return <Users className="w-4 h-4" />
      case 'albums': return <Disc className="w-4 h-4" />
      case 'tracks': return <Music className="w-4 h-4" />
      case 'events': return <Calendar className="w-4 h-4" />
      case 'blog': return <FileText className="w-4 h-4" />
      case 'merch': return <ShoppingBag className="w-4 h-4" />
      default: return null
    }
  }

  let resultIndex = 0

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-base-100 dark:bg-white/10 hover:bg-base-200 dark:hover:bg-white/20 transition"
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline text-sm">Search</span>
        <kbd className="hidden sm:inline px-1.5 py-0.5 text-xs bg-base-200 dark:bg-white/20 rounded">⌘K</kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="container py-20">
            <div 
              ref={searchRef}
              className="max-w-2xl mx-auto bg-white dark:bg-base-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Search Input */}
              <div className="relative border-b border-base-200 dark:border-white/10">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search artists, music, events, and more..."
                  className="w-full pl-12 pr-12 py-4 bg-transparent focus:outline-none text-lg"
                />
                {loading && (
                  <Loader2 className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
                )}
                <button
                  onClick={() => {
                    setIsOpen(false)
                    setQuery('')
                    setResults(null)
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Results */}
              {results && results.totalResults > 0 && (
                <div className="max-h-[60vh] overflow-y-auto">
                  {Object.entries(results.results).map(([type, items]) => {
                    if (!Array.isArray(items) || items.length === 0) return null
                    
                    const typeResults = items.map((item) => {
                      const currentResultIndex = resultIndex++
                      const isSelected = currentResultIndex === selectedIndex
                      
                      return (
                        <button
                          key={`${type}-${item.id}`}
                          onClick={() => handleResultClick(currentResultIndex)}
                          className={`w-full px-4 py-3 flex items-start gap-3 hover:bg-base-100 dark:hover:bg-white/10 transition text-left ${
                            isSelected ? 'bg-base-100 dark:bg-white/10' : ''
                          }`}
                        >
                          <div className="text-gray-400 mt-0.5">{getIcon(type)}</div>
                          <div className="flex-1">
                            <div className="font-medium">
                              {item.title || item.name}
                            </div>
                            {type === 'tracks' && item.album && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {item.album.title} • {item.album.artist.bandName}
                              </div>
                            )}
                            {type === 'albums' && item.artist && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                by {item.artist.bandName}
                              </div>
                            )}
                            {type === 'events' && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(item.date).toLocaleDateString()} • {item.venue}, {item.city}
                              </div>
                            )}
                            {type === 'blog' && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {item.excerpt?.substring(0, 100)}...
                              </div>
                            )}
                            {type === 'merch' && (
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                ${item.price}
                              </div>
                            )}
                          </div>
                        </button>
                      )
                    })

                    return (
                      <div key={type}>
                        <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-base-50 dark:bg-base-900/50">
                          {type}
                        </div>
                        {typeResults}
                      </div>
                    )
                  })}
                </div>
              )}

              {/* No Results */}
              {query.length >= 2 && results && results.totalResults === 0 && !loading && (
                <div className="p-8 text-center text-gray-500">
                  No results found for "{query}"
                </div>
              )}

              {/* Hint */}
              {query.length < 2 && (
                <div className="p-4 text-center text-sm text-gray-500">
                  Type at least 2 characters to search
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}