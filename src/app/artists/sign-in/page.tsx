'use client'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, Shield } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ArtistsSignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic
    console.log('Sign in attempt:', { email, password })
  }

  return (
    <section className="container py-16 max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 dark:bg-accent-600/20 ring-1 ring-blue-200 dark:ring-accent-600/30 mb-6">
            <Lock className="w-8 h-8 text-blue-600 dark:text-accent-600" />
          </div>
          <h1 className="text-4xl font-display uppercase mb-4 text-base-900 dark:text-white">Artist Sign In</h1>
          <p className="text-base-600 dark:text-white/80">
            Access your MMEG artist portal to manage your career
          </p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-white/5 ring-1 ring-base-200 dark:ring-white/10 p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-base-700 dark:text-white">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-base-50 dark:bg-white/10 border border-base-200 dark:border-white/20 px-12 py-3 text-base-900 dark:text-white placeholder-base-400 dark:placeholder-white/40 focus:border-blue-500 dark:focus:border-accent-600 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-accent-600 transition"
                  placeholder="artist@example.com"
                  required
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-400 dark:text-white/40" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2 text-base-700 dark:text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl bg-base-50 dark:bg-white/10 border border-base-200 dark:border-white/20 px-12 py-3 text-base-900 dark:text-white placeholder-base-400 dark:placeholder-white/40 focus:border-blue-500 dark:focus:border-accent-600 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-accent-600 transition"
                  placeholder="••••••••"
                  required
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-400 dark:text-white/40" />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-base-300 dark:border-white/20 bg-white dark:bg-white/10 text-blue-600 dark:text-accent-600 focus:ring-blue-600 dark:focus:ring-accent-600 focus:ring-offset-0" />
                <span className="ml-2 text-base-600 dark:text-white/70">Remember me</span>
              </label>
              <a href="#" className="text-blue-600 dark:text-accent-600 hover:text-blue-700 dark:hover:text-accent-700 transition">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-blue-500 dark:bg-accent-600 text-white dark:text-black px-6 py-3 font-medium hover:bg-blue-600 dark:hover:bg-accent-700 transition flex items-center justify-center gap-2 shadow-lg"
            >
              Sign In to Portal
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-base-200 dark:border-white/10">
            <div className="flex items-center gap-3 text-sm text-base-500 dark:text-white/60 mb-4">
              <Shield className="w-4 h-4" />
              <span>Your data is protected with enterprise-grade security</span>
            </div>
            
            <p className="text-center text-sm text-base-600 dark:text-white/60">
              Don't have an account? 
              <Link href="/contact" className="ml-2 text-blue-600 dark:text-accent-600 hover:text-blue-700 dark:hover:text-accent-700 transition">
                Apply to join MMEG
              </Link>
            </p>
          </div>
        </div>

        <motion.div 
          className="mt-12 rounded-2xl bg-gradient-to-r from-blue-100 to-blue-50 dark:from-accent-600/10 dark:to-accent-700/10 p-6 border border-blue-200 dark:border-accent-600/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="font-semibold mb-2 text-base-900 dark:text-white">Need Help?</h2>
          <p className="text-sm text-base-600 dark:text-white/70 mb-4">
            Having trouble accessing your account? Our support team is here to help.
          </p>
          <div className="space-y-2 text-sm">
            <p className="text-base-500 dark:text-white/60">
              Email: <a href="mailto:support@mmeg.com" className="text-blue-600 dark:text-accent-600 hover:text-blue-700 dark:hover:text-accent-700 transition">support@mmeg.com</a>
            </p>
            <p className="text-base-500 dark:text-white/60">
              Phone: <span className="text-base-700 dark:text-white/80">1-800-MMEG-HLP</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}