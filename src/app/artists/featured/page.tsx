'use client'
import { motion } from 'framer-motion'
import { Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function FeaturedArtistsPage() {
  const featuredArtists = [
    {
      slug: 'aurora-dawn',
      name: 'Aurora Dawn',
      genre: 'Electronic Pop',
      achievement: 'Billboard Hot 100 #3',
      monthlyListeners: '2.5M',
      image: '/artists/aurora-dawn.jpg',
      featured: true
    },
    {
      slug: 'the-midnight-collective',
      name: 'The Midnight Collective',
      genre: 'Indie Rock',
      achievement: 'Grammy Nominated 2024',
      monthlyListeners: '1.8M',
      image: '/artists/the-midnight-collective.jpg',
      featured: true
    },
    {
      slug: 'nova-skye',
      name: 'Nova Skye',
      genre: 'R&B Soul',
      achievement: 'Platinum Single "Gravity"',
      monthlyListeners: '3.2M',
      image: '/artists/nova-skye.jpg',
      featured: true
    }
  ]

  return (
    <section className="container py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <Star className="w-6 h-6 text-blue-500 dark:text-accent-600" />
          <h1 className="text-4xl font-display uppercase">Featured Artists</h1>
        </div>
        
        <p className="max-w-3xl text-base-700 dark:text-white/80 mb-12">
          Our featured artists represent the pinnacle of talent and success. These breakthrough acts are charting new territory and setting the standard for excellence in their genres.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredArtists.map((artist, i) => (
            <motion.div
              key={artist.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/artists/${artist.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-base-100 dark:bg-white/5 ring-1 ring-base-200 dark:ring-white/10 hover:ring-blue-500 dark:hover:ring-accent-600 transition-all duration-300">
                  {/* Featured badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full bg-blue-500 dark:bg-accent-600/90 backdrop-blur px-3 py-1.5 text-sm font-medium text-white dark:text-black">
                    <Star className="w-3.5 h-3.5" />
                    Featured
                  </div>
                  
                  <div className="aspect-square bg-gradient-to-b from-white/10 to-transparent" />
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-base-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-accent-600 transition">
                      {artist.name}
                    </h3>
                    <p className="text-base-600 dark:text-white/60 text-sm mt-1">{artist.genre}</p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-blue-500 dark:text-accent-600">
                        <TrendingUp className="w-4 h-4" />
                        {artist.achievement}
                      </div>
                      <p className="text-sm text-base-500 dark:text-white/50">
                        {artist.monthlyListeners} monthly listeners
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-base-600 dark:text-white/60 mb-6">
            Want to join our roster of featured artists?
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 rounded-2xl bg-blue-500 dark:bg-accent-600 text-white dark:text-black px-6 py-3 font-medium hover:bg-blue-600 dark:hover:bg-accent-700 transition"
          >
            Get in Touch
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}