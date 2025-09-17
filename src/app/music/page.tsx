import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, Music, PlayCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Music & Releases',
  description: 'Explore the latest music releases from MMEG artists'
}

// Mock data - replace with API call
const releases = [
  {
    id: '1',
    artist: 'Jane Lee',
    title: 'Into the Light',
    type: 'ALBUM',
    releaseDate: '2024-03-15',
    coverImage: '/artist-placeholder.jpg',
    tracks: 12,
    featured: true,
    streamingLinks: {
      spotify: '#',
      appleMusic: '#',
      youtube: '#'
    }
  },
  {
    id: '2',
    artist: 'ECLYP5ED',
    title: 'Digital Dreams',
    type: 'SINGLE',
    releaseDate: '2024-02-28',
    coverImage: '/artist-placeholder.jpg',
    tracks: 1,
    featured: false,
    streamingLinks: {
      spotify: '#',
      appleMusic: '#',
      youtube: '#'
    }
  }
]

const upcomingReleases = [
  {
    id: '3',
    artist: 'Jane Lee',
    title: 'Summer Nights EP',
    type: 'EP',
    releaseDate: '2024-06-21',
    coverImage: '/artist-placeholder.jpg',
    presaveLink: '#'
  }
]

export default function MusicPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-base-900 to-base-800 dark:from-base-900 dark:to-base-800 py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Music & Releases</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Discover the latest tracks, albums, and EPs from our artists. Stream on all major platforms.
          </p>
        </div>
      </section>

      {/* Featured Release */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Release</h2>
        {releases.filter(r => r.featured).map(release => (
          <div key={release.id} className="bg-gray-50 dark:bg-base-800/50 rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={release.coverImage}
                  alt={release.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {release.type} • {release.tracks} TRACKS
                </div>
                <h3 className="text-3xl font-bold mb-2">{release.title}</h3>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">by {release.artist}</p>
                
                <div className="flex gap-4 mb-6">
                  <a
                    href={release.streamingLinks.spotify}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full transition"
                  >
                    <Music size={20} />
                    Spotify
                  </a>
                  <a
                    href={release.streamingLinks.appleMusic}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-6 py-3 rounded-full transition"
                  >
                    <PlayCircle size={20} />
                    Apple Music
                  </a>
                  <a
                    href={release.streamingLinks.youtube}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition"
                  >
                    <PlayCircle size={20} />
                    YouTube
                  </a>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Released {new Date(release.releaseDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Releases */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8">Recent Releases</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.filter(r => !r.featured).map(release => (
            <div key={release.id} className="group">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <Image
                  src={release.coverImage}
                  alt={release.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <div className="flex gap-2">
                    <a
                      href={release.streamingLinks.spotify}
                      className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full transition"
                    >
                      <Music size={20} />
                    </a>
                    <a
                      href={release.streamingLinks.appleMusic}
                      className="bg-gray-800 hover:bg-gray-900 text-white p-3 rounded-full transition"
                    >
                      <PlayCircle size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {release.type} • {release.artist}
                </div>
                <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(release.releaseDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Releases */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8">Coming Soon</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingReleases.map(release => (
            <div key={release.id} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-6">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <Image
                  src={release.coverImage}
                  alt={release.title}
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calendar size={48} className="text-white drop-shadow-lg" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {release.type} • {release.artist}
                </div>
                <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Releasing {new Date(release.releaseDate).toLocaleDateString()}
                </p>
                <a
                  href={release.presaveLink}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
                >
                  Pre-save Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}