import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog & Editorial',
  description: 'Artist interviews, behind-the-scenes content, and industry insights'
}

// Mock data - replace with API call
const blogPosts = [
  {
    id: '1',
    slug: 'jane-lee-studio-sessions',
    title: 'Behind the Scenes: Jane Lee\'s Studio Sessions',
    excerpt: 'An exclusive look at the creative process behind "Into the Light" album.',
    content: '',
    coverImage: '/artist-placeholder.jpg',
    author: 'Sarah Johnson',
    artist: 'Jane Lee',
    tags: ['Behind the Scenes', 'Studio', 'Album'],
    publishedAt: '2024-03-10',
    readTime: 5,
    featured: true
  },
  {
    id: '2',
    slug: 'future-of-live-music',
    title: 'The Future of Live Music: Virtual Concerts & Beyond',
    excerpt: 'How technology is reshaping the concert experience in 2024.',
    content: '',
    coverImage: '/header image placeholder.jpg',
    author: 'Mike Chen',
    artist: null,
    tags: ['Industry', 'Technology', 'Trends'],
    publishedAt: '2024-03-08',
    readTime: 8,
    featured: false
  },
  {
    id: '3',
    slug: 'eclyp5ed-electronic-evolution',
    title: 'ECLYP5ED: The Evolution of Electronic Music',
    excerpt: 'A deep dive into the artist\'s journey from bedroom producer to main stage.',
    content: '',
    coverImage: '/artist-placeholder.jpg',
    author: 'Alex Rivera',
    artist: 'ECLYP5ED',
    tags: ['Artist Profile', 'Electronic', 'Interview'],
    publishedAt: '2024-03-05',
    readTime: 6,
    featured: false
  }
]

const categories = [
  'All Posts',
  'Artist Interviews',
  'Behind the Scenes',
  'Industry Insights',
  'Album Reviews',
  'Tour Diaries'
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-indigo-900/20 to-base-900 py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Blog & Editorial</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Go behind the scenes with exclusive content, artist interviews, and industry insights.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      {blogPosts.filter(p => p.featured).map(post => (
        <section key={post.id} className="container py-16">
          <h2 className="text-3xl font-bold mb-8">Featured Story</h2>
          <Link href={`/blog/${post.slug}`}>
            <div className="group bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-96 md:h-auto">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime} min read
                    </div>
                  </div>
                  
                  <div className="flex items-center text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-4 transition-all">
                    Read More
                    <ArrowRight className="ml-2 group-hover:ml-0 transition-all" size={20} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ))}

      {/* Categories */}
      <section className="container py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map(category => (
            <button
              key={category}
              className={`px-6 py-2 rounded-full transition ${
                category === 'All Posts' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="container py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(p => !p.featured).map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`}>
              <article className="group bg-white dark:bg-base-800/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition h-full">
                <div className="relative h-48">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {post.readTime} min
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black px-8 py-3 rounded-full transition">
            Load More Articles
          </button>
        </div>
      </section>
    </div>
  )
}