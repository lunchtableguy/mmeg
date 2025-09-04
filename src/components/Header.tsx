'use client'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, ChevronDown, Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '@/components/ThemeProvider'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false)
  const [artistsDropdownOpen, setArtistsDropdownOpen] = useState(false)
  const [musicDropdownOpen, setMusicDropdownOpen] = useState(false)
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 border-b transition
      ${scrolled 
        ? 'bg-base-50/90 dark:bg-base-900/80 backdrop-blur border-base-200 dark:border-white/10' 
        : 'bg-base-50/60 dark:bg-base-900/30 border-base-200/50 dark:border-transparent'}`}>
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group inline-flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}
              className="h-8 w-8 rounded-lg bg-gradient-to-tr from-blue-500 to-blue-600 dark:from-accent-600 dark:to-accent-700 shadow-glow-light dark:shadow-glow"
            />
            <span className="font-display text-xl tracking-wider uppercase">MMEG</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {/* About dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-accent-600 transition">
                About
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <AnimatePresence>
                {aboutDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white dark:bg-base-800/95 backdrop-blur border border-base-200 dark:border-white/10 shadow-lg overflow-hidden"
                  >
                    <Link 
                      href="/about" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      About MMEG
                    </Link>
                    <Link 
                      href="/about/management-team" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Management Team
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Artists dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setArtistsDropdownOpen(true)}
              onMouseLeave={() => setArtistsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-accent-600 transition">
                Artists
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <AnimatePresence>
                {artistsDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white dark:bg-base-800/95 backdrop-blur border border-base-200 dark:border-white/10 shadow-lg overflow-hidden"
                  >
                    <Link 
                      href="/artists/featured" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Featured
                    </Link>
                    <Link 
                      href="/artists/sign-in" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Artist Portal
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Music & Media dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMusicDropdownOpen(true)}
              onMouseLeave={() => setMusicDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-accent-600 transition">
                Music
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <AnimatePresence>
                {musicDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white dark:bg-base-800/95 backdrop-blur border border-base-200 dark:border-white/10 shadow-lg overflow-hidden"
                  >
                    <Link 
                      href="/music" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Releases
                    </Link>
                    <Link 
                      href="/events" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Events & Shows
                    </Link>
                    <Link 
                      href="/merch" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Merch Store
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link className="hover:text-blue-600 dark:hover:text-accent-600 transition" href="/blog">Blog</Link>
            
            {/* More dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setMoreDropdownOpen(true)}
              onMouseLeave={() => setMoreDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-accent-600 transition">
                More
                <ChevronDown className="w-3 h-3" />
              </button>
              
              <AnimatePresence>
                {moreDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white dark:bg-base-800/95 backdrop-blur border border-base-200 dark:border-white/10 shadow-lg overflow-hidden"
                  >
                    <Link 
                      href="/sync" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Sync Licensing
                    </Link>
                    <Link 
                      href="/press" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Press Kit
                    </Link>
                    <Link 
                      href="/partners" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Partners
                    </Link>
                    <Link 
                      href="/careers" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Careers
                    </Link>
                    <Link 
                      href="/contact" 
                      className="block px-4 py-3 hover:bg-base-100 dark:hover:bg-white/10 transition"
                    >
                      Contact
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-base-100 dark:hover:bg-white/10 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button className="md:hidden p-2" onClick={() => setOpen(v=>!v)} aria-label="Open menu">
              <Menu />
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {/* Mobile About section */}
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider text-base-500 dark:text-white/50 px-3 pt-2">About</div>
              <Link 
                href="/about" 
                className="block rounded-lg px-3 py-2 bg-base-100 dark:bg-white/5 hover:bg-base-200 dark:hover:bg-white/10"
                onClick={()=>setOpen(false)}
              >
                About MMEG
              </Link>
              <Link 
                href="/about/management-team" 
                className="block rounded-lg px-3 py-2 bg-base-100 dark:bg-white/5 hover:bg-base-200 dark:hover:bg-white/10 ml-4"
                onClick={()=>setOpen(false)}
              >
                Management Team
              </Link>
            </div>
            
            {/* Mobile Artists section */}
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-wider text-base-500 dark:text-white/50 px-3 pt-2">Artists</div>
              <Link 
                href="/artists/featured" 
                className="block rounded-lg px-3 py-2 bg-base-100 dark:bg-white/5 hover:bg-base-200 dark:hover:bg-white/10"
                onClick={()=>setOpen(false)}
              >
                Featured
              </Link>
              <Link 
                href="/artists/sign-in" 
                className="block rounded-lg px-3 py-2 bg-base-100 dark:bg-white/5 hover:bg-base-200 dark:hover:bg-white/10 ml-4"
                onClick={()=>setOpen(false)}
              >
                Artist Portal
              </Link>
            </div>
            <Link href="/news" className="block rounded-lg px-3 py-2 bg-white/5 hover:bg-white/10" onClick={()=>setOpen(false)}>
              News
            </Link>
            <Link href="/contact" className="block rounded-lg px-3 py-2 bg-white/5 hover:bg-white/10" onClick={()=>setOpen(false)}>
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}