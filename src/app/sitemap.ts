import { ARTISTS } from '@/content/artists'
import { NEWS } from '@/content/news'

export default async function sitemap() {
  const base = 'https://www.example.com'
  const staticUrls = ['', '/about', '/artists', '/news', '/contact', '/privacy', '/terms']
  const artistUrls = ARTISTS.map(a => `/artists/${a.slug}`)
  const newsUrls = NEWS.map(n => `/news/${n.slug}`)

  return [...staticUrls, ...artistUrls, ...newsUrls].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : .7,
  }))
}