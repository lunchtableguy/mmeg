'use client'
import Link from 'next/link'
export function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-black">
      <div className="container py-10 grid gap-8 md:grid-cols-3 text-sm">
        <div className="space-y-3">
          <div className="font-display text-xl tracking-wider uppercase text-gray-900 dark:text-white">MMEG</div>
          <p className="text-gray-600 dark:text-gray-400">Maryott Media & Entertainment Group</p>
          <p className="text-gray-500 dark:text-gray-500">© {new Date().getFullYear()} MMEG. All rights reserved.</p>
        </div>
        <div>
          <div className="font-medium mb-3 text-gray-900 dark:text-white">Links</div>
          <ul className="space-y-2">
            <li><Link className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition" href="/privacy">Privacy Policy</Link></li>
            <li><Link className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition" href="/terms">Terms of Use</Link></li>
            <li><Link className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition" href="/do-not-sell-share">Do Not Sell/Share</Link></li>
            <li className="flex gap-4 pt-2">
              <a className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition" href="#" aria-label="Instagram">Instagram</a>
              <a className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition" href="#" aria-label="TikTok">TikTok</a>
              <a className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition" href="#" aria-label="YouTube">YouTube</a>
              <a className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition" href="#" aria-label="X">X</a>
            </li>
          </ul>
        </div>
        <div>
          <div className="font-medium mb-3 text-gray-900 dark:text-white">Subscribe</div>
          <form className="flex gap-2" onSubmit={(e)=>e.preventDefault()}>
            <input 
              required 
              type="email" 
              placeholder="you@domain.com" 
              className="flex-1 rounded-xl bg-white dark:bg-white/5 px-4 py-2 outline-none ring-1 ring-gray-200 dark:ring-white/10 focus:ring-black dark:focus:ring-white transition text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" 
            />
            <button className="rounded-xl bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-sm">
              Join
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}