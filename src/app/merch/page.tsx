import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Star, Filter } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Merch Store',
  description: 'Official MMEG artist merchandise, limited editions, and exclusive items'
}

// Mock data - replace with API call
const merchItems = [
  {
    id: '1',
    name: 'Jane Lee Tour 2024 Tee',
    artist: 'Jane Lee',
    price: 35.00,
    images: ['/artist-placeholder.jpg'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: 'Apparel',
    featured: true,
    limitedEdition: true
  },
  {
    id: '2',
    name: 'ECLYP5ED Holographic Hoodie',
    artist: 'ECLYP5ED',
    price: 65.00,
    images: ['/artist-placeholder.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Apparel',
    featured: true,
    limitedEdition: false
  },
  {
    id: '3',
    name: 'MMEG Logo Dad Hat',
    artist: null,
    price: 28.00,
    images: ['/artist-placeholder.jpg'],
    category: 'Accessories',
    featured: false,
    limitedEdition: false
  },
  {
    id: '4',
    name: 'Into the Light Vinyl LP',
    artist: 'Jane Lee',
    price: 45.00,
    images: ['/artist-placeholder.jpg'],
    category: 'Music',
    featured: false,
    limitedEdition: true
  },
  {
    id: '5',
    name: 'Artist Bundle - Complete Collection',
    artist: 'Jane Lee',
    price: 120.00,
    originalPrice: 150.00,
    images: ['/artist-placeholder.jpg'],
    category: 'Bundles',
    featured: true,
    limitedEdition: true
  }
]

const categories = ['All', 'Apparel', 'Accessories', 'Music', 'Bundles', 'Limited Edition']

export default function MerchPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-900/20 to-base-900 py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Merch Store</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Official artist merchandise, limited editions, and exclusive bundles.
          </p>
        </div>
      </section>

      {/* Featured Items */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8">Featured Items</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {merchItems.filter(item => item.featured).slice(0, 3).map(item => (
            <div key={item.id} className="group relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                {item.limitedEdition && (
                  <div className="absolute top-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm">
                    Limited Edition
                  </div>
                )}
                {item.originalPrice && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                    Sale
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
                    Quick View
                  </button>
                </div>
              </div>
              <div>
                {item.artist && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{item.artist}</p>
                )}
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">${item.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filters and Categories */}
      <section className="container py-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition ${
                  category === 'All' 
                    ? 'bg-orange-600 text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <Filter size={16} />
            Filters
          </button>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {merchItems.map(item => (
            <div key={item.id} className="group">
              <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                {item.limitedEdition && (
                  <div className="absolute top-2 left-2 bg-orange-600 text-white text-xs px-2 py-1 rounded">
                    Limited
                  </div>
                )}
                <button className="absolute bottom-2 right-2 bg-black/80 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition">
                  <ShoppingBag size={20} />
                </button>
              </div>
              <div>
                {item.artist && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.artist}</p>
                )}
                <h3 className="font-semibold mb-1">{item.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black px-8 py-3 rounded-full transition">
            Load More Products
          </button>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition">
          <div className="relative">
            <ShoppingBag size={24} />
            <span className="absolute -top-2 -right-2 bg-white text-orange-600 text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </div>
        </button>
      </div>
    </div>
  )
}