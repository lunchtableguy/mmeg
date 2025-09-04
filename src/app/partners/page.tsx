import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Handshake, Trophy, Building2, Mic2, Laptop, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Partners & Sponsors',
  description: 'Our valued partners and sponsorship opportunities'
}

// Mock data - replace with API call
const partners = [
  {
    id: '1',
    name: 'Spotify',
    logo: '/artist-placeholder.jpg',
    type: 'MEDIA_PARTNER',
    description: 'Exclusive playlist partnerships and artist features',
    featured: true
  },
  {
    id: '2',
    name: 'Live Nation',
    logo: '/artist-placeholder.jpg',
    type: 'VENUE_PARTNER',
    description: 'Premier touring and venue partnerships',
    featured: true
  },
  {
    id: '3',
    name: 'Gibson',
    logo: '/artist-placeholder.jpg',
    type: 'BRAND_SPONSOR',
    description: 'Official instrument partner for MMEG artists',
    featured: true
  },
  {
    id: '4',
    name: 'Adobe Creative Cloud',
    logo: '/artist-placeholder.jpg',
    type: 'TECH_PARTNER',
    description: 'Powering our creative content production',
    featured: false
  },
  {
    id: '5',
    name: 'Red Bull',
    logo: '/artist-placeholder.jpg',
    type: 'BRAND_SPONSOR',
    description: 'Energy partner for tours and events',
    featured: false
  }
]

const sponsorshipOpportunities = [
  {
    title: 'Tour Sponsorship',
    icon: <Mic2 />,
    description: 'Associate your brand with our artists\' tours',
    benefits: ['Logo placement', 'VIP experiences', 'Social media integration']
  },
  {
    title: 'Event Partnership',
    icon: <Trophy />,
    description: 'Sponsor festivals and showcase events',
    benefits: ['Brand activation zones', 'Product sampling', 'Media coverage']
  },
  {
    title: 'Content Sponsorship',
    icon: <Laptop />,
    description: 'Partner on music videos and digital content',
    benefits: ['Product placement', 'Co-branded content', 'Behind-the-scenes access']
  }
]

const getPartnerTypeIcon = (type: string) => {
  switch (type) {
    case 'BRAND_SPONSOR': return <Handshake />
    case 'MEDIA_PARTNER': return <Mic2 />
    case 'VENUE_PARTNER': return <Building2 />
    case 'TECH_PARTNER': return <Laptop />
    default: return <Users />
  }
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900/20 to-base-900 py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Partners & Sponsors</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Building successful partnerships with brands that share our vision for the future of music.
          </p>
        </div>
      </section>

      {/* Featured Partners */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8">Our Partners</h2>
        
        {/* Featured Partner Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {partners.filter(p => p.featured).map(partner => (
            <div key={partner.id} className="bg-gradient-to-br from-blue-50 dark:from-blue-900/20 to-purple-50 dark:to-purple-900/20 rounded-2xl p-8">
              <div className="h-24 mb-6 relative">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 mb-2">
                {getPartnerTypeIcon(partner.type)}
                <span>{partner.type.replace(/_/g, ' ')}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{partner.description}</p>
            </div>
          ))}
        </div>

        {/* Other Partners */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {partners.filter(p => !p.featured).map(partner => (
            <div key={partner.id} className="bg-white dark:bg-base-800/50 rounded-xl p-6 text-center hover:shadow-lg transition">
              <div className="h-16 mb-4 relative">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain filter grayscale hover:grayscale-0 transition"
                />
              </div>
              <h3 className="font-semibold">{partner.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="bg-gray-50 dark:bg-base-800/30 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Partnership Success Stories</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-base-800 rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Spotify x MMEG Artist Spotlight</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Our exclusive partnership resulted in 10M+ playlist adds and a 300% increase in monthly listeners for featured artists.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">+10M Streams</span>
                  <span className="text-purple-600 dark:text-purple-400 font-semibold">5 Artists Featured</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-base-800 rounded-2xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-orange-500 to-red-500" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Red Bull Music Festival Partnership</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Co-created immersive music experiences reaching 50,000+ fans across 5 cities with our artist lineup.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-orange-600 dark:text-orange-400 font-semibold">50K+ Attendees</span>
                  <span className="text-red-600 dark:text-red-400 font-semibold">5 Cities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Opportunities */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Sponsorship Opportunities</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          Connect your brand with passionate music fans through customized partnership packages.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {sponsorshipOpportunities.map((opp, idx) => (
            <div key={idx} className="bg-white dark:bg-base-800/50 rounded-2xl p-8 hover:shadow-xl transition">
              <div className="text-blue-600 dark:text-blue-400 mb-4">{opp.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{opp.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{opp.description}</p>
              <ul className="space-y-2">
                {opp.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-1.5 h-1.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/partners/inquire" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition">
            Become a Partner
          </Link>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Partner with MMEG?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50M+</div>
              <p className="text-gray-600 dark:text-gray-400">Monthly Reach</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">18-34</div>
              <p className="text-gray-600 dark:text-gray-400">Core Demographic</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">200+</div>
              <p className="text-gray-600 dark:text-gray-400">Annual Events</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">95%</div>
              <p className="text-gray-600 dark:text-gray-400">Partner Retention</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container py-16">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Let's Create Something Amazing Together</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our partnerships team to explore collaboration opportunities.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="mailto:partnerships@mmeg.com" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition">
              partnerships@mmeg.com
            </a>
            <a href="tel:+13235559876" className="bg-blue-700 hover:bg-blue-800 px-8 py-3 rounded-full font-semibold transition">
              (323) 555-9876
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}