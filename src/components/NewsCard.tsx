'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export function NewsCard({ post }: { post: { slug: string, title: string, excerpt: string, date: string } }) {
  return (
    <Link href={`/news/${post.slug}`} className="block h-full">
      <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="h-full flex flex-col rounded-2xl bg-base-150 dark:bg-white/5 ring-1 ring-base-200 dark:ring-white/10 p-5 hover:ring-blue-500 hover:ring-2 dark:hover:ring-accent-600 transition shadow-sm hover:shadow-lg hover:shadow-blue-500/10">
        <div className="text-xs text-base-500 dark:text-white/50">{new Date(post.date).toLocaleDateString()}</div>
        <div className="mt-1 font-semibold text-base-900 dark:text-white">{post.title}</div>
        <p className="mt-2 text-base-600 dark:text-white/75 text-sm flex-1">{post.excerpt}</p>
      </motion.div>
    </Link>
  )
}