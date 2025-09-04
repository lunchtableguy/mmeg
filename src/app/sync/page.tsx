import { Metadata } from 'next'
import Link from 'next/link'
import { Film, Tv, Gamepad2, Radio, ShoppingBag, Globe, Search, Headphones } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sync Licensing',
  description: 'License MMEG music for film, TV, commercials, video games, and more'
}

// Mock data - replace with API call
const featuredPlacements = [
  {
    id: '1',
    track: 'Into the Light',
    artist: 'Jane Lee',
    project: 'Netflix Original Series',
    type: 'TV',
    year: '2024'
  },
  {
    id: '2',
    track: 'Digital Dreams',
    artist: 'ECLYP5ED',
    project: 'Nike Commercial',
    type: 'COMMERCIAL',
    year: '2024'
  },
  {
    id: '3',
    track: 'Summer Nights',
    artist: 'Jane Lee',
    project: 'EA Sports Game',
    type: 'VIDEO_GAME',
    year: '2023'
  }
]

const genres = [
  'Pop', 'Electronic', 'Rock', 'Hip-Hop', 'R&B', 'Indie', 'Orchestral', 'Ambient'
]

const moods = [
  'Uplifting', 'Emotional', 'Energetic', 'Dark', 'Chill', 'Inspiring', 'Dramatic', 'Playful'
]

export default function SyncPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-900/20 to-base-900 py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Sync Licensing</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Find the perfect track for your project. License music from our diverse catalog for film, TV, advertising, games, and more.
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="/sync/search" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition inline-block">
              Search Catalog
            </Link>
            <Link href="/sync/inquiry" className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-8 py-3 rounded-full font-semibold transition inline-block">
              Submit Inquiry
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8">Recent Placements</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {featuredPlacements.map(placement => (
            <div key={placement.id} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6">
              <div className="text-purple-600 dark:text-purple-400 mb-3">
                {placement.type === 'TV' && <Tv size={32} />}
                {placement.type === 'COMMERCIAL' && <ShoppingBag size={32} />}
                {placement.type === 'VIDEO_GAME' && <Gamepad2 size={32} />}
              </div>
              <h3 className="text-xl font-semibold mb-1">{placement.track}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">by {placement.artist}</p>
              <p className="font-medium">{placement.project}</p>
              <p className="text-sm text-gray-500">{placement.year}</p>
            </div>
          ))}
        </div>
      </section>

      {/* License Types */}
      <section className="bg-gray-50 dark:bg-base-800/30 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">What We License For</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-base-800 p-6 rounded-xl text-center">
              <Film className="text-purple-600 dark:text-purple-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Film</h3>
              <p className="text-gray-600 dark:text-gray-400">Feature films, documentaries, and short films</p>
            </div>
            <div className="bg-white dark:bg-base-800 p-6 rounded-xl text-center">
              <Tv className="text-blue-600 dark:text-blue-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Television</h3>
              <p className="text-gray-600 dark:text-gray-400">Series, reality shows, and streaming content</p>
            </div>
            <div className="bg-white dark:bg-base-800 p-6 rounded-xl text-center">
              <ShoppingBag className="text-green-600 dark:text-green-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Advertising</h3>
              <p className="text-gray-600 dark:text-gray-400">Commercials, brand campaigns, and promos</p>
            </div>
            <div className="bg-white dark:bg-base-800 p-6 rounded-xl text-center">
              <Gamepad2 className="text-orange-600 dark:text-orange-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Video Games</h3>
              <p className="text-gray-600 dark:text-gray-400">Console, PC, and mobile games</p>
            </div>
            <div className="bg-white dark:bg-base-800 p-6 rounded-xl text-center">
              <Globe className="text-cyan-600 dark:text-cyan-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Digital Media</h3>
              <p className="text-gray-600 dark:text-gray-400">Web content, apps, and social media</p>
            </div>
            <div className="bg-white dark:bg-base-800 p-6 rounded-xl text-center">
              <Radio className="text-red-600 dark:text-red-400 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold mb-2">Podcasts</h3>
              <p className="text-gray-600 dark:text-gray-400">Intro music, background, and segments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search Catalog */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Search Our Catalog</h2>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by track, artist, mood, or genre..."
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white dark:bg-base-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          
          {/* Quick Filters */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Browse by Genre</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map(genre => (
                  <button key={genre} className="bg-white dark:bg-base-800 px-4 py-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition">
                    {genre}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Browse by Mood</h3>
              <div className="flex flex-wrap gap-2">
                {moods.map(mood => (
                  <button key={mood} className="bg-white dark:bg-base-800 px-4 py-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition">
                    {mood}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/sync/search" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition">
              <Headphones size={20} />
              Browse Full Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 dark:bg-base-800/30 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">1</span>
              </div>
              <h3 className="font-semibold mb-2">Search</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Browse our catalog by genre, mood, or keyword</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
              </div>
              <h3 className="font-semibold mb-2">Select</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Choose tracks that fit your project</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h3 className="font-semibold mb-2">License</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get a custom quote for your usage</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">4</span>
              </div>
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Receive high-quality files instantly</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to License?</h2>
          <p className="text-xl mb-8 opacity-90">
            Our sync team is here to help you find the perfect track for your project.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="mailto:sync@mmeg.com" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition">
              Contact Sync Team
            </a>
            <a href="tel:+13235555678" className="bg-purple-700 hover:bg-purple-800 px-8 py-3 rounded-full font-semibold transition">
              Call (323) 555-5678
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}