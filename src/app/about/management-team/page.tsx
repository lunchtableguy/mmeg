export const metadata = { title: 'Management Team' }
export default function ManagementTeamPage() {
  const team = [
    {
      name: 'Michael Torres',
      role: 'Chief Executive Officer',
      bio: 'With over 20 years in the music industry, Michael has guided numerous artists to platinum success and built lasting partnerships across the global entertainment landscape.',
      image: '/team/michael-torres.jpg'
    },
    {
      name: 'Sarah Chen',
      role: 'President of A&R',
      bio: 'Sarah\'s keen ear for talent and deep understanding of market trends has positioned MMEG at the forefront of artist development and creative innovation.',
      image: '/team/sarah-chen.jpg'
    },
    {
      name: 'Marcus Williams',
      role: 'Chief Operating Officer',
      bio: 'Marcus brings extensive operational expertise from leading entertainment companies, streamlining our processes to support artist growth at scale.',
      image: '/team/marcus-williams.jpg'
    },
    {
      name: 'Lisa Park',
      role: 'Head of Marketing',
      bio: 'Lisa\'s data-driven approach and creative campaigns have redefined how artists connect with audiences in the digital age.',
      image: '/team/lisa-park.jpg'
    },
    {
      name: 'David Johnson',
      role: 'VP of Business Development',
      bio: 'David specializes in creating strategic partnerships and new revenue streams that expand opportunities for our artists globally.',
      image: '/team/david-johnson.jpg'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Head of Digital Strategy',
      bio: 'Emma leads our digital initiatives, ensuring our artists stay ahead of the curve in an ever-evolving digital landscape.',
      image: '/team/emma-rodriguez.jpg'
    }
  ]

  return (
    <section className="container py-16">
      <h1 className="text-4xl font-display uppercase text-base-900 dark:text-white">Management Team</h1>
      <p className="mt-6 max-w-3xl text-base-600 dark:text-white/80">
        Our leadership team combines decades of industry expertise with innovative thinking to guide artists toward sustainable success.
      </p>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {team.map((member) => (
          <div key={member.name} className="group h-full">
            <div className="h-full flex flex-col rounded-2xl bg-base-150 dark:bg-white/5 ring-1 ring-base-200 dark:ring-white/10 overflow-hidden hover:ring-blue-500 dark:hover:ring-accent-600 hover:shadow-lg transition">
              <div className="aspect-[4/5] bg-gradient-to-b from-base-200/50 dark:from-white/10 to-transparent" />
              <div className="flex-1 p-6 flex flex-col">
                <h3 className="text-xl font-semibold text-base-900 dark:text-white">{member.name}</h3>
                <p className="text-blue-600 dark:text-accent-600 text-sm mt-1">{member.role}</p>
                <p className="mt-4 text-base-600 dark:text-white/70 text-sm flex-1">{member.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-base-600 dark:text-white/60">
          Interested in joining our team? 
          <a href="/contact" className="ml-2 text-blue-600 dark:text-accent-600 hover:text-blue-700 dark:hover:text-accent-700 transition">
            Get in touch →
          </a>
        </p>
      </div>
    </section>
  )
}