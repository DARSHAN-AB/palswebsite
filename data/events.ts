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
    status:      'LIVE',
    slug:        'future-of-ai-innovation-summit',
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
    status:      'PAST',
    slug:        'vibe-coding-unplugged',
  },
  {
    id:          '3',
    title:       'Startup Founder Networking Night',
    description: 'Connect with founders, investors, and mentors.',
    date:        '2026-09-28',
    time:        '6:00 PM – 9:00 PM',
    location:    'Rooftop Venue',
    mode:        'Offline',
    image:       'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=700&h=420&fit=crop',
    category:    'networking',
    attendees:   300,
    featured:    true,
    status:      'UPCOMING',
    slug:        'startup-founder-networking-night',
  },
  {
    id:          '4',
    title:       'Cloud Infrastructure Deep Dive',
    description: 'Master modern cloud architecture and DevOps best practices.',
    date:        '2025-10-05',
    time:        '2:00 PM – 5:00 PM',
    location:    'Online',
    mode:        'Virtual',
    image:       'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700&h=420&fit=crop',
    category:    'webinar',
    attendees:   850,
    featured:    false,
    status:      'PAST',
    slug:        'cloud-infrastructure-deep-dive',
  },
  {
    id:          '5',
    title:       'Design System Excellence',
    description: 'Learn how leading companies build and maintain design systems.',
    date:        '2026-10-12',
    time:        '10:00 AM – 4:00 PM',
    location:    'Design Hub – Bay Area',
    mode:        'Hybrid',
    image:       'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&h=420&fit=crop',
    category:    'workshop',
    attendees:   200,
    featured:    false,
    status:      'UPCOMING',
    slug:        'design-system-excellence',
  },
  {
    id:          '6',
    title:       'Product Strategy Masterclass',
    description: 'Build products that users love with top product leaders.',
    date:        '2025-10-19',
    time:        '9:00 AM – 12:00 PM',
    location:    'Online',
    mode:        'Virtual',
    image:       'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&h=420&fit=crop',
    category:    'webinar',
    attendees:   1200,
    featured:    false,
    status:      'PAST',
    slug:        'product-strategy-masterclass',
  },
]

export const getEventById = (id: string): Event | undefined =>
  events.find(e => e.id === id)

export const getFeaturedEvents = (): Event[] =>
  events.filter(e => e.featured)

export const getEventsByCategory = (category: Event['category']): Event[] =>
  events.filter(e => e.category === category)
