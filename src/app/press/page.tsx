import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Download, Camera, FileText, Film, Mail, Phone, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Press & Media Kit',
  description: 'Press resources, media kits, high-resolution images, and contact information'
}

// Mock data - replace with API call
const artists = [
  {
    id: '1',
    name: 'Jane Lee',
    slug: 'jane-lee',
    image: '/artist-placeholder.jpg',
    bio: 'Rising pop sensation Jane Lee combines powerful vocals with introspective songwriting.',
    latestRelease: 'Into the Light (2024)',
    stats: {
      monthlyListeners: '2.5M',
      socialFollowers: '850K',
      tourDates: 25
    }
  },
  {
    id: '2',
    name: 'ECLYP5ED',
    slug: 'eclyp5ed',
    image: '/artist-placeholder.jpg',
    bio: 'Electronic producer pushing boundaries with innovative soundscapes.',
    latestRelease: 'Digital Dreams (2024)',
    stats: {
      monthlyListeners: '1.8M',
      socialFollowers: '620K',
      tourDates: 18
    }
  }
]

const pressReleases = [
  {
    id: '1',
    title: 'MMEG Signs Multi-Album Deal with Rising Star Jane Lee',
    date: '2024-03-15',
    excerpt: 'Maryott Media & Entertainment Group announces exclusive partnership...'
  },
  {
    id: '2',
    title: 'ECLYP5ED Announces World Tour Following Chart Success',
    date: '2024-03-10',
    excerpt: 'Electronic artist ECLYP5ED will embark on a 30-city world tour...'
  }
]

export default function PressPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-200 dark:from-gray-900/50 to-white dark:to-base-900 py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Press & Media Kit</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Access artist bios, high-resolution images, press releases, and media resources.
          </p>
        </div>
      </section>

      {/* Quick Downloads */}
      <section className="container py-16">
        <div className="bg-gray-50 dark:bg-base-800/30 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold mb-6">Quick Downloads</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            <a href="#" className="flex items-center gap-3 bg-white dark:bg-base-800 p-4 rounded-xl hover:shadow-lg transition">
              <Globe className="text-blue-600" size={24} />
              <div>
                <div className="font-semibold">MMEG Logo Pack</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">SVG, PNG, PDF</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 bg-white dark:bg-base-800 p-4 rounded-xl hover:shadow-lg transition">
              <FileText className="text-green-600" size={24} />
              <div>
                <div className="font-semibold">Company One-Sheet</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">PDF, 2 pages</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 bg-white dark:bg-base-800 p-4 rounded-xl hover:shadow-lg transition">
              <Camera className="text-purple-600" size={24} />
              <div>
                <div className="font-semibold">Executive Photos</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">High-res JPG</div>
              </div>
            </a>
            <a href="#" className="flex items-center gap-3 bg-white dark:bg-base-800 p-4 rounded-xl hover:shadow-lg transition">
              <Film className="text-orange-600" size={24} />
              <div>
                <div className="font-semibold">Video Assets</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">MP4, MOV</div>
              </div>
            </a>
          </div>
        </div>

        {/* Artist Press Kits */}
        <h2 className="text-3xl font-bold mb-8">Artist Press Kits</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {artists.map(artist => (
            <div key={artist.id} className="bg-white dark:bg-base-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="relative h-64">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white mb-1">{artist.name}</h3>
                  <p className="text-white/80">{artist.latestRelease}</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-700 dark:text-gray-300 mb-4">{artist.bio}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{artist.stats.monthlyListeners}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Monthly Listeners</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{artist.stats.socialFollowers}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Social Followers</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{artist.stats.tourDates}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Tour Dates</div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Link href={`/press/${artist.slug}`} className="flex-1 bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black text-center py-2 rounded-lg transition">
                    View Full Kit
                  </Link>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Press Releases */}
      <section className="bg-gray-50 dark:bg-base-800/30 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Recent Press Releases</h2>
          <div className="space-y-4 max-w-3xl">
            {pressReleases.map(release => (
              <div key={release.id} className="bg-white dark:bg-base-800 p-6 rounded-xl hover:shadow-lg transition">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {new Date(release.date).toLocaleDateString()}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{release.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{release.excerpt}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ml-4">
                    <Download size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Link href="/press/releases" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold">
              View All Press Releases →
            </Link>
          </div>
        </div>
      </section>

      {/* Press Contact */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-8 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Press Inquiries</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            For press inquiries, interview requests, and additional resources, please contact our PR team.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Mail className="text-blue-600" size={20} />
              <a href="mailto:press@mmeg.com" className="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
                press@mmeg.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Phone className="text-blue-600" size={20} />
              <a href="tel:+13235551234" className="text-lg font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
                (323) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}