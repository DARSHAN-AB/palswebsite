export type EventStatus = 'LIVE' | 'PAST' | 'UPCOMING'
export type EventMode   = 'Virtual' | 'Offline' | 'Hybrid'

export interface Event {
  id:          string
  title:       string
  description: string
  date:        string          // ISO  yyyy-mm-dd
  time:        string
  location:    string
  mode:        EventMode
  image:       string
  category:    'conference' | 'workshop' | 'networking' | 'webinar'
  attendees:   number
  featured:    boolean
  status:      EventStatus
  slug:        string
  /** Gallery photos for this event — first item is always the cover (event.image) */
  photos?:     string[]
}

export const events: Event[] = [
  {
    id:          '1',
    title:       'Future of AI Innovation Summit',
    description: 'Discover cutting-edge AI breakthroughs from industry leaders.',
    date:        '2026-07-04',
    time:        '9:00 AM – 5:00 PM',
    location:    'BMSIT&M Auditorium',
    mode:        'Virtual',
    image:       'https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=700&h=420&fit=crop',
    category:    'conference',
    attendees:   2500,
    featured:    true,
    status:      'UPCOMING',
    slug:        'future-of-ai-innovation-summit',
    photos: [
      'https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop',
    ],
  },
  {
    id:          '2',
    title:       'Vibe Coding Unplugged',
    description: 'Build Smarter with MCP.',
    date:        '2026-04-18',
    time:        '10:00 AM – 3:00 PM',
    location:    'Tech Hub Downtown',
    mode:        'Virtual',
    image:       'https://images.unsplash.com/photo-1552664730-d307ca884978?w=700&h=420&fit=crop',
    category:    'workshop',
    attendees:   150,
    featured:    true,
    status:      'LIVE',
    slug:        'vibe-coding-unplugged',
    photos: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
    ],
  },
  {
    id:          '3',
    title:       'Think 2 Impact 2026',
    description: 'Connect with founders, investors, and mentors.',
    date:        '2026-03-14',
    time:        '9:00 AM – 6:00 PM',
    location:    'Seminar Hall 1, Academic Block',
    mode:        'Offline',
    image:       './think2impact.jpg',
    category:    'Hackathon',
    attendees:   300,
    featured:    true,
    status:      'PAST',
    slug:        'think-2-impact-2026',
    photos: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&h=600&fit=crop',
    ],
  },
]

export const getEventById = (idOrSlug: string): Event | undefined =>
  events.find(e => e.id === idOrSlug || e.slug === idOrSlug)

export const getFeaturedEvents = (): Event[] =>
  events.filter(e => e.featured)

export const getEventsByCategory = (category: Event['category']): Event[] =>
  events.filter(e => e.category === category)
