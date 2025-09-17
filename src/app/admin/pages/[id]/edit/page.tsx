'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { AdminLayout } from '@/components/AdminLayout'
import Link from 'next/link'
import { ArrowLeft, Loader2, Save, Eye, Code, Type } from 'lucide-react'
import { sitePages } from '@/lib/site-pages'

export default function EditStaticPage() {
  const router = useRouter()
  const params = useParams()
  const pageId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [editMode, setEditMode] = useState<'visual' | 'code'>('visual')
  
  const page = sitePages.find(p => p.id === pageId)
  
  // For static pages, we'll store editable content sections
  const [content, setContent] = useState({
    hero: {
      title: '',
      subtitle: '',
      description: ''
    },
    sections: [] as Array<{
      id: string
      type: 'text' | 'image' | 'cta' | 'features'
      title?: string
      content?: string
      imageUrl?: string
      ctaText?: string
      ctaLink?: string
      features?: Array<{ title: string; description: string }>
    }>,
    metadata: {
      title: '',
      description: '',
      keywords: ''
    }
  })

  useEffect(() => {
    // In a real implementation, we would fetch the current page content
    // For now, we'll simulate loading
    setTimeout(() => {
      setLoading(false)
      // Set some default content based on page type
      if (page) {
        setContent({
          hero: {
            title: page.title,
            subtitle: `Welcome to ${page.title}`,
            description: page.description
          },
          sections: [
            {
              id: '1',
              type: 'text',
              title: 'About This Page',
              content: 'This is the main content section. You can edit this text to customize the page.'
            }
          ],
          metadata: {
            title: `${page.title} | MMEG`,
            description: page.description,
            keywords: ''
          }
        })
      }
    }, 500)
  }, [page])

  if (!page) {
    return (
      <AdminLayout requiredRole="ADMIN">
        <div className="text-center py-12">
          <p className="text-white/60">Page not found</p>
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-2 mt-4 text-accent-500 hover:text-accent-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to pages
          </Link>
        </div>
      </AdminLayout>
    )
  }

  if (!page.editable) {
    return (
      <AdminLayout requiredRole="ADMIN">
        <div className="text-center py-12">
          <p className="text-white/60">This page is not editable through the admin panel</p>
          <Link
            href="/admin/pages"
            className="inline-flex items-center gap-2 mt-4 text-accent-500 hover:text-accent-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to pages
          </Link>
        </div>
      </AdminLayout>
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    
    try {
      // In a real implementation, we would save to a CMS or database
      // For now, we'll simulate saving
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message
      router.push('/admin/pages?saved=true')
    } catch (_err) {
      setError('Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const addSection = (type: 'text' | 'image' | 'cta' | 'features') => {
    const newSection = {
      id: Date.now().toString(),
      type,
      title: '',
      content: ''
    }
    setContent({
      ...content,
      sections: [...content.sections, newSection]
    })
  }

  const updateSection = (id: string, updates: any) => {
    setContent({
      ...content,
      sections: content.sections.map(section => 
        section.id === id ? { ...section, ...updates } : section
      )
    })
  }

  const removeSection = (id: string) => {
    setContent({
      ...content,
      sections: content.sections.filter(section => section.id !== id)
    })
  }

  if (loading) {
    return (
      <AdminLayout requiredRole="ADMIN">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-white/60" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout requiredRole="ADMIN">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Link
              href="/admin/pages"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to pages
            </Link>
            <h1 className="text-3xl font-display tracking-wider text-white">
              Edit: {page.title}
            </h1>
            <p className="mt-2 text-white/60">
              {page.path} • {page.type} page
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={page.path}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/10 hover:bg-gray-600 dark:hover:bg-white/20 text-white transition-colors"
            >
              <Eye className="w-4 h-4" />
              View Page
            </Link>
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400">
            {error}
          </div>
        )}

        {/* Edit Mode Toggle */}
        <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 inline-flex">
          <button
            onClick={() => setEditMode('visual')}
            className={`px-4 py-2 rounded-md transition-colors ${
              editMode === 'visual'
                ? 'bg-accent-600 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Type className="w-4 h-4" />
          </button>
          <button
            onClick={() => setEditMode('code')}
            className={`px-4 py-2 rounded-md transition-colors ${
              editMode === 'code'
                ? 'bg-accent-600 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
          </button>
        </div>

        {/* Editor */}
        <div className="space-y-6">
          {/* Hero Section */}
          <div className="rounded-xl bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-6">
            <h3 className="text-lg font-display tracking-wider text-white mb-4">
              Hero Section
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={content.hero.title}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, title: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={content.hero.subtitle}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, subtitle: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Description
                </label>
                <textarea
                  value={content.hero.description}
                  onChange={(e) => setContent({
                    ...content,
                    hero: { ...content.hero, description: e.target.value }
                  })}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none resize-y"
                />
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display tracking-wider text-white">
                Content Sections
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => addSection('text')}
                  className="px-3 py-1.5 rounded-lg bg-gray-700 dark:bg-white/10 hover:bg-gray-600 dark:hover:bg-white/20 text-white text-sm transition-colors"
                >
                  + Text
                </button>
                <button
                  onClick={() => addSection('image')}
                  className="px-3 py-1.5 rounded-lg bg-gray-700 dark:bg-white/10 hover:bg-gray-600 dark:hover:bg-white/20 text-white text-sm transition-colors"
                >
                  + Image
                </button>
                <button
                  onClick={() => addSection('cta')}
                  className="px-3 py-1.5 rounded-lg bg-gray-700 dark:bg-white/10 hover:bg-gray-600 dark:hover:bg-white/20 text-white text-sm transition-colors"
                >
                  + CTA
                </button>
              </div>
            </div>

            {content.sections.map((section) => (
              <div
                key={section.id}
                className="rounded-xl bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-medium text-white/60 uppercase tracking-wider">
                    {section.type} Section
                  </h4>
                  <button
                    onClick={() => removeSection(section.id)}
                    className="text-red-400 hover:text-red-300 text-sm"
                  >
                    Remove
                  </button>
                </div>

                {section.type === 'text' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Section title"
                      value={section.title || ''}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none"
                    />
                    <textarea
                      placeholder="Section content"
                      value={section.content || ''}
                      onChange={(e) => updateSection(section.id, { content: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none resize-y"
                    />
                  </div>
                )}

                {section.type === 'image' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={section.imageUrl || ''}
                      onChange={(e) => updateSection(section.id, { imageUrl: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Alt text"
                      value={section.title || ''}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none"
                    />
                  </div>
                )}

                {section.type === 'cta' && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="CTA Title"
                      value={section.title || ''}
                      onChange={(e) => updateSection(section.id, { title: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Button text"
                      value={section.ctaText || ''}
                      onChange={(e) => updateSection(section.id, { ctaText: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Button link"
                      value={section.ctaLink || ''}
                      onChange={(e) => updateSection(section.id, { ctaLink: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* SEO Settings */}
          <div className="rounded-xl bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-6">
            <h3 className="text-lg font-display tracking-wider text-white mb-4">
              SEO Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Page Title
                </label>
                <input
                  type="text"
                  value={content.metadata.title}
                  onChange={(e) => setContent({
                    ...content,
                    metadata: { ...content.metadata, title: e.target.value }
                  })}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Meta Description
                </label>
                <textarea
                  value={content.metadata.description}
                  onChange={(e) => setContent({
                    ...content,
                    metadata: { ...content.metadata, description: e.target.value }
                  })}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none resize-y"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Keywords
                </label>
                <input
                  type="text"
                  value={content.metadata.keywords}
                  onChange={(e) => setContent({
                    ...content,
                    metadata: { ...content.metadata, keywords: e.target.value }
                  })}
                  placeholder="Comma separated keywords"
                  className="w-full px-4 py-2 rounded-lg bg-gray-700 dark:bg-white/5 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}