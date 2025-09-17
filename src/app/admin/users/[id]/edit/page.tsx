'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { AdminLayout } from '@/components/AdminLayout'
import Link from 'next/link'
import { ArrowLeft, User, Mail, Shield, Loader2, Save } from 'lucide-react'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState<any>(null)
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    bandName: ''
  })

  useEffect(() => {
    fetchUser()
  }, [userId]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setUser(data)
      setFormData({
        email: data.email,
        role: data.role,
        bandName: data.artist?.bandName || ''
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load user')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      setSaving(true)
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          role: formData.role,
          bandName: formData.role === 'BAND' ? formData.bandName : undefined
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update user')
      }

      router.push('/admin/users')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminLayout requiredRole="OWNER">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-white/60" />
        </div>
      </AdminLayout>
    )
  }

  if (!user) {
    return (
      <AdminLayout requiredRole="OWNER">
        <div className="text-center">
          <p className="text-white/60">User not found</p>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 mt-4 text-accent-500 hover:text-accent-400"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to users
          </Link>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout requiredRole="OWNER">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <Link
            href="/admin/users"
            className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to users
          </Link>
          <h1 className="text-3xl font-display tracking-wider text-white">
            Edit User
          </h1>
          <p className="mt-2 text-white/60">
            Update user information and role
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
            {/* User Info */}
            <div className="p-4 rounded-lg bg-white/5">
              <p className="text-sm text-white/60 mb-1">User ID</p>
              <p className="font-mono text-sm text-white">{user.id}</p>
              <p className="text-sm text-white/60 mt-3 mb-1">Joined</p>
              <p className="text-sm text-white">{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-white mb-2">
                User Role
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <select
                  id="role"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-accent-600 focus:outline-none transition-colors appearance-none"
                >
                  <option value="BAND" className="bg-base-900">Band/Artist</option>
                  <option value="ACCOUNT_EXECUTIVE" className="bg-base-900">Account Executive</option>
                  <option value="ADMIN" className="bg-base-900">Admin</option>
                  <option value="OWNER" className="bg-base-900">Owner</option>
                </select>
              </div>
              <p className="mt-1 text-xs text-white/40">
                {formData.role === 'OWNER' && 'Full system access and control'}
                {formData.role === 'ADMIN' && 'Can manage content and moderate forums'}
                {formData.role === 'ACCOUNT_EXECUTIVE' && 'Can manage artists and view analytics'}
                {formData.role === 'BAND' && 'Basic artist access to their own profile'}
              </p>
            </div>

            {/* Band Name (conditional) */}
            {formData.role === 'BAND' && (
              <div>
                <label htmlFor="bandName" className="block text-sm font-medium text-white mb-2">
                  Band/Artist Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <input
                    type="text"
                    id="bandName"
                    required={formData.role === 'BAND'}
                    value={formData.bandName}
                    onChange={(e) => setFormData({ ...formData, bandName: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors"
                    placeholder="Enter band or artist name"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
            <Link
              href="/admin/users"
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