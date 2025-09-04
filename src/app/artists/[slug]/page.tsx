import { ARTISTS } from '@/content/artists'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return ARTISTS.map(a => ({ slug: a.slug }))
}

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = ARTISTS.find(a => a.slug === params.slug)
  if (!artist) return notFound()
  return (
    <section className="container py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="aspect-[4/3] rounded-2xl bg-white/5" style={{backgroundImage:`url(${artist.image ?? '/artist-placeholder.jpg'})`, backgroundSize:'cover', backgroundPosition:'center'}} />
        <div>
          <h1 className="text-4xl font-semibold">{artist.name}</h1>
          <p className="mt-4 text-white/70">{artist.tagline}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <a className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 hover:bg-white/15" href="#">Latest Release</a>
            <a className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 hover:bg-white/15" href="#">Press Kit</a>
            <a className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 hover:bg-white/15" href="#">Tour Dates</a>
            <a className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15 hover:bg-white/15" href="#">Socials</a>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="text-2xl font-semibold">Highlights</h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          <li className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">Streaming milestones, awards, or notable press go here.</li>
          <li className="rounded-xl bg-white/5 p-4 ring-1 ring-white/10">Brand partnerships, sync wins, or sold‑out shows.</li>
        </ul>
      </div>
    </section>
  )
}