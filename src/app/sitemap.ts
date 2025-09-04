import { ARTISTS } from '@/content/artists'
import { NEWS } from '@/content/news'

export default async function sitemap() {
  const base = 'https://www.example.com'
  const staticUrls = [
    '', 
    '/about', 
    '/about/management-team',
    '/artists', 
    '/artists/featured',
    '/artists/sign-in',
    '/news', 
    '/contact', 
    '/privacy', 
    '/terms',
    '/music',
    '/events',
    '/blog',
    '/merch',
    '/sync',
    '/press',
    '/careers',
    '/partners',
    '/search',
    '/fan-club',
    '/fan-club/join',
    '/fan-club/dashboard',
    '/artists/dashboard',
    '/artists/analytics',
    '/cookie-settings'
  ]
  const artistUrls = ARTISTS.map(a => `/artists/${a.slug}`)
  const newsUrls = NEWS.map(n => `/news/${n.slug}`)

  return [...staticUrls, ...artistUrls, ...newsUrls].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : .7,
  }))
}