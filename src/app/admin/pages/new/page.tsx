'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/AdminLayout'
import Link from 'next/link'
import { ArrowLeft, Type, Link as LinkIcon, Eye, Loader2, Save } from 'lucide-react'

export default function NewPageEditor() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    published: false
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create page')
      }

      router.push('/admin/pages')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create page')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout requiredRole="OWNER">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to pages
          </Link>
          <h1 className="text-3xl font-display tracking-wider text-white">
            Create New Page
          </h1>
          <p className="mt-2 text-white/60">
            Create a new content page for your website
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="rounded-xl bg-base-800/50 backdrop-blur border border-white/10 p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white mb-2">
                Page Title
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleTitleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors"
                  placeholder="Enter page title"
                />
              </div>
            </div>

            {/* Slug */}
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-white mb-2">
                URL Slug
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors font-mono text-sm"
                  placeholder="page-url-slug"
                />
              </div>
              <p className="mt-1 text-xs text-white/40">
                This page will be accessible at: /{formData.slug || 'page-url-slug'}
              </p>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="content" className="block text-sm font-medium text-white">
                  Page Content
                </label>
                <button
                  type="button"
                  onClick={() => setPreview(!preview)}
                  className="inline-flex items-center gap-2 text-sm text-accent-500 hover:text-accent-400"
                >
                  <Eye className="w-4 h-4" />
                  {preview ? 'Edit' : 'Preview'}
                </button>
              </div>
              {preview ? (
                <div className="rounded-lg bg-white/5 border border-white/10 p-6 min-h-[400px]">
                  <div 
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ 
                      __html: formData.content
                        .replace(/\n\n/g, '</p><p>')
                        .replace(/^/, '<p>')
                        .replace(/$/, '</p>')
                        .replace(/<p><\/p>/g, '')
                    }}
                  />
                </div>
              ) : (
                <textarea
                  id="content"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={15}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors resize-y"
                  placeholder="Enter your page content here. Use markdown for formatting."
                />
              )}
              <p className="mt-1 text-xs text-white/40">
                Supports basic HTML and markdown formatting
              </p>
            </div>

            {/* Publishing Options */}
            <div className="p-4 rounded-lg bg-white/5 space-y-4">
              <h3 className="text-sm font-medium text-white">Publishing Options</h3>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-4 h-4 rounded bg-white/10 border-white/20 text-accent-600 focus:ring-accent-600 focus:ring-offset-0"
                />
                <span className="text-sm text-white">
                  Publish immediately
                </span>
              </label>
              {!formData.published && (
                <p className="text-xs text-white/40 ml-7">
                  This page will be saved as a draft and won't be visible on the website
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {formData.published ? 'Create & Publish' : 'Save Draft'}
            </button>
            <Link
              href="/admin/pages"
              className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminLayout>
  )
}