'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, Users, FileText, Megaphone, Shield, 
  FileArchive, BarChart3, Settings, ChevronLeft, Loader2,
  LogOut, Menu, X
} from 'lucide-react'
import { useState } from 'react'
import { signOut } from 'next-auth/react'

interface AdminLayoutProps {
  children: React.ReactNode
  requiredRole?: 'OWNER' | 'ADMIN' | 'ACCOUNT_EXECUTIVE'
}

export function AdminLayout({ children, requiredRole = 'ADMIN' }: AdminLayoutProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/artists/sign-in?redirect=' + pathname)
    } else if (status === 'authenticated' && session?.user?.role) {
      const roleHierarchy: Record<string, number> = {
        OWNER: 4,
        ADMIN: 3,
        ACCOUNT_EXECUTIVE: 2,
        BAND: 1
      }
      
      if (roleHierarchy[session.user.role] < roleHierarchy[requiredRole]) {
        router.push('/')
      }
    }
  }, [status, session, router, pathname, requiredRole])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!session?.user || !['OWNER', 'ADMIN', 'ACCOUNT_EXECUTIVE'].includes(session.user.role || '')) {
    return null
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      roles: ['OWNER', 'ADMIN', 'ACCOUNT_EXECUTIVE']
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: Users,
      roles: ['OWNER']
    },
    {
      name: 'Content Pages',
      href: '/admin/pages',
      icon: FileText,
      roles: ['OWNER']
    },
    {
      name: 'Announcements',
      href: '/admin/announcements',
      icon: Megaphone,
      roles: ['OWNER', 'ADMIN', 'ACCOUNT_EXECUTIVE']
    },
    {
      name: 'Forum Moderation',
      href: '/admin/forum',
      icon: Shield,
      roles: ['OWNER', 'ADMIN']
    },
    {
      name: 'Documents',
      href: '/admin/documents',
      icon: FileArchive,
      roles: ['OWNER', 'ADMIN', 'ACCOUNT_EXECUTIVE']
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      roles: ['OWNER', 'ADMIN', 'ACCOUNT_EXECUTIVE']
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      roles: ['OWNER']
    }
  ]

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(session.user.role as string)
  )

  return (
    <div className="fixed inset-0 bg-gray-900 dark:bg-base-900 overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 text-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 dark:bg-base-800 border-r border-gray-700 dark:border-white/10 transform transition-transform lg:transform-none ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-700 dark:border-white/10">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-accent-600 to-accent-700 shadow-glow flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-display text-xl tracking-wider uppercase text-white">MMEG</span>
                <p className="text-xs text-gray-400 dark:text-white/60 uppercase tracking-wide">{session.user.role}</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-accent-600/20 text-accent-500 shadow-glow' 
                      : 'text-gray-300 dark:text-white/70 hover:text-white hover:bg-gray-700 dark:hover:bg-white/5'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-700 dark:border-white/10">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-700 dark:bg-white/5">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {session.user.email}
                </p>
                <p className="text-xs text-gray-400 dark:text-white/60">{session.user.role}</p>
              </div>
              <button
                onClick={() => signOut()}
                className="ml-3 p-2 rounded-lg hover:bg-gray-600 dark:hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-4 h-4 text-gray-300 dark:text-white/70" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64 h-full flex flex-col">
        {/* Top bar */}
        <header className="bg-gray-800 dark:bg-base-800 border-b border-gray-700 dark:border-white/10">
          <div className="px-6 py-4">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-sm text-gray-300 dark:text-white/60 hover:text-white transition"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to site
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-900 dark:bg-base-900">
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}