import { Artist } from '@/types/artist'

export const ARTISTS_DATA: Artist[] = [
  {
    slug: 'eclyp5ed',
    name: 'ECLYP5ED',
    tagline: 'Silhouette K‑Pop — neon edges, future choreography.',
    image: '/placeholder-performer.svg',
    coverImage: '/placeholder-performer.svg',
    bio: `ECLYP5ED is redefining K-Pop with their signature blend of dark electronica and razor-sharp choreography. Formed in 2022, this five-member group has quickly risen to international acclaim with their mysterious personas and genre-bending sound.

Their debut EP "Shadow Protocol" topped charts in 12 countries, while their viral dance challenges have accumulated over 500M views on TikTok. Known for their theatrical live performances and cryptic visual storytelling, ECLYP5ED continues to push the boundaries of what K-Pop can be.`,
    genre: ['K-Pop', 'Dark Pop', 'Electronic'],
    location: 'Seoul, South Korea',
    founded: '2022',
    members: ['Luna', 'Kai', 'Sage', 'Neo', 'Phoenix'],
    socialLinks: {
      instagram: '@eclyp5ed',
      twitter: '@eclyp5ed',
      youtube: '@eclyp5ed',
      tiktok: '@eclyp5ed',
      spotify: 'spotify:artist:eclyp5ed',
      appleMusic: 'apple.music/eclyp5ed'
    },
    stats: {
      monthlyListeners: '8.2M',
      followers: '2.4M',
      totalStreams: '450M'
    },
    discography: [
      {
        id: '1',
        title: 'Shadow Protocol',
        type: 'ep',
        releaseDate: '2023-10-13',
        cover: '/placeholder-performer.svg',
        spotifyUrl: '#',
        appleMusicUrl: '#'
      },
      {
        id: '2',
        title: 'Neon Dreams',
        type: 'single',
        releaseDate: '2024-02-14',
        cover: '/placeholder-performer.svg',
        spotifyUrl: '#',
        appleMusicUrl: '#'
      },
      {
        id: '3',
        title: 'Digital Hearts',
        type: 'album',
        releaseDate: '2024-06-21',
        cover: '/placeholder-performer.svg',
        spotifyUrl: '#',
        appleMusicUrl: '#'
      }
    ],
    videos: [
      {
        id: '1',
        title: 'Neon Dreams (Official MV)',
        youtubeId: 'dQw4w9WgXcQ',
        releaseDate: '2024-02-14',
        views: '45M'
      },
      {
        id: '2',
        title: 'Shadow Protocol (Performance Video)',
        youtubeId: 'dQw4w9WgXcQ',
        releaseDate: '2023-10-15',
        views: '32M'
      }
    ],
    events: [
      {
        id: '1',
        date: '2025-03-15',
        venue: 'The Forum',
        city: 'Los Angeles, CA',
        ticketUrl: '#'
      },
      {
        id: '2',
        date: '2025-03-18',
        venue: 'Madison Square Garden',
        city: 'New York, NY',
        ticketUrl: '#',
        soldOut: true
      },
      {
        id: '3',
        date: '2025-03-22',
        venue: 'United Center',
        city: 'Chicago, IL',
        ticketUrl: '#'
      }
    ],
    press: [
      {
        id: '1',
        outlet: 'Billboard',
        title: 'ECLYP5ED: The Future of K-Pop is Dark and Beautiful',
        date: '2024-07-15',
        url: '#',
        quote: 'A group that refuses to be defined by genre conventions.'
      },
      {
        id: '2',
        outlet: 'NME',
        title: 'Rising Stars ECLYP5ED Talk Shadow Protocol',
        date: '2023-10-20',
        url: '#'
      }
    ],
    achievements: [
      '2024 MTV EMA - Best Korean Act',
      '2023 MAMA - Rookie of the Year',
      'Billboard Hot 100 - #12 with "Neon Dreams"',
      '500M+ Total Streams',
      '2.4M+ Social Media Followers'
    ]
  },
  {
    slug: 'jane-lee',
    name: 'Jane Lee',
    tagline: 'Ballads with spine — Seoul to the world.',
    image: '/placeholder-performer.svg',
    coverImage: '/placeholder-performer.svg',
    bio: `Jane Lee's voice carries the weight of tradition while breaking new ground. The Seoul-born singer-songwriter crafts emotionally charged ballads that blend Korean musical heritage with contemporary pop sensibilities.

After years of writing for other artists, Jane stepped into the spotlight with her debut album "Echoes of Seoul," which earned critical acclaim for its raw honesty and sophisticated production. Her music videos, known for their cinematic quality and emotional depth, have garnered millions of views worldwide.`,
    genre: ['K-Ballad', 'Pop', 'R&B'],
    location: 'Seoul, South Korea',
    socialLinks: {
      instagram: '@janelee_official',
      twitter: '@janelee_music',
      youtube: '@janeleemusic',
      spotify: 'spotify:artist:janelee',
      appleMusic: 'apple.music/janelee'
    },
    stats: {
      monthlyListeners: '3.5M',
      followers: '1.2M',
      totalStreams: '180M'
    },
    discography: [
      {
        id: '1',
        title: 'Echoes of Seoul',
        type: 'album',
        releaseDate: '2023-05-10',
        cover: '/placeholder-performer.svg',
        spotifyUrl: '#',
        appleMusicUrl: '#'
      },
      {
        id: '2',
        title: 'Midnight Rain',
        type: 'single',
        releaseDate: '2024-01-20',
        cover: '/placeholder-performer.svg',
        spotifyUrl: '#',
        appleMusicUrl: '#'
      }
    ],
    videos: [
      {
        id: '1',
        title: 'Midnight Rain (Official MV)',
        youtubeId: 'dQw4w9WgXcQ',
        releaseDate: '2024-01-20',
        views: '12M'
      }
    ],
    events: [
      {
        id: '1',
        date: '2025-04-10',
        venue: 'Blue Note',
        city: 'Tokyo, Japan',
        ticketUrl: '#'
      },
      {
        id: '2',
        date: '2025-04-15',
        venue: 'The Wiltern',
        city: 'Los Angeles, CA',
        ticketUrl: '#'
      }
    ],
    achievements: [
      'Korean Music Awards - Best New Artist 2023',
      'Melon Music Awards - Ballad of the Year',
      '#1 on Korean Charts for 8 consecutive weeks'
    ]
  }
]