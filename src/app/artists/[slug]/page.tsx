import { ARTISTS_DATA } from '@/content/artists-data'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Instagram, Twitter, Facebook, Youtube, Music2, Play, 
  Calendar, MapPin, ExternalLink, Users, TrendingUp,
  Disc3, ShoppingBag, Newspaper, Trophy, CheckCircle2
} from 'lucide-react'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return ARTISTS_DATA.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artist = ARTISTS_DATA.find(a => a.slug === params.slug)
  
  if (!artist) return { title: 'Artist Not Found' }
  
  return {
    title: artist.name,
    description: artist.tagline,
    openGraph: {
      title: artist.name,
      description: artist.tagline,
      images: [{ url: artist.image }],
    },
  }
}

const socialIcons = {
  instagram: Instagram,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  tiktok: Music2,
  spotify: Music2,
  appleMusic: Music2,
  soundcloud: Music2,
}

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = ARTISTS_DATA.find(a => a.slug === params.slug)
  if (!artist) return notFound()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-base-900/50 to-base-900 z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${artist.coverImage || artist.image})` }}
        />
        <div className="container relative z-20 h-full flex flex-col justify-end pb-12">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display tracking-wider uppercase text-white mb-4">
              {artist.name}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-6">
              {artist.tagline}
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {artist.genre.map((g) => (
                <span key={g} className="px-3 py-1 rounded-full bg-white/10 backdrop-blur text-sm">
                  {g}
                </span>
              ))}
            </div>
            {/* Social Links */}
            <div className="flex gap-3">
              {Object.entries(artist.socialLinks).map(([platform, link]) => {
                const Icon = socialIcons[platform as keyof typeof socialIcons]
                return link ? (
                  <a
                    key={platform}
                    href={link.startsWith('spotify:') || link.startsWith('apple.music') ? '#' : `https://${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ) : null
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      {artist.stats && (
        <section className="bg-gradient-to-r from-accent-600 to-accent-700 py-6">
          <div className="container">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">{artist.stats.monthlyListeners}</div>
                <div className="text-sm opacity-90">Monthly Listeners</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{artist.stats.followers}</div>
                <div className="text-sm opacity-90">Followers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{artist.stats.totalStreams}</div>
                <div className="text-sm opacity-90">Total Streams</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Bio */}
            <section>
              <h2 className="text-3xl font-display tracking-wider uppercase mb-6">Biography</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                {artist.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-white/80 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              {artist.members && (
                <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-white/60 mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-wider">Members</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {artist.members.map((member) => (
                      <span key={member} className="px-3 py-1 rounded-full bg-white/10 text-sm">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Discography */}
            {artist.discography && artist.discography.length > 0 && (
              <section>
                <h2 className="text-3xl font-display tracking-wider uppercase mb-6">Discography</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {artist.discography.map((release) => (
                    <div key={release.id} className="group">
                      <div className="aspect-square rounded-lg bg-white/5 overflow-hidden mb-4">
                        <div 
                          className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                          style={{ backgroundImage: `url(${release.cover || '/placeholder-performer.svg'})` }}
                        />
                      </div>
                      <h3 className="font-semibold text-lg">{release.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span className="capitalize">{release.type}</span>
                        <span>{new Date(release.releaseDate).getFullYear()}</span>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {release.spotifyUrl && (
                          <a href={release.spotifyUrl} className="px-3 py-1 rounded-full bg-green-600/20 text-green-400 text-xs hover:bg-green-600/30 transition-colors">
                            Spotify
                          </a>
                        )}
                        {release.appleMusicUrl && (
                          <a href={release.appleMusicUrl} className="px-3 py-1 rounded-full bg-pink-600/20 text-pink-400 text-xs hover:bg-pink-600/30 transition-colors">
                            Apple Music
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Videos */}
            {artist.videos && artist.videos.length > 0 && (
              <section>
                <h2 className="text-3xl font-display tracking-wider uppercase mb-6">Videos</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {artist.videos.map((video) => (
                    <div key={video.id} className="group cursor-pointer">
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-white/5 mb-3">
                        <div 
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url(https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg)` }}
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-black ml-1" />
                          </div>
                        </div>
                      </div>
                      <h3 className="font-semibold">{video.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-white/60">
                        <span>{video.views} views</span>
                        <span>{new Date(video.releaseDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Upcoming Events */}
            {artist.events && artist.events.length > 0 && (
              <section className="rounded-xl bg-base-800/50 backdrop-blur border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-accent-500" />
                  <h3 className="text-xl font-display tracking-wider uppercase">Tour Dates</h3>
                </div>
                <div className="space-y-4">
                  {artist.events.map((event) => (
                    <div key={event.id} className="pb-4 border-b border-white/10 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="text-sm text-white/60">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        {event.soldOut && (
                          <span className="text-xs px-2 py-1 rounded-full bg-red-500/20 text-red-400">
                            Sold Out
                          </span>
                        )}
                      </div>
                      <div className="font-semibold">{event.venue}</div>
                      <div className="text-sm text-white/60 mb-2">{event.city}</div>
                      {event.ticketUrl && !event.soldOut && (
                        <a 
                          href={event.ticketUrl}
                          className="text-sm text-accent-500 hover:text-accent-400 transition-colors"
                        >
                          Get Tickets →
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Achievements */}
            {artist.achievements && artist.achievements.length > 0 && (
              <section className="rounded-xl bg-base-800/50 backdrop-blur border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <h3 className="text-xl font-display tracking-wider uppercase">Achievements</h3>
                </div>
                <ul className="space-y-3">
                  {artist.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-white/80">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Press */}
            {artist.press && artist.press.length > 0 && (
              <section className="rounded-xl bg-base-800/50 backdrop-blur border border-white/10 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Newspaper className="w-5 h-5 text-blue-500" />
                  <h3 className="text-xl font-display tracking-wider uppercase">Press</h3>
                </div>
                <div className="space-y-4">
                  {artist.press.map((item) => (
                    <div key={item.id}>
                      {item.quote && (
                        <blockquote className="text-lg italic text-white/90 mb-2">
                          "{item.quote}"
                        </blockquote>
                      )}
                      <a 
                        href={item.url}
                        className="group"
                      >
                        <h4 className="font-semibold text-sm group-hover:text-accent-500 transition-colors">
                          {item.title}
                        </h4>
                        <div className="text-xs text-white/60">
                          {item.outlet} • {new Date(item.date).toLocaleDateString()}
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Actions */}
            <section className="space-y-3">
              <Link 
                href="#"
                className="w-full rounded-lg bg-accent-600 hover:bg-accent-700 text-white py-3 px-4 flex items-center justify-center gap-2 transition-colors"
              >
                <Music2 className="w-5 h-5" />
                Listen on Spotify
              </Link>
              <Link 
                href="/merch"
                className="w-full rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur text-white py-3 px-4 flex items-center justify-center gap-2 transition-colors border border-white/10"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Merch
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}