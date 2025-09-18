'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function ArtistCard({ artist }: { artist: { slug: string, name: string, tagline: string, image?: string } }) {
  return (
    <Link href={`/artists/${artist.slug}`} className="group block h-full">
      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="h-full flex flex-col overflow-hidden rounded-2xl bg-base-150 dark:bg-white/5 ring-1 ring-base-200 dark:ring-white/10 hover:ring-blue-500 hover:ring-2 dark:hover:ring-accent-600 transition shadow-sm hover:shadow-lg hover:shadow-blue-500/10">
        <div className="relative aspect-[4/3]">
          <Image
            src={artist.image ?? '/placeholder-performer.svg'}
            alt={artist.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAAAAACw="
          />
        </div>
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-baseline justify-between">
            <h3 className="font-semibold tracking-wide text-base-900 dark:text-white">{artist.name}</h3>
            <span className="text-xs text-base-500 dark:text-white/50 group-hover:text-blue-600 dark:group-hover:text-accent-600 transition">View →</span>
          </div>
          <p className="mt-1 text-sm text-base-600 dark:text-white/70">{artist.tagline}</p>
        </div>
      </motion.div>
    </Link>
  )
}