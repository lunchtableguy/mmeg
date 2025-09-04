import { NEWS } from '@/content/news'
import { NewsCard } from '@/components/NewsCard'
export const metadata = { title: 'News' }
export default function NewsPage() {
  return (
    <section className="container py-16">
      <h1 className="text-4xl font-semibold">News</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {NEWS.map(n => <NewsCard key={n.slug} post={n} />)}
      </div>
    </section>
  )
}