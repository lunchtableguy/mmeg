'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/AdminLayout'
import Link from 'next/link'
import { 
  Search, Plus, FileText, Edit2, ExternalLink, 
  Lock, Sparkles, Users, Building2, Gavel, Settings
} from 'lucide-react'
import { sitePages, getPageCategories, type PageType } from '@/lib/site-pages'

const categoryIcons = {
  'Main': FileText,
  'Company': Building2,
  'Artists': Users,
  'Artist Portal': Lock,
  'Content': Sparkles,
  'Fan Club': Users,
  'Legal': Gavel,
  'Utility': Settings
}

const typeColors = {
  'static': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'dynamic': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'auth': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'legal': 'bg-red-500/20 text-red-400 border-red-500/30',
  'feature': 'bg-green-500/20 text-green-400 border-green-500/30'
}

const statusColors = {
  'published': 'bg-green-500/20 text-green-400 border-green-500/30',
  'draft': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'system': 'bg-gray-500/20 text-gray-400 border-gray-500/30'
}

export default function PagesManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<PageType | 'all'>('all')
  const categories = getPageCategories()

  const filteredPages = sitePages.filter(page => {
    const matchesSearch = 
      page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory
    const matchesType = selectedType === 'all' || page.type === selectedType
    
    return matchesSearch && matchesCategory && matchesType
  })

  const groupedPages = filteredPages.reduce((acc, page) => {
    if (!acc[page.category]) acc[page.category] = []
    acc[page.category].push(page)
    return acc
  }, {} as Record<string, typeof filteredPages>)

  return (
    <AdminLayout requiredRole="ADMIN">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display tracking-wider text-white">
              Content Pages
            </h1>
            <p className="mt-2 text-white/60">
              Manage all website pages and content
            </p>
          </div>
          <Link
            href="/admin/pages/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Dynamic Page
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search pages by title, path or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 text-white focus:border-accent-600 focus:outline-none transition-colors"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 text-white focus:border-accent-600 focus:outline-none transition-colors"
          >
            <option value="all">All Types</option>
            <option value="static">Static Pages</option>
            <option value="dynamic">Dynamic Pages</option>
            <option value="auth">Auth Pages</option>
            <option value="legal">Legal Pages</option>
            <option value="feature">Feature Pages</option>
          </select>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-4">
            <p className="text-3xl font-bold text-white">{sitePages.length}</p>
            <p className="text-sm text-white/60">Total Pages</p>
          </div>
          <div className="rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-4">
            <p className="text-3xl font-bold text-white">{sitePages.filter(p => p.editable).length}</p>
            <p className="text-sm text-white/60">Editable Pages</p>
          </div>
          <div className="rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-4">
            <p className="text-3xl font-bold text-white">{sitePages.filter(p => p.type === 'static').length}</p>
            <p className="text-sm text-white/60">Static Pages</p>
          </div>
          <div className="rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-4">
            <p className="text-3xl font-bold text-white">{categories.length}</p>
            <p className="text-sm text-white/60">Categories</p>
          </div>
        </div>

        {/* Pages List by Category */}
        <div className="space-y-6">
          {Object.entries(groupedPages).map(([category, pages]) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons] || FileText
            
            return (
              <div key={category} className="rounded-xl bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 dark:border-white/10 flex items-center gap-3">
                  <Icon className="w-5 h-5 text-white/60" />
                  <h2 className="text-lg font-display tracking-wider text-white">
                    {category}
                  </h2>
                  <span className="text-sm text-white/40">({pages.length})</span>
                </div>
                
                <div className="divide-y divide-gray-700 dark:divide-white/10">
                  {pages.map(page => (
                    <div key={page.id} className="p-6 hover:bg-gray-700 dark:hover:bg-white/5 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-medium text-white">
                              {page.title}
                            </h3>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${typeColors[page.type]}`}>
                              {page.type}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${statusColors[page.status]}`}>
                              {page.status}
                            </span>
                          </div>
                          
                          <p className="text-sm text-white/60 mb-3">
                            {page.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-white/40">
                            <span className="font-mono">{page.path}</span>
                            {page.filePath && (
                              <span className="text-white/30">• {page.filePath}</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          <Link
                            href={page.path}
                            target="_blank"
                            className="p-2 rounded-lg hover:bg-gray-600 dark:hover:bg-white/10 transition-colors"
                            title="View page"
                          >
                            <ExternalLink className="w-4 h-4 text-white/60" />
                          </Link>
                          {page.editable && (
                            <Link
                              href={`/admin/pages/${page.id}/edit`}
                              className="p-2 rounded-lg hover:bg-gray-600 dark:hover:bg-white/10 transition-colors"
                              title="Edit page"
                            >
                              <Edit2 className="w-4 h-4 text-white/60" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/40">No pages found matching your filters</p>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}