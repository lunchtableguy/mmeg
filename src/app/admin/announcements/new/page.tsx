'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/AdminLayout'
import Link from 'next/link'
import { 
  ArrowLeft, Type, FileText, Users, AlertCircle, 
  Calendar, Loader2, Send, Info, CheckCircle 
} from 'lucide-react'

export default function NewAnnouncementPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    targetAudience: 'all' as 'all' | 'artists' | 'fans',
    expiresAt: '',
    sendEmail: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)
      const response = await fetch('/api/announcements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : undefined
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create announcement')
      }

      router.push('/admin/announcements')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create announcement')
    } finally {
      setLoading(false)
    }
  }

  const priorityOptions = [
    {
      value: 'high',
      label: 'High Priority',
      description: 'Critical announcements requiring immediate attention',
      icon: AlertCircle,
      color: 'text-red-400'
    },
    {
      value: 'medium',
      label: 'Medium Priority',
      description: 'Important updates and information',
      icon: Info,
      color: 'text-yellow-400'
    },
    {
      value: 'low',
      label: 'Low Priority',
      description: 'General news and updates',
      icon: CheckCircle,
      color: 'text-green-400'
    }
  ]

  const audienceOptions = [
    {
      value: 'all',
      label: 'Everyone',
      description: 'All users including artists and fans'
    },
    {
      value: 'artists',
      label: 'Artists Only',
      description: 'Only users with artist accounts'
    },
    {
      value: 'fans',
      label: 'Fans Only',
      description: 'Only fan club members'
    }
  ]

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/admin/announcements"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to announcements
          </Link>
          <h1 className="text-3xl font-display tracking-wider text-white">
            Create Announcement
          </h1>
          <p className="mt-2 text-white/60">
            Send important updates to your community
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
                Announcement Title
              </label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors"
                  placeholder="Enter announcement title"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-white mb-2">
                Message
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-white/40" />
                <textarea
                  id="content"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors resize-y"
                  placeholder="Write your announcement message here..."
                />
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Priority Level
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {priorityOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer rounded-lg border p-4 transition-all ${
                      formData.priority === option.value
                        ? 'border-accent-600 bg-accent-600/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={option.value}
                      checked={formData.priority === option.value}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <option.icon className={`w-5 h-5 ${option.color}`} />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {option.label}
                        </p>
                        <p className="text-xs text-white/60 mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Target Audience
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {audienceOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer rounded-lg border p-4 transition-all ${
                      formData.targetAudience === option.value
                        ? 'border-accent-600 bg-accent-600/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <input
                      type="radio"
                      name="audience"
                      value={option.value}
                      checked={formData.targetAudience === option.value}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value as any })}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-white/60" />
                      <div>
                        <p className="text-sm font-medium text-white">
                          {option.label}
                        </p>
                        <p className="text-xs text-white/60 mt-1">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Expiration */}
            <div>
              <label htmlFor="expiresAt" className="block text-sm font-medium text-white mb-2">
                Expiration Date (Optional)
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="datetime-local"
                  id="expiresAt"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors"
                />
              </div>
              <p className="mt-1 text-xs text-white/40">
                Leave empty for announcements that don't expire
              </p>
            </div>

            {/* Email Notification */}
            <div className="p-4 rounded-lg bg-white/5">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.sendEmail}
                  onChange={(e) => setFormData({ ...formData, sendEmail: e.target.checked })}
                  className="w-4 h-4 rounded bg-white/10 border-white/20 text-accent-600 focus:ring-accent-600 focus:ring-offset-0"
                />
                <div>
                  <span className="text-sm font-medium text-white">
                    Send email notifications
                  </span>
                  <p className="text-xs text-white/60 mt-1">
                    Recipients will receive an email about this announcement
                  </p>
                </div>
              </label>
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
                <Send className="w-4 h-4" />
              )}
              Create Announcement
            </button>
            <Link
              href="/admin/announcements"
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