import { AdminLayout } from '@/components/AdminLayout'
import { 
  Users, FileText, Megaphone, MessageSquare,
  TrendingUp, Activity, DollarSign, Eye,
  ArrowUp, ArrowDown, Calendar, Clock
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  // Mock data - in production, these would come from API calls
  const stats = [
    {
      name: 'Total Users',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/users'
    },
    {
      name: 'Active Artists',
      value: '184',
      change: '+8%',
      trend: 'up',
      icon: Activity,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/users?role=BAND'
    },
    {
      name: 'Page Views',
      value: '45.2K',
      change: '+23%',
      trend: 'up',
      icon: Eye,
      color: 'from-green-500 to-green-600',
      href: '/admin/analytics'
    },
    {
      name: 'Revenue',
      value: '$128K',
      change: '-5%',
      trend: 'down',
      icon: DollarSign,
      color: 'from-orange-500 to-orange-600',
      href: '/admin/analytics'
    }
  ]

  const recentActivity = [
    {
      type: 'user',
      action: 'New artist registration',
      details: 'The Midnight Echoes joined MMEG',
      time: '2 hours ago',
      icon: Users
    },
    {
      type: 'announcement',
      action: 'Announcement published',
      details: 'Summer Tour 2024 dates released',
      time: '5 hours ago',
      icon: Megaphone
    },
    {
      type: 'page',
      action: 'Page updated',
      details: 'Privacy policy updated by Admin',
      time: '1 day ago',
      icon: FileText
    },
    {
      type: 'forum',
      action: 'Post moderated',
      details: 'Spam content removed from Artists forum',
      time: '2 days ago',
      icon: MessageSquare
    }
  ]

  const upcomingEvents = [
    {
      title: 'MMEG Showcase LA',
      date: 'March 15, 2024',
      artists: 12,
      status: 'confirmed'
    },
    {
      title: 'Industry Mixer NYC',
      date: 'March 22, 2024',
      artists: 8,
      status: 'pending'
    },
    {
      title: 'Summer Festival Launch',
      date: 'April 1, 2024',
      artists: 25,
      status: 'planning'
    }
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-display tracking-wider text-white">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-white/60">
            Welcome back! Here's an overview of your platform.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Link
              key={stat.name}
              href={stat.href}
              className="group relative rounded-xl bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-6 hover:border-gray-600 dark:hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-white/60">{stat.name}</p>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    {stat.trend === 'up' ? (
                      <ArrowUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDown className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} shadow-glow`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 rounded-xl bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display tracking-wider text-white">
                Recent Activity
              </h2>
              <Link 
                href="/admin/activity"
                className="text-sm text-accent-500 hover:text-accent-400 transition"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-700 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-gray-700 dark:bg-white/10">
                    <activity.icon className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">
                      {activity.action}
                    </p>
                    <p className="text-sm text-white/60 truncate">
                      {activity.details}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="rounded-xl bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display tracking-wider text-white">
                Upcoming Events
              </h2>
              <Link 
                href="/admin/events"
                className="text-sm text-accent-500 hover:text-accent-400 transition"
              >
                Manage
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg border border-gray-700 dark:border-white/10 hover:border-gray-600 dark:hover:border-white/20 transition-colors"
                >
                  <h3 className="font-medium text-white">{event.title}</h3>
                  <div className="mt-2 flex items-center gap-2 text-xs text-white/60">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm text-white/60">
                      {event.artists} artists
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      event.status === 'confirmed' 
                        ? 'bg-green-500/20 text-green-400'
                        : event.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl bg-gray-800 dark:bg-base-800 border border-gray-700 dark:border-white/10 p-6">
          <h2 className="text-xl font-display tracking-wider text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Link
              href="/admin/users/new"
              className="flex items-center gap-3 p-4 rounded-lg bg-gray-700 dark:bg-white/5 hover:bg-gray-600 dark:hover:bg-white/10 transition-colors"
            >
              <Users className="w-5 h-5 text-accent-500" />
              <span className="text-sm text-white">Add User</span>
            </Link>
            <Link
              href="/admin/announcements/new"
              className="flex items-center gap-3 p-4 rounded-lg bg-gray-700 dark:bg-white/5 hover:bg-gray-600 dark:hover:bg-white/10 transition-colors"
            >
              <Megaphone className="w-5 h-5 text-accent-500" />
              <span className="text-sm text-white">New Announcement</span>
            </Link>
            <Link
              href="/admin/pages/new"
              className="flex items-center gap-3 p-4 rounded-lg bg-gray-700 dark:bg-white/5 hover:bg-gray-600 dark:hover:bg-white/10 transition-colors"
            >
              <FileText className="w-5 h-5 text-accent-500" />
              <span className="text-sm text-white">Create Page</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center gap-3 p-4 rounded-lg bg-gray-700 dark:bg-white/5 hover:bg-gray-600 dark:hover:bg-white/10 transition-colors"
            >
              <TrendingUp className="w-5 h-5 text-accent-500" />
              <span className="text-sm text-white">View Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}