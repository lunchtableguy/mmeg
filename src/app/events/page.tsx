import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, MapPin, Ticket, Video, Users, PartyPopper } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Events & Shows',
  description: 'Upcoming concerts, festivals, livestreams, and special events'
}

// Mock data - replace with API call
const events = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    type: 'FESTIVAL',
    artist: null, // Multi-artist event
    description: 'Join all MMEG artists for our annual summer festival featuring live performances, meet & greets, and exclusive merch.',
    venue: 'Red Rocks Amphitheatre',
    city: 'Morrison',
    state: 'CO',
    country: 'USA',
    date: '2024-07-15',
    endDate: '2024-07-17',
    imageUrl: '/header image placeholder.jpg',
    ticketLink: '#',
    featured: true
  },
  {
    id: '2',
    title: 'Jane Lee World Tour',
    type: 'CONCERT',
    artist: 'Jane Lee',
    description: 'Experience Jane Lee live on her biggest tour yet.',
    venue: 'The Forum',
    city: 'Los Angeles',
    state: 'CA',
    country: 'USA',
    date: '2024-05-20',
    imageUrl: '/artist-placeholder.jpg',
    ticketLink: '#',
    featured: false
  },
  {
    id: '3',
    title: 'Virtual Album Launch Party',
    type: 'LIVESTREAM',
    artist: 'ECLYP5ED',
    description: 'Exclusive livestream performance celebrating the new album release.',
    date: '2024-04-10',
    imageUrl: '/artist-placeholder.jpg',
    ticketLink: '#',
    featured: false
  },
  {
    id: '4',
    title: 'VIP Meet & Greet',
    type: 'MEET_GREET',
    artist: 'Jane Lee',
    description: 'Limited tickets available for an intimate meet & greet session.',
    venue: 'MMEG Studios',
    city: 'Nashville',
    state: 'TN',
    country: 'USA',
    date: '2024-04-25',
    imageUrl: '/artist-placeholder.jpg',
    ticketLink: '#',
    featured: false
  }
]

const getEventIcon = (type: string) => {
  switch (type) {
    case 'CONCERT': return <Ticket className="w-5 h-5" />
    case 'FESTIVAL': return <PartyPopper className="w-5 h-5" />
    case 'LIVESTREAM': return <Video className="w-5 h-5" />
    case 'MEET_GREET': return <Users className="w-5 h-5" />
    default: return <Calendar className="w-5 h-5" />
  }
}

const getEventColor = (type: string) => {
  switch (type) {
    case 'CONCERT': return 'bg-blue-500'
    case 'FESTIVAL': return 'bg-purple-500'
    case 'LIVESTREAM': return 'bg-red-500'
    case 'MEET_GREET': return 'bg-green-500'
    default: return 'bg-gray-500'
  }
}

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-900/20 to-base-900 py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Events & Shows</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Don't miss out on concerts, festivals, livestreams, and exclusive events.
          </p>
        </div>
      </section>

      {/* Featured Event */}
      {events.filter(e => e.featured).map(event => (
        <section key={event.id} className="container py-16">
          <h2 className="text-3xl font-bold mb-8">Featured Event</h2>
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-96 md:h-auto">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 mb-4">
                  {getEventIcon(event.type)}
                  <span className="uppercase">{event.type.replace('_', ' ')}</span>
                </div>
                <h3 className="text-4xl font-bold mb-4">{event.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar size={16} />
                    {new Date(event.date).toLocaleDateString()} 
                    {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString()}`}
                  </div>
                  {event.venue && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin size={16} />
                      {event.venue}, {event.city}, {event.state}
                    </div>
                  )}
                </div>
                
                <a
                  href={event.ticketLink}
                  className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition"
                >
                  Get Tickets
                </a>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Event Types Filter */}
      <section className="container py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {['ALL', 'CONCERT', 'FESTIVAL', 'LIVESTREAM', 'MEET_GREET'].map(type => (
            <button
              key={type}
              className={`px-6 py-2 rounded-full transition ${
                type === 'ALL' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {type === 'ALL' ? 'All Events' : type.replace('_', ' & ')}
            </button>
          ))}
        </div>
      </section>

      {/* Events Grid */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.filter(e => !e.featured).map(event => (
            <div key={event.id} className="bg-white dark:bg-base-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
              <div className="relative h-48">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute top-4 left-4 ${getEventColor(event.type)} text-white px-3 py-1 rounded-full text-sm flex items-center gap-1`}>
                  {getEventIcon(event.type)}
                  {event.type.replace('_', ' ')}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                {event.artist && (
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    {event.artist}
                  </p>
                )}
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2">
                  {event.description}
                </p>
                
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar size={14} />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  {event.venue && (
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin size={14} />
                      {event.venue}, {event.city}
                    </div>
                  )}
                </div>
                
                <a
                  href={event.ticketLink}
                  className="block text-center bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black py-2 rounded-lg transition"
                >
                  {event.type === 'LIVESTREAM' ? 'Watch Live' : 'Get Tickets'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}