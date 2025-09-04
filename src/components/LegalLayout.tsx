'use client'
import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'

type TocItem = { id: string; label: string }

export default function LegalLayout({
  title,
  updated,
  children,
  toc,
}: {
  title: string
  updated: string
  children: React.ReactNode
  toc: TocItem[]
}) {
  const [active, setActive] = useState<string>(toc?.[0]?.id ?? '')

  useEffect(() => {
    if (!toc?.length) return
    const observers: IntersectionObserver[] = []
    toc.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) setActive(id)
          })
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: [0, 1] }
      )
      io.observe(el)
      observers.push(io)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [toc])

  return (
    <section className="container py-20">
      <header className="mb-10">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-gray-600 dark:text-white/60">Last updated: {updated}</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Sticky ToC */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-28">
            <div className="rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 dark:from-white/10 via-blue-200/25 dark:via-accent-700/25 to-transparent">
              <nav className="rounded-2xl bg-white dark:bg-base-900/70 backdrop-blur ring-1 ring-gray-200 dark:ring-white/10 p-5">
                <div className="text-sm font-medium mb-3 text-gray-900 dark:text-white">On this page</div>
                <ul className="space-y-1 text-sm">
                  {toc.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className={`block rounded-lg px-3 py-2 transition ${
                          active === item.id
                            ? 'bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </aside>

        {/* Content card */}
        <div className="lg:col-span-8">
          <div className="rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 dark:from-white/10 via-blue-200/25 dark:via-accent-600/25 to-transparent shadow-lg dark:shadow-glow">
            <article className="rounded-2xl bg-white dark:bg-base-900/70 backdrop-blur ring-1 ring-gray-200 dark:ring-white/10 p-6 sm:p-10 prose dark:prose-invert max-w-none">
              {children}
            </article>
          </div>

          <div className="mt-8 flex justify-end">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-100 dark:bg-white/10 px-4 py-2 ring-1 ring-gray-200 dark:ring-white/15 hover:bg-gray-200 dark:hover:bg-white/15 text-sm text-gray-700 dark:text-white"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <ChevronUp size={16} />
              Back to top
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}