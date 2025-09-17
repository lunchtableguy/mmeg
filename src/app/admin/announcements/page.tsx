'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/AdminLayout'
import Link from 'next/link'
import { 
  Search, Plus, Megaphone, Edit2, Trash2, Users, Clock,
  Calendar, AlertCircle, Info, CheckCircle, MoreVertical
} from 'lucide-react'

interface Announcement {
  id: string
  title: string
  content: string
  priority: 'high' | 'medium' | 'low'
  targetAudience: 'all' | 'artists' | 'fans'
  expiresAt?: string
  createdAt: string
  recipients: any[]
  _count?: {
    recipients: number
    readReceipts: number
  }
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/announcements')
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setAnnouncements(data)
      }
    } catch (error) {
      console.error('Failed to fetch announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (announcementId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return
    
    try {
      const response = await fetch(`/api/announcements/${announcementId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchAnnouncements()
      }
    } catch (error) {
      console.error('Failed to delete announcement:', error)
    }
  }

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterPriority === 'all' || announcement.priority === filterPriority
    return matchesSearch && matchesFilter
  })

  const priorityConfig = {
    high: {
      icon: AlertCircle,
      color: 'text-red-400 bg-red-500/20 border-red-500/30',
      label: 'High Priority'
    },
    medium: {
      icon: Info,
      color: 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      label: 'Medium Priority'
    },
    low: {
      icon: CheckCircle,
      color: 'text-green-400 bg-green-500/20 border-green-500/30',
      label: 'Low Priority'
    }
  }

  const audienceIcons = {
    all: Users,
    artists: Megaphone,
    fans: Users
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display tracking-wider text-white">
              Announcements
            </h1>
            <p className="mt-2 text-white/60">
              Manage system-wide announcements and notifications
            </p>
          </div>
          <Link
            href="/admin/announcements/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Announcement
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-base-800/50 backdrop-blur border border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors"
            />
          </div>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-base-800/50 backdrop-blur border border-white/10 text-white focus:border-accent-600 focus:outline-none transition-colors"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-white/40">
              Loading announcements...
            </div>
          ) : filteredAnnouncements.length === 0 ? (
            <div className="text-center py-12">
              <Megaphone className="w-12 h-12 text-white/20 mx-auto mb-4" />
              <p className="text-white/40">No announcements found</p>
              <Link
                href="/admin/announcements/new"
                className="inline-flex items-center gap-2 mt-4 text-accent-500 hover:text-accent-400"
              >
                <Plus className="w-4 h-4" />
                Create your first announcement
              </Link>
            </div>
          ) : (
            filteredAnnouncements.map((announcement) => {
              const config = priorityConfig[announcement.priority]
              const AudienceIcon = audienceIcons[announcement.targetAudience]
              const isExpired = announcement.expiresAt && new Date(announcement.expiresAt) < new Date()
              
              return (
                <div
                  key={announcement.id}
                  className={`rounded-xl bg-base-800/50 backdrop-blur border border-white/10 p-6 ${
                    isExpired ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-medium text-white">
                          {announcement.title}
                        </h3>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
                          <config.icon className="w-3 h-3" />
                          {config.label}
                        </span>
                        {isExpired && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white/40 border border-white/20">
                            Expired
                          </span>
                        )}
                      </div>
                      <p className="text-white/60 text-sm line-clamp-2">
                        {announcement.content}
                      </p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setDropdownOpen(dropdownOpen === announcement.id ? null : announcement.id)}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4 text-white/60" />
                      </button>
                      {dropdownOpen === announcement.id && (
                        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-base-800 border border-white/10 shadow-lg z-10">
                          <Link
                            href={`/admin/announcements/${announcement.id}/edit`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                            Edit Announcement
                          </Link>
                          <button
                            onClick={() => handleDelete(announcement.id, announcement.title)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors w-full text-left"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-xs text-white/40">
                    <div className="flex items-center gap-2">
                      <AudienceIcon className="w-4 h-4" />
                      <span>Target: {announcement.targetAudience}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{announcement._count?.recipients || 0} recipients</span>
                    </div>
                    {announcement._count?.readReceipts !== undefined && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>{announcement._count.readReceipts} read</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                    </div>
                    {announcement.expiresAt && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>Expires: {new Date(announcement.expiresAt).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>
    </AdminLayout>
  )
}