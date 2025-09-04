import Hero from '@/components/Hero'
import { ArtistCard } from '@/components/ArtistCard'
import { NewsCard } from '@/components/NewsCard'
import { ARTISTS } from '@/content/artists'
import { NEWS } from '@/content/news'

export default function Page() {
  return (
    <>
      <Hero />
      <section className="container py-12 sm:py-16">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-display uppercase">Featured Artists</h2>
          <a href="/artists" className="text-sm text-base-600 dark:text-white/60 hover:text-blue-600 dark:hover:text-accent-600 transition">All Artists →</a>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {ARTISTS.map(a => <ArtistCard key={a.slug} artist={a} />)}
        </div>
      </section>
      <section className="container py-6 sm:py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-display uppercase">Latest News</h2>
          <a href="/news" className="text-sm text-base-600 dark:text-white/60 hover:text-blue-600 dark:hover:text-accent-600 transition">All News →</a>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {NEWS.map(n => <NewsCard key={n.slug} post={n} />)}
        </div>
      </section>
    </>
  )
}