'use client'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-base-100 via-blue-50/50 to-base-150 dark:bg-base-900">
      {/* layered gradient background */}
      <div className="absolute inset-0">
        {/* base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/50 to-transparent dark:from-base-900 dark:via-base-800 dark:to-base-900" />
        
        {/* radial accent gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(30,94,214,0.15),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(192,160,98,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(30,94,214,0.08),transparent_50%)] dark:bg-[radial-gradient(ellipse_at_bottom_left,rgba(215,195,138,0.10),transparent_50%)]" />
        
        {/* noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* animated sound visualization */}
      <div className="absolute inset-0 overflow-hidden">
        {/* sound bars - bottom, full width */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between h-32">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 bg-gradient-to-t from-blue-500/25 to-transparent dark:from-accent-600/20"
              initial={{ height: '20%' }}
              animate={{ 
                height: [`${15 + Math.random() * 20}%`, `${30 + Math.random() * 50}%`, `${15 + Math.random() * 20}%`],
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.05
              }}
              style={{ marginRight: '1px' }}
            />
          ))}
        </div>
      </div>

      {/* subtle grid */}
      <motion.div 
        className="absolute inset-0 opacity-[0.04] bg-grid-light dark:bg-grid bg-[size:36px_36px]"
        animate={{ opacity: [0.04, 0.06, 0.04] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* animated light sweep */}
      <motion.div
        className="pointer-events-none absolute -top-40 -right-20 h-[60rem] w-[60rem] rounded-full
                   bg-[radial-gradient(closest-side,rgba(30,94,214,.12),transparent_60%)] dark:bg-[radial-gradient(closest-side,rgba(192,160,98,.08),transparent_60%)]"
        initial={{ x: 180, opacity: .2 }}
        animate={{ x: -60, opacity: .4 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse' }}
      />

      <div className="container relative py-24 sm:py-32">
        <motion.h1
          initial={{ opacity:0, y:10 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration: .6 }}
          className="text-5xl sm:text-6xl xl:text-7xl font-display uppercase tracking-tight"
        >
          Where Sound Meets Strategy
        </motion.h1>
        <p className="mt-6 max-w-2xl text-base-700 dark:text-white/80 text-lg">
          MMEG is a future-forward label & representation group building iconic brands, launching global records, and engineering unforgettable moments.
        </p>
        <div className="mt-10 flex gap-4">
          <a href="/artists" className="rounded-2xl bg-blue-500 dark:bg-white text-white dark:text-black px-5 py-3 font-medium shadow-lg shadow-blue-500/20 dark:shadow-glow hover:bg-blue-600 dark:hover:bg-white/90 transition">Explore Artists</a>
          <a href="/contact" className="rounded-2xl bg-white dark:bg-white/10 text-base-900 dark:text-white px-5 py-3 font-medium ring-1 ring-base-200 dark:ring-white/15 hover:bg-base-100 dark:hover:bg-white/15 transition">Work With Us</a>
        </div>
      </div>
    </section>
  )
}