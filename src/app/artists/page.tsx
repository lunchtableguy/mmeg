import { ARTISTS_DATA } from '@/content/artists-data'
import Link from 'next/link'
import Image from 'next/image'
import { Music2, Users, Play, TrendingUp } from 'lucide-react'

export const metadata = { 
  title: 'Artists',
  description: 'Explore the MMEG roster of groundbreaking artists'
}

export default function ArtistsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-600/20 via-transparent to-transparent" />
        <div className="container relative">
          <h1 className="text-5xl md:text-7xl font-display tracking-wider uppercase text-white mb-4">
            Our Artists
          </h1>
          <p className="text-xl text-white/70 max-w-2xl">
            Explore our roster of groundbreaking talent. From K-Pop innovators to soulful balladeers, 
            MMEG represents artists who are shaping the future of music.
          </p>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="container py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {ARTISTS_DATA.map((artist) => (
            <Link 
              key={artist.slug} 
              href={`/artists/${artist.slug}`}
              className="group"
            >
              <article className="h-full rounded-xl overflow-hidden bg-base-800/50 border border-white/10 hover:border-accent-600/50 transition-all duration-300">
                <div className="grid lg:grid-cols-2 h-full">
                  {/* Image */}
                  <div className="relative aspect-[4/3] lg:aspect-auto">
                    <Image
                      src={artist.image}
                      alt={artist.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-transparent to-transparent lg:bg-gradient-to-r" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 lg:p-8 flex flex-col">
                    <div className="flex-1">
                      <h2 className="text-2xl lg:text-3xl font-display tracking-wider uppercase text-white mb-2 group-hover:text-accent-500 transition-colors">
                        {artist.name}
                      </h2>
                      <p className="text-white/70 mb-4">
                        {artist.tagline}
                      </p>
                      
                      {/* Genres */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {artist.genre.map((genre) => (
                          <span 
                            key={genre}
                            className="px-3 py-1 rounded-full bg-white/10 text-xs uppercase tracking-wider"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                      
                      {/* Bio Preview */}
                      <p className="text-sm text-white/60 line-clamp-3 mb-6">
                        {artist.bio.split('\n\n')[0]}
                      </p>
                    </div>
                    
                    {/* Stats */}
                    {artist.stats && (
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                        <div>
                          <div className="flex items-center gap-1 text-white/60 mb-1">
                            <TrendingUp className="w-3 h-3" />
                            <span className="text-xs">Monthly</span>
                          </div>
                          <div className="text-lg font-semibold">{artist.stats.monthlyListeners}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-white/60 mb-1">
                            <Users className="w-3 h-3" />
                            <span className="text-xs">Followers</span>
                          </div>
                          <div className="text-lg font-semibold">{artist.stats.followers}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-white/60 mb-1">
                            <Play className="w-3 h-3" />
                            <span className="text-xs">Streams</span>
                          </div>
                          <div className="text-lg font-semibold">{artist.stats.totalStreams}</div>
                        </div>
                      </div>
                    )}
                    
                    {/* View Profile Link */}
                    <div className="mt-6">
                      <span className="inline-flex items-center gap-2 text-accent-500 group-hover:text-accent-400 transition-colors">
                        View Full Profile
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-600 to-accent-700">
        <div className="container text-center">
          <h2 className="text-3xl font-display tracking-wider uppercase mb-4">
            Interested in Joining MMEG?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            We're always looking for exceptional talent that pushes boundaries and creates meaningful art.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-3 rounded-lg bg-white text-accent-600 hover:bg-white/90 transition-colors font-semibold"
            >
              Submit Your Music
            </Link>
            <Link 
              href="/about"
              className="px-8 py-3 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors font-semibold backdrop-blur"
            >
              Learn More About MMEG
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}