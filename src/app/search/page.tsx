import { Metadata } from 'next'
import { Suspense } from 'react'
import { SearchResults } from '@/components/SearchResults'
import { Loader2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search MMEG artists, music, events, and more'
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>}>
      <SearchResults />
    </Suspense>
  )
}