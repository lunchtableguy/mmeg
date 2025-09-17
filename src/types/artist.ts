export interface Artist {
  slug: string
  name: string
  tagline: string
  image: string
  coverImage?: string
  bio: string
  genre: string[]
  location: string
  founded?: string
  members?: string[]
  socialLinks: {
    instagram?: string
    twitter?: string
    facebook?: string
    youtube?: string
    tiktok?: string
    spotify?: string
    appleMusic?: string
    soundcloud?: string
  }
  stats?: {
    monthlyListeners?: string
    followers?: string
    totalStreams?: string
  }
  discography?: {
    id: string
    title: string
    type: 'album' | 'single' | 'ep'
    releaseDate: string
    cover: string
    spotifyUrl?: string
    appleMusicUrl?: string
  }[]
  videos?: {
    id: string
    title: string
    youtubeId: string
    releaseDate: string
    views?: string
  }[]
  photos?: {
    id: string
    url: string
    caption?: string
  }[]
  events?: {
    id: string
    date: string
    venue: string
    city: string
    ticketUrl?: string
    soldOut?: boolean
  }[]
  merch?: {
    id: string
    name: string
    price: number
    image: string
    url: string
  }[]
  press?: {
    id: string
    outlet: string
    title: string
    date: string
    url: string
    quote?: string
  }[]
  achievements?: string[]
}