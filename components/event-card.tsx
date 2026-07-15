import Link from 'next/link'
import { Calendar, MapPin, Users } from 'lucide-react'
import type { Event } from '@/data/events'
import { GlassCard } from '@/components/ui/glass-card'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const categoryStyles: Record<Event['category'], string> = {
    conference: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25',
    workshop:   'bg-sky-500/15  text-sky-300  border border-sky-500/25',
    networking: 'bg-white/8    text-green-300 border border-green-500/25',
    webinar:    'bg-white/8    text-orange-300 border border-orange-500/25',
  }
  const categoryLabels: Record<Event['category'], string> = {
    conference: 'Conference',
    workshop:   'Workshop',
    networking: 'Networking',
    webinar:    'Webinar',
  }

  return (
    <GlassCard className="h-full rounded-2xl">
      <Link href={`/events/${event.slug}`}>
        {/* clear-glass card — uses .glass-card utility */}
        <div className="group h-full glass-card rounded-2xl overflow-hidden cursor-pointer">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-3 right-3">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold backdrop-blur-sm ${categoryStyles[event.category]}`}>
                {categoryLabels[event.category]}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <h3 className="font-semibold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors">
              {event.title}
            </h3>
            <p className="text-sm text-gray-300 line-clamp-2">{event.description}</p>

            <div className="space-y-1.5 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar size={13} className="text-sky-400 flex-shrink-0" />
                <span>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={13} className="text-sky-400 flex-shrink-0" />
                <span className="truncate">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={13} className="text-sky-400 flex-shrink-0" />
                <span>{event.attendees.toLocaleString()} attendees</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/8">
              <span className="text-cyan-300 group-hover:text-cyan-200 text-sm font-semibold transition-colors">
                Learn More →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </GlassCard>
  )
}
