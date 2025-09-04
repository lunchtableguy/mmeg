'use client'
import { useState } from 'react'

export default function ContactPage(){
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setStatus('sending')
    const res = await fetch('/api/contact', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({
        name: fd.get('name'), email: fd.get('email'),
        subject: fd.get('subject'), message: fd.get('message')
      })
    })
    setStatus(res.ok ? 'sent' : 'error')
    if (res.ok) (e.currentTarget as HTMLFormElement).reset()
  }

  return (
    <section className="container py-16">
      <h1 className="text-4xl font-semibold">Contact</h1>
      <p className="mt-4 text-gray-600 dark:text-white/70 max-w-2xl">Management, representation, and press inquiries. We'll respond within 48 hours.</p>
      <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-2xl">
        <input className="rounded-xl bg-gray-50 dark:bg-white/5 px-4 py-3 ring-1 ring-gray-200 dark:ring-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" name="name" placeholder="Your Name" required />
        <input className="rounded-xl bg-gray-50 dark:bg-white/5 px-4 py-3 ring-1 ring-gray-200 dark:ring-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" type="email" name="email" placeholder="Email" required />
        <input className="rounded-xl bg-gray-50 dark:bg-white/5 px-4 py-3 ring-1 ring-gray-200 dark:ring-white/10 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" name="subject" placeholder="Subject" />
        <textarea className="rounded-xl bg-gray-50 dark:bg-white/5 px-4 py-3 ring-1 ring-gray-200 dark:ring-white/10 min-h-[160px] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400" name="message" placeholder="Tell us about your project…" />
        <button className="rounded-2xl bg-blue-600 dark:bg-accent-600/90 px-5 py-3 font-medium hover:bg-blue-700 dark:hover:bg-accent-600 w-fit text-white" disabled={status==='sending'}>
          {status === 'sending' ? 'Sending…' : 'Send'}
        </button>
        {status==='sent' && <div className="text-sm text-green-600 dark:text-green-400">Message sent.</div>}
        {status==='error' && <div className="text-sm text-red-600 dark:text-red-400">Something went wrong. Try again.</div>}
      </form>
    </section>
  )
}