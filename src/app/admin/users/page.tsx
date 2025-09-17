'use client'

import { useState, useEffect } from 'react'
import { AdminLayout } from '@/components/AdminLayout'
import Link from 'next/link'
import { 
  Search, Plus, MoreVertical, Edit2, Trash2, 
  Shield, User, Calendar, ChevronLeft, ChevronRight,
  Check
} from 'lucide-react'
import { useSession } from 'next-auth/react'

interface User {
  id: string
  email: string
  role: string
  createdAt: string
  artist?: {
    bandName: string
  }
}

export default function UsersPage() {
  const { data: session } = useSession()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('ALL')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [currentPage, roleFilter]) // eslint-disable-line react-hooks/exhaustive-deps

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10'
      })
      if (roleFilter !== 'ALL') params.append('role', roleFilter)
      
      const response = await fetch(`/api/users?${params}`)
      const data = await response.json()
      
      if (data.users) {
        setUsers(data.users)
        setTotalPages(data.totalPages)
      }
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        fetchUsers()
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.artist?.bandName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const roleColors = {
    OWNER: 'bg-red-500/20 text-red-400 border-red-500/30',
    ADMIN: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    ACCOUNT_EXECUTIVE: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    BAND: 'bg-green-500/20 text-green-400 border-green-500/30'
  }

  return (
    <AdminLayout requiredRole="OWNER">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display tracking-wider text-white">
              User Management
            </h1>
            <p className="mt-2 text-white/60">
              Manage users, roles, and permissions
            </p>
          </div>
          <Link
            href="/admin/users/new"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add User
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search by email or band name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 text-white placeholder-white/40 focus:border-accent-600 focus:outline-none transition-colors"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 text-white focus:border-accent-600 focus:outline-none transition-colors"
          >
            <option value="ALL">All Roles</option>
            <option value="OWNER">Owner</option>
            <option value="ADMIN">Admin</option>
            <option value="ACCOUNT_EXECUTIVE">Account Executive</option>
            <option value="BAND">Band</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="rounded-xl bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-700 dark:border-white/10">
                <tr className="text-left">
                  <th className="px-6 py-4 text-sm font-medium text-white/60">User</th>
                  <th className="px-6 py-4 text-sm font-medium text-white/60">Role</th>
                  <th className="px-6 py-4 text-sm font-medium text-white/60">Joined</th>
                  <th className="px-6 py-4 text-sm font-medium text-white/60">Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-white/60 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700 dark:divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                      Loading users...
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-700 dark:bg-white/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-white/60" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {user.email}
                            </p>
                            {user.artist && (
                              <p className="text-xs text-white/60">
                                {user.artist.bandName}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${roleColors[user.role as keyof typeof roleColors]}`}>
                          <Shield className="w-3 h-3" />
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Calendar className="w-4 h-4" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                          <Check className="w-3 h-3" />
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setDropdownOpen(dropdownOpen === user.id ? null : user.id)}
                            className="p-2 rounded-lg hover:bg-gray-700 dark:hover:bg-white/10 transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-white/60" />
                          </button>
                          {dropdownOpen === user.id && (
                            <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 shadow-lg z-10">
                              <Link
                                href={`/admin/users/${user.id}/edit`}
                                className="flex items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-700 dark:hover:bg-white/10 transition-colors"
                              >
                                <Edit2 className="w-4 h-4" />
                                Edit User
                              </Link>
                              {user.role !== 'OWNER' && session?.user?.role === 'OWNER' && (
                                <button
                                  onClick={() => handleDelete(user.id)}
                                  className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700 dark:hover:bg-white/10 transition-colors w-full text-left"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete User
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg bg-gray-700 dark:bg-white/5 hover:bg-gray-600 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg bg-gray-700 dark:bg-white/5 hover:bg-gray-600 dark:hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}