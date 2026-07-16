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
  category:    'conference' | 'workshop' | 'networking' | 'webinar' | 'hackathon'
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
    title:       'Impromptu Prompt League',
    description: '8-hour coding competition with real-world challenges. Prizes worth 6k. Individual participation.',
    date:        '2026-08-20',
    time:        '09:00 AM – 6:00 PM',
    location:    'Seminar Hall 2nd Floor, Academic Block',
    mode:        'offline',
    image:       'ipl preview.jpg',
    category:    'hackathon',
    attendees:   120,
    featured:    true,
    status:      'LIVE',
    slug:        'impromptu-prompt-league',
    photos: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop',
    ],
  },
  {
    id:          '2',
    title:       'Think 2 Impact 2026',
    description: '8-hour coding competition with real-world challenges. Prizes worth 20k. Team event.',
    date:        '2026-03-14',
    time:        '9:00 AM – 6:00 PM',
    location:    'Seminar Hall 1st Floor, Academic Block',
    mode:        'Offline',
    image:       './think2impact.jpg',
    category:    'hackathon',
    attendees:   150,
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
