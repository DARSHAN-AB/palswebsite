import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { GlassCard }    from '@/components/ui/glass-card'

export const metadata = { title: 'Our Team — InnovatorsHub' }

const TEAM = [
  { name: 'Priya Sharma',  role: 'President',           year: 'Final Year · CS',       img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
  { name: 'Alex Chen',     role: 'Vice President',       year: 'Third Year · ECE',      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
  { name: 'Maya Patel',    role: 'Events Head',          year: 'Third Year · CS',       img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face' },
  { name: 'Jordan Lee',    role: 'Tech Lead',            year: 'Final Year · CS',       img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Sofia Torres',  role: 'Design Lead',          year: 'Second Year · Design',  img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face' },
  { name: 'Rohan Mehta',   role: 'Outreach & Marketing', year: 'Third Year · Business', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face' },
  { name: 'Emma Wilson',   role: 'Finance Head',         year: 'Second Year · Finance', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face' },
  { name: 'Liam Nguyen',   role: 'Sponsorship Head',     year: 'Final Year · MBA',      img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face' },
]

export default function TeamPage() {
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

        <ScrollReveal className="max-w-2xl space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white">Our Team</h1>
          <p className="text-lg text-gray-300">
            Meet the passionate students driving InnovatorsHub forward. Every semester we welcome new leaders — maybe you'll be next.
          </p>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.07}>
              <GlassCard className="h-full">
                <div className="glass-card rounded-2xl p-6 h-full text-center space-y-3">
                  <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full object-cover mx-auto border border-white/15" />
                  <div>
                    <p className="font-semibold text-white">{member.name}</p>
                    <p className="text-sm text-cyan-300 font-medium">{member.role}</p>
                    <p className="text-xs text-gray-400 mt-1">{member.year}</p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Faculty advisor */}
        <ScrollReveal delay={0.1}>
          <GlassCard>
            <div className="glass-card rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face"
                alt="Faculty Advisor"
                className="w-24 h-24 rounded-full object-cover border border-cyan-400/30 flex-shrink-0"
              />
              <div>
                <p className="text-xs uppercase tracking-wider text-cyan-400 font-medium mb-1">Faculty Advisor</p>
                <h3 className="text-xl font-bold text-white">Dr. Rebecca Stone</h3>
                <p className="text-gray-300 text-sm mt-1">Associate Professor, Dept. of Computer Science</p>
                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  Dr. Stone has been guiding InnovatorsHub since its founding and brings industry experience from her time at Google and MIT Media Lab.
                </p>
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

      </div>
    </main>
  )
}
