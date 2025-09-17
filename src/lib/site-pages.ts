export type PageType = 'static' | 'dynamic' | 'auth' | 'legal' | 'feature'

export interface SitePage {
  id: string
  title: string
  path: string
  description: string
  type: PageType
  category: string
  editable: boolean
  filePath?: string
  lastModified?: Date
  status: 'published' | 'draft' | 'system'
}

export const sitePages: SitePage[] = [
  // Main Pages
  {
    id: 'home',
    title: 'Home',
    path: '/',
    description: 'Main landing page showcasing MMEG and featured artists',
    type: 'static',
    category: 'Main',
    editable: true,
    filePath: 'src/app/page.tsx',
    status: 'published'
  },
  {
    id: 'about',
    title: 'About',
    path: '/about',
    description: 'Information about MMEG, our mission and values',
    type: 'static',
    category: 'Company',
    editable: true,
    filePath: 'src/app/about/page.tsx',
    status: 'published'
  },
  {
    id: 'management-team',
    title: 'Management Team',
    path: '/about/management-team',
    description: 'Meet the MMEG leadership team',
    type: 'static',
    category: 'Company',
    editable: true,
    filePath: 'src/app/about/management-team/page.tsx',
    status: 'published'
  },
  
  // Artists Section
  {
    id: 'artists',
    title: 'Artists',
    path: '/artists',
    description: 'Browse all MMEG artists',
    type: 'static',
    category: 'Artists',
    editable: true,
    filePath: 'src/app/artists/page.tsx',
    status: 'published'
  },
  {
    id: 'featured-artists',
    title: 'Featured Artists',
    path: '/artists/featured',
    description: 'Highlighted artists and rising stars',
    type: 'static',
    category: 'Artists',
    editable: true,
    filePath: 'src/app/artists/featured/page.tsx',
    status: 'published'
  },
  {
    id: 'artist-profile',
    title: 'Artist Profile (Dynamic)',
    path: '/artists/[slug]',
    description: 'Individual artist profile pages',
    type: 'dynamic',
    category: 'Artists',
    editable: false,
    filePath: 'src/app/artists/[slug]/page.tsx',
    status: 'system'
  },
  
  // Artist Portal
  {
    id: 'artist-sign-in',
    title: 'Artist Sign In',
    path: '/artists/sign-in',
    description: 'Login page for artists',
    type: 'auth',
    category: 'Artist Portal',
    editable: true,
    filePath: 'src/app/artists/sign-in/page.tsx',
    status: 'system'
  },
  {
    id: 'artist-dashboard',
    title: 'Artist Dashboard',
    path: '/artists/dashboard',
    description: 'Artist portal dashboard',
    type: 'auth',
    category: 'Artist Portal',
    editable: false,
    filePath: 'src/app/artists/dashboard/page.tsx',
    status: 'system'
  },
  {
    id: 'artist-analytics',
    title: 'Artist Analytics',
    path: '/artists/analytics',
    description: 'Performance metrics for artists',
    type: 'auth',
    category: 'Artist Portal',
    editable: false,
    filePath: 'src/app/artists/analytics/page.tsx',
    status: 'system'
  },
  
  // Content Pages
  {
    id: 'music',
    title: 'Music',
    path: '/music',
    description: 'Browse and discover MMEG music catalog',
    type: 'feature',
    category: 'Content',
    editable: true,
    filePath: 'src/app/music/page.tsx',
    status: 'published'
  },
  {
    id: 'events',
    title: 'Events',
    path: '/events',
    description: 'Upcoming shows and events',
    type: 'feature',
    category: 'Content',
    editable: true,
    filePath: 'src/app/events/page.tsx',
    status: 'published'
  },
  {
    id: 'merch',
    title: 'Merchandise',
    path: '/merch',
    description: 'Official MMEG and artist merchandise',
    type: 'feature',
    category: 'Content',
    editable: true,
    filePath: 'src/app/merch/page.tsx',
    status: 'published'
  },
  {
    id: 'blog',
    title: 'Blog',
    path: '/blog',
    description: 'Latest news and articles',
    type: 'feature',
    category: 'Content',
    editable: true,
    filePath: 'src/app/blog/page.tsx',
    status: 'published'
  },
  {
    id: 'news',
    title: 'News',
    path: '/news',
    description: 'MMEG news and announcements',
    type: 'feature',
    category: 'Content',
    editable: true,
    filePath: 'src/app/news/page.tsx',
    status: 'published'
  },
  {
    id: 'news-article',
    title: 'News Article (Dynamic)',
    path: '/news/[slug]',
    description: 'Individual news article pages',
    type: 'dynamic',
    category: 'Content',
    editable: false,
    filePath: 'src/app/news/[slug]/page.tsx',
    status: 'system'
  },
  
  // Fan Club
  {
    id: 'fan-club',
    title: 'Fan Club',
    path: '/fan-club',
    description: 'MMEG fan club information',
    type: 'feature',
    category: 'Fan Club',
    editable: true,
    filePath: 'src/app/fan-club/page.tsx',
    status: 'published'
  },
  {
    id: 'fan-club-join',
    title: 'Join Fan Club',
    path: '/fan-club/join',
    description: 'Fan club membership registration',
    type: 'feature',
    category: 'Fan Club',
    editable: true,
    filePath: 'src/app/fan-club/join/page.tsx',
    status: 'published'
  },
  {
    id: 'fan-club-dashboard',
    title: 'Fan Club Dashboard',
    path: '/fan-club/dashboard',
    description: 'Member-only fan club area',
    type: 'auth',
    category: 'Fan Club',
    editable: false,
    filePath: 'src/app/fan-club/dashboard/page.tsx',
    status: 'system'
  },
  
  // Company Pages
  {
    id: 'partners',
    title: 'Partners',
    path: '/partners',
    description: 'Our industry partners and collaborators',
    type: 'static',
    category: 'Company',
    editable: true,
    filePath: 'src/app/partners/page.tsx',
    status: 'published'
  },
  {
    id: 'press',
    title: 'Press',
    path: '/press',
    description: 'Press releases and media resources',
    type: 'static',
    category: 'Company',
    editable: true,
    filePath: 'src/app/press/page.tsx',
    status: 'published'
  },
  {
    id: 'careers',
    title: 'Careers',
    path: '/careers',
    description: 'Join the MMEG team',
    type: 'static',
    category: 'Company',
    editable: true,
    filePath: 'src/app/careers/page.tsx',
    status: 'published'
  },
  {
    id: 'contact',
    title: 'Contact',
    path: '/contact',
    description: 'Get in touch with MMEG',
    type: 'static',
    category: 'Company',
    editable: true,
    filePath: 'src/app/contact/page.tsx',
    status: 'published'
  },
  {
    id: 'sync',
    title: 'Sync Licensing',
    path: '/sync',
    description: 'Music licensing for media',
    type: 'feature',
    category: 'Company',
    editable: true,
    filePath: 'src/app/sync/page.tsx',
    status: 'published'
  },
  
  // Legal & Settings
  {
    id: 'privacy',
    title: 'Privacy Policy',
    path: '/privacy',
    description: 'Privacy policy and data handling',
    type: 'legal',
    category: 'Legal',
    editable: true,
    filePath: 'src/app/privacy/page.tsx',
    status: 'published'
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    path: '/terms',
    description: 'Terms and conditions of use',
    type: 'legal',
    category: 'Legal',
    editable: true,
    filePath: 'src/app/terms/page.tsx',
    status: 'published'
  },
  {
    id: 'cookie-settings',
    title: 'Cookie Settings',
    path: '/cookie-settings',
    description: 'Manage cookie preferences',
    type: 'legal',
    category: 'Legal',
    editable: true,
    filePath: 'src/app/cookie-settings/page.tsx',
    status: 'published'
  },
  {
    id: 'do-not-sell',
    title: 'Do Not Sell My Info',
    path: '/do-not-sell-share',
    description: 'California privacy rights',
    type: 'legal',
    category: 'Legal',
    editable: true,
    filePath: 'src/app/do-not-sell-share/page.tsx',
    status: 'published'
  },
  
  // Utility
  {
    id: 'search',
    title: 'Search',
    path: '/search',
    description: 'Site-wide search functionality',
    type: 'feature',
    category: 'Utility',
    editable: false,
    filePath: 'src/app/search/page.tsx',
    status: 'system'
  }
]

export function getPageByPath(path: string): SitePage | undefined {
  return sitePages.find(page => page.path === path)
}

export function getPagesByCategory(category: string): SitePage[] {
  return sitePages.filter(page => page.category === category)
}

export function getEditablePages(): SitePage[] {
  return sitePages.filter(page => page.editable)
}

export function getPageCategories(): string[] {
  return Array.from(new Set(sitePages.map(page => page.category)))
}