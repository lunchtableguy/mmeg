import { Metadata } from 'next'
import { SearchResults } from '@/components/SearchResults'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search MMEG artists, music, events, and more'
}

export default function SearchPage() {
  return <SearchResults />
}