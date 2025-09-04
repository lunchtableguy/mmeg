import { ARTISTS } from '@/content/artists'
import { ArtistCard } from '@/components/ArtistCard'
export const metadata = { title: 'Artists' }
export default function ArtistsPage() {
  return (
    <section className="container py-16">
      <h1 className="text-4xl font-semibold">Artists</h1>
      <p className="mt-4 text-gray-600 dark:text-white/70">Explore our roster. Click through for full profiles, tour dates, releases, and press assets.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {ARTISTS.map(a => <ArtistCard key={a.slug} artist={a} />)}
      </div>
    </section>
  )
}