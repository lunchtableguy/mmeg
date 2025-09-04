import { NEWS } from '@/content/news'
import { notFound } from 'next/navigation'
export async function generateStaticParams(){ return NEWS.map(n=>({ slug: n.slug })) }
export default function PostPage({ params }: { params: { slug: string } }){
  const post = NEWS.find(n => n.slug === params.slug)
  if (!post) return notFound()
  return (
    <section className="container py-16">
      <div className="text-white/50 text-sm">{new Date(post.date).toLocaleDateString()}</div>
      <h1 className="mt-2 text-4xl font-semibold">{post.title}</h1>
      <article className="prose prose-invert max-w-3xl mt-6">
        <p>{post.excerpt}</p>
        <p>Full story content goes here. Add images, pull‑quotes, embeds, and galleries.</p>
      </article>
    </section>
  )
}