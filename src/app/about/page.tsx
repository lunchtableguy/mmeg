export const metadata = { title: 'About' }
export default function AboutPage() {
  return (
    <section className="container py-16">
      <h1 className="text-4xl font-display uppercase">About MMEG</h1>
      <p className="mt-6 max-w-3xl text-base-700 dark:text-white/80">MMEG is a label & representation company uniting world‑class A&R, brand architecture, and data‑driven growth. We partner with artists to build long‑lasting careers across recordings, live, merch, sync, and media.</p>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          ['A&R + Development','Tighter songs, stronger brands, bigger moments.'],
          ['Global Releases','Distribution, playlist strategy, campaign systems.'],
          ['Representation','Sponsorships, press, touring, business affairs.']
        ].map(([h,sub]) => (
          <div key={h} className="rounded-2xl bg-base-150 dark:bg-white/5 p-6 ring-1 ring-base-200 dark:ring-white/10 hover:ring-blue-500 dark:hover:ring-accent-600 hover:shadow-lg transition h-full flex flex-col">
            <div className="font-semibold text-base-900 dark:text-white">{h}</div>
            <div className="mt-2 text-base-600 dark:text-white/80 text-sm flex-1">{sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}