import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard | MMEG',
    template: '%s | Admin | MMEG'
  },
  description: 'MMEG Admin Dashboard',
  robots: {
    index: false,
    follow: false,
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}