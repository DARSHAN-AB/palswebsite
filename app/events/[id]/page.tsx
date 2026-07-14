import { EventCard }    from '@/components/event-card'
import { GlassCard }    from '@/components/ui/glass-card'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { getEventById, getFeaturedEvents } from '@/data/events'
import { Calendar, MapPin, Users, Clock, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { RegisterButton } from '@/components/ui/register-button'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id }  = await params
  const event   = getEventById(id)
  if (!event) notFound()

  const otherEvents = getFeaturedEvents().filter(e => e.id !== event.id)

  const categoryStyles: Record<string, string> = {
    conference: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25',
    workshop:   'bg-sky-500/15  text-sky-300  border border-sky-500/25',
    networking: 'bg-white/8     text-green-300 border border-green-500/25',
    webinar:    'bg-white/8     text-orange-300 border border-orange-500/25',
  }
  const categoryLabels: Record<string, string> = {
    conference: 'Conference', workshop: 'Workshop', networking: 'Networking', webinar: 'Webinar',
  }

  const infoCards = [
    { icon: <Calendar size={15} className="text-cyan-400" />, label: 'Date',      value: new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
    { icon: <Clock    size={15} className="text-cyan-400" />, label: 'Time',      value: event.time },
    { icon: <MapPin   size={15} className="text-cyan-400" />, label: 'Location',  value: event.location },
    { icon: <Users    size={15} className="text-cyan-400" />, label: 'Attending', value: `${event.attendees.toLocaleString()} people` },
  ]

  return (
    <main className="min-h-screen pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link href="/events" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-cyan-300 transition-colors mb-8">
          <ArrowLeft size={13} /> Back to Events
        </Link>

        {/* Hero image */}
        <ScrollReveal className="relative rounded-3xl overflow-hidden mb-12" style={{ height: '380px' }}>
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${categoryStyles[event.category] ?? categoryStyles.conference}`}>
              {categoryLabels[event.category] ?? 'Event'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">{event.title}</h1>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">

            {/* Info cards */}
            <ScrollReveal>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {infoCards.map(c => (
                  <GlassCard key={c.label}>
                    <div className="glass-card rounded-xl p-4">
                      <div className="flex items-center gap-1.5 mb-2">
                        {c.icon}
                        <span className="text-xs text-gray-400">{c.label}</span>
                      </div>
                      <p className="font-semibold text-white text-sm">{c.value}</p>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </ScrollReveal>

            {/* About */}
            <ScrollReveal delay={0.08}>
              <GlassCard>
                <div className="glass-card rounded-2xl p-6 space-y-4">
                  <h2 className="text-2xl font-bold text-white">About This Event</h2>
                  <p className="text-gray-300 leading-relaxed text-sm">{event.description}</p>
                  <div className="border-t border-white/10 pt-4 space-y-3">
                    <h3 className="font-semibold text-white text-sm">What You'll Get</h3>
                    <ul className="space-y-2">
                      {[
                        'Industry insights from world-class experts',
                        'Hands-on experience with cutting-edge practices',
                        'Networking with fellow innovators',
                        'Exclusive resources and follow-up materials',
                      ].map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-cyan-400 mt-0.5 text-xs">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>

            {/* Speakers */}
            <ScrollReveal delay={0.12}>
              <h2 className="text-xl font-bold text-white mb-4">Featured Speakers</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {['Alice Johnson', 'Bob Smith'].map(speaker => (
                  <GlassCard key={speaker}>
                    <div className="glass-card rounded-xl p-4 flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full flex-shrink-0" style={{ background: 'linear-gradient(135deg,#22d3ee,#0ea5e9)' }} />
                      <div>
                        <p className="font-semibold text-white text-sm">{speaker}</p>
                        <p className="text-xs text-gray-400">Industry Expert</p>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </ScrollReveal>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">

              {/* Registration */}
              <GlassCard>
                <div className="glass-card rounded-2xl p-5 space-y-4">
                  <h3 className="text-lg font-bold text-white">Register for Free</h3>
                  <div className="space-y-1.5 text-sm text-gray-300">
                    <p><span className="text-white font-medium">Status:</span> Registration Open</p>
                    <p><span className="text-white font-medium">Spots Left:</span> 234 available</p>
                    <p><span className="text-white font-medium">Fee:</span> Free for members</p>
                  </div>
                  <RegisterButton eventTitle={event.title} />
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-colors glass-card">
                    <Share2 size={14} /> Share Event
                  </button>
                </div>
              </GlassCard>

              {/* Event details */}
              <GlassCard>
                <div className="glass-card rounded-2xl p-5 space-y-2 text-sm">
                  <h3 className="font-semibold text-white mb-1">Event Details</h3>
                  {[
                    { label: 'Category', value: event.category },
                    { label: 'Type',     value: 'Club Event' },
                    { label: 'Level',    value: 'All Levels Welcome' },
                  ].map(d => (
                    <div key={d.label} className="flex justify-between items-center border-t border-white/8 pt-2">
                      <span className="text-gray-400">{d.label}</span>
                      <span className="text-white font-medium capitalize">{d.value}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

            </div>
          </div>
        </div>

        {/* Other events */}
        {otherEvents.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">More Upcoming Events</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherEvents.slice(0, 3).map((e, i) => (
                <ScrollReveal key={e.id} delay={i * 0.08}>
                  <EventCard event={e} />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  )
}
