'use client'

import { EventCard }    from '@/components/event-card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { events }       from '@/data/events'
import type { Event }   from '@/data/events'
import { useState }     from 'react'
import { Search, Filter } from 'lucide-react'

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Event['category'] | 'all'>('all')
  const [searchQuery,      setSearchQuery]       = useState('')

  const categories: Array<{ id: Event['category'] | 'all'; label: string }> = [
    { id: 'all',        label: 'All Events'  },
    { id: 'conference', label: 'Conferences' },
    { id: 'workshop',   label: 'Workshops'   },
    { id: 'networking', label: 'Networking'  },
    { id: 'webinar',    label: 'Webinars'    },
  ]

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory
    const q = searchQuery.toLowerCase()
    const matchesSearch = event.title.toLowerCase().includes(q) || event.description.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  return (
    <main className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal className="mb-12 space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">All Events</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Browse our upcoming events — from hackathons to networking nights. Register directly, no account needed.
          </p>
        </ScrollReveal>

        {/* Search & filters */}
        <ScrollReveal delay={0.06} className="mb-10 space-y-3">
          {/* Search input — uses glass-input utility */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={16} />
            <input
              type="text"
              placeholder="Search events…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
            />
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
                style={{
                  background: selectedCategory === cat.id
                    ? 'linear-gradient(135deg, rgba(34,211,238,0.72) 0%, rgba(14,165,233,0.72) 100%)'
                    : 'rgba(255,255,255,0.06)',
                  border: selectedCategory === cat.id
                    ? '1px solid rgba(34,211,238,0.36)'
                    : '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.90)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, i) => (
              <ScrollReveal key={event.id} delay={i * 0.05}>
                <EventCard event={event} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Filter size={36} className="mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No events found</h3>
            <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria.</p>
          </div>
        )}

      </div>
    </main>
  )
}
