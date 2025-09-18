import type { Metadata } from 'next'
import { Inter, Bebas_Neue } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { ThemeScript } from '@/components/ThemeScript'
import { Providers } from '@/components/Providers'
import AnalyticsLoader from '@/components/AnalyticsLoader'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.example.com'),
  title: {
    default: 'MMEG — Maryott Media & Entertainment Group',
    template: '%s | MMEG'
  },
  description: 'A future-forward label & representation company. We develop artists, amplify stories, and engineer moments.',
  openGraph: {
    title: 'MMEG — Maryott Media & Entertainment Group',
    description: 'Future-forward label & representation.',
    url: 'https://www.example.com',
    siteName: 'MMEG',
    images: [{ url: '/og.svg', width: 1200, height: 630 }],
    locale: 'en_US', type: 'website'
  },
  twitter: { card: 'summary_large_image', site: '@mmeg' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable}`} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-white dark:bg-base-900 text-gray-900 dark:text-white transition-colors`}>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context":"https://schema.org",
              "@type":"Organization",
              "name":"MMEG",
              "url":"https://www.example.com",
              "logo":"/og.svg",
              "sameAs":[
                "https://instagram.com/...", "https://youtube.com/...", "https://tiktok.com/@..."
              ]
            })
          }}
        />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AnalyticsLoader />
        </Providers>
      </body>
    </html>
  )
}