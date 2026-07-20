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
      'ipl_1.jpg',
      'ipl_2.jpg',
      'ipl_3.jpg',
      'ipl_4.jpg',
      'ipl_5.jpg',
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
      't2i_1.jpg',
      't2i_2.jpg',
      't2i_3.jpg',
      't2i_4.jpg',
      't2i_5.jpg',
      't2i_6.jpg',
      't2i_7.jpg',
      't2i_8.jpg',
    ],
  },
]

export const getEventById = (idOrSlug: string): Event | undefined =>
  events.find(e => e.id === idOrSlug || e.slug === idOrSlug)

export const getFeaturedEvents = (): Event[] =>
  events.filter(e => e.featured)

export const getEventsByCategory = (category: Event['category']): Event[] =>
  events.filter(e => e.category === category)
