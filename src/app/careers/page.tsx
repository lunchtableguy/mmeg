import { Metadata } from 'next'
import Link from 'next/link'
import { Briefcase, MapPin, Clock, Users, Music, Megaphone, DollarSign, Palette } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join the MMEG team - explore career opportunities in music and entertainment'
}

// Mock data - replace with API call
const jobPostings = [
  {
    id: '1',
    title: 'A&R Manager',
    department: 'Artist & Repertoire',
    location: 'Los Angeles, CA',
    type: 'FULL_TIME',
    description: 'Seeking an experienced A&R Manager to discover and develop new talent.',
    requirements: ['5+ years A&R experience', 'Strong industry connections', 'Proven track record'],
    featured: true
  },
  {
    id: '2',
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    type: 'FULL_TIME',
    description: 'Drive digital marketing strategies for our artist roster.',
    requirements: ['3+ years digital marketing', 'Music industry experience', 'Social media expertise'],
    featured: false
  },
  {
    id: '3',
    title: 'Tour Manager',
    department: 'Live Events',
    location: 'Nashville, TN',
    type: 'CONTRACT',
    description: 'Manage touring logistics for multiple artists.',
    requirements: ['Tour management experience', 'Problem-solving skills', 'Travel required'],
    featured: false
  },
  {
    id: '4',
    title: 'Music Production Intern',
    department: 'Production',
    location: 'Los Angeles, CA',
    type: 'INTERNSHIP',
    description: 'Learn from industry professionals in our state-of-the-art studios.',
    requirements: ['Music production knowledge', 'DAW proficiency', 'Currently enrolled in relevant program'],
    featured: false
  }
]

const departments = [
  { name: 'Artist & Repertoire', icon: <Music />, count: 3 },
  { name: 'Marketing', icon: <Megaphone />, count: 5 },
  { name: 'Business & Finance', icon: <DollarSign />, count: 2 },
  { name: 'Creative', icon: <Palette />, count: 4 },
  { name: 'Live Events', icon: <Users />, count: 3 },
  { name: 'Technology', icon: <Briefcase />, count: 2 }
]

const getTypeColor = (type: string) => {
  switch (type) {
    case 'FULL_TIME': return 'bg-green-600'
    case 'PART_TIME': return 'bg-blue-600'
    case 'CONTRACT': return 'bg-purple-600'
    case 'INTERNSHIP': return 'bg-orange-600'
    default: return 'bg-gray-600'
  }
}

const getTypeLabel = (type: string) => {
  return type.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-900/20 to-base-900 py-20">
        <div className="container">
          <h1 className="text-5xl font-bold mb-4">Join the MMEG Team</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            Be part of shaping the future of music and entertainment. We're always looking for passionate individuals to join our growing team.
          </p>
          <div className="mt-8">
            <Link href="/careers/submit-resume" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition inline-block">
              Submit Your Resume
            </Link>
          </div>
        </div>
      </section>

      {/* Why MMEG */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Work at MMEG?</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-green-600 dark:text-green-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Collaborative Culture</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Work alongside industry leaders and creative professionals
            </p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Music className="text-purple-600 dark:text-purple-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Artist Development</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Shape the careers of tomorrow's biggest music stars
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-blue-600 dark:text-blue-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Growth Opportunities</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Advance your career with ongoing training and mentorship
            </p>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="bg-gray-50 dark:bg-base-800/30 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Explore by Department</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {departments.map(dept => (
              <button key={dept.name} className="bg-white dark:bg-base-800 p-6 rounded-xl hover:shadow-lg transition text-left group">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-gray-600 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition">
                    {dept.icon}
                  </div>
                  <span className="text-sm text-gray-500">{dept.count} openings</span>
                </div>
                <h3 className="font-semibold">{dept.name}</h3>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Job Postings */}
      <section className="container py-16">
        <h2 className="text-3xl font-bold mb-8">Current Openings</h2>
        
        {/* Featured Position */}
        {jobPostings.filter(job => job.featured).map(job => (
          <div key={job.id} className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-8 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm text-green-600 dark:text-green-400 font-semibold">Featured Position</span>
                <h3 className="text-2xl font-bold mt-1">{job.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Briefcase size={14} />
                    {job.department}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {getTypeLabel(job.type)}
                  </span>
                </div>
              </div>
              <Link href={`/careers/${job.id}`} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full transition">
                Apply Now
              </Link>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>
            <div className="flex flex-wrap gap-2">
              {job.requirements.map((req, idx) => (
                <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  {req}
                </span>
              ))}
            </div>
          </div>
        ))}
        
        {/* Other Positions */}
        <div className="grid gap-4">
          {jobPostings.filter(job => !job.featured).map(job => (
            <div key={job.id} className="bg-white dark:bg-base-800/50 rounded-xl p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <span className={`${getTypeColor(job.type)} text-white text-xs px-2 py-1 rounded-full`}>
                      {getTypeLabel(job.type)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1">
                      <Briefcase size={14} />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{job.description}</p>
                </div>
                <Link href={`/careers/${job.id}`} className="bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-black px-6 py-2 rounded-lg transition ml-4">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Internship Program */}
      <section className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">MMEG Internship Program</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Launch your music industry career with hands-on experience at MMEG. Our internship program offers mentorship, real projects, and networking opportunities.
          </p>
          <Link href="/careers/internships" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-semibold transition inline-block">
            Learn More About Internships
          </Link>
        </div>
      </section>
    </div>
  )
}