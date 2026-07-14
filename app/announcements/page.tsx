import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { GlassCard }    from '@/components/ui/glass-card'
import { Bell, Pin }    from 'lucide-react'

export const metadata = { title: 'Announcements — InnovatorsHub' }

const ANNOUNCEMENTS = [
  { id: 1, title: 'Registrations Open: Annual Hackathon 2025',    date: 'July 10, 2025',  tag: 'Hackathon',  pinned: true,  body: 'Our flagship 48-hour hackathon is back! Form a team of up to 4, pick a challenge track, and build something amazing. Prizes worth $5,000 up for grabs. Register before August 1.' },
  { id: 2, title: 'New Semester Membership Drive',                 date: 'July 5, 2025',   tag: 'Membership', pinned: true,  body: 'Welcome to the new semester! We are accepting new members for 2025–26. Fill in the interest form or visit us at the Student Activities Fair on July 20.' },
  { id: 3, title: 'Workshop Series: Generative AI Fundamentals',   date: 'June 28, 2025',  tag: 'Workshop',   pinned: false, body: 'A three-part workshop series on Generative AI begins July 15. Sessions will cover prompting, fine-tuning, and building with APIs. Open to all members.' },
  { id: 4, title: 'Industry Visit: Tech Campus Tour',              date: 'June 20, 2025',  tag: 'Visit',      pinned: false, body: "We've secured spots for 30 members to tour a leading tech company's campus in the city. Includes office tour, Q&A with engineers, and networking lunch." },
  { id: 5, title: 'Speaker Session Recap — Future of Robotics',   date: 'June 14, 2025',  tag: 'Recap',      pinned: false, body: "Thank you to everyone who attended last week's speaker session. Slides and recording are now available. Stay tuned for next month's event." },
]

const TAG_STYLES: Record<string, string> = {
  Hackathon:  'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25',
  Membership: 'bg-sky-500/15  text-sky-300  border border-sky-500/25',
  Workshop:   'bg-white/8     text-purple-300 border border-purple-500/25',
  Visit:      'bg-white/8     text-green-300  border border-green-500/25',
  Recap:      'bg-white/8     text-gray-300   border border-gray-500/25',
}

export default function AnnouncementsPage() {
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        <ScrollReveal className="space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white">Announcements</h1>
          <p className="text-lg text-gray-300">Stay up to date with the latest news from InnovatorsHub.</p>
        </ScrollReveal>

        <div className="space-y-4">
          {ANNOUNCEMENTS.map((a, i) => (
            <ScrollReveal key={a.id} delay={i * 0.07}>
              <GlassCard>
                <div className="glass-card rounded-2xl p-6 space-y-3">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      {a.pinned && <Pin size={12} className="text-cyan-400 flex-shrink-0" />}
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${TAG_STYLES[a.tag] ?? TAG_STYLES.Recap}`}>
                        {a.tag}
                      </span>
                      <span className="text-xs text-gray-500">{a.date}</span>
                    </div>
                    <Bell size={13} className="text-gray-500 flex-shrink-0" />
                  </div>
                  <h2 className="text-base font-semibold text-white">{a.title}</h2>
                  <p className="text-sm text-gray-300 leading-relaxed">{a.body}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </main>
  )
}
