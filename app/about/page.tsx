import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { GlassCard }    from '@/components/ui/glass-card'
import { ArrowRight, Target, Eye, Heart } from 'lucide-react'
import Link from 'next/link'

export const metadata = { title: 'About Us — InnovatorsHub' }

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* Header */}
        <ScrollReveal className="max-w-3xl space-y-5">
          <h1 className="text-5xl sm:text-6xl font-bold text-white">About InnovatorsHub</h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            We are a student-run innovation club at State University, founded in 2019 with one goal:
            to help students turn their ideas into reality through community, education, and hands-on experience.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 text-cyan-300 font-semibold hover:text-cyan-200 transition-colors">
            Join the club <ArrowRight size={16} />
          </Link>
        </ScrollReveal>

        {/* Mission / Vision / Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <Target size={22} className="text-cyan-300" />, title: 'Our Mission', body: 'To create an inclusive space where students can explore technology, develop entrepreneurial thinking, and collaborate on projects that create real impact.' },
            { icon: <Eye    size={22} className="text-sky-400"  />, title: 'Our Vision',  body: 'A campus where every student, regardless of background, has the tools, network, and confidence to build what they believe in.' },
            { icon: <Heart  size={22} className="text-cyan-300" />, title: 'Our Values',  body: 'Curiosity, collaboration, inclusivity, and a bias towards action. We believe the best ideas come from diverse teams doing the work together.' },
          ].map((c, i) => (
            <ScrollReveal key={c.title} delay={i * 0.1}>
              <GlassCard className="h-full">
                <div className="glass-card rounded-2xl p-7 h-full space-y-4">
                  <div className="w-11 h-11 glass-card rounded-xl flex items-center justify-center">
                    {c.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{c.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{c.body}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Story */}
        <ScrollReveal>
          <GlassCard>
            <div className="glass-card rounded-2xl p-8 sm:p-12 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-5">
                <h2 className="text-3xl font-bold text-white">Our Story</h2>
                <p className="text-gray-300 leading-relaxed">
                  InnovatorsHub was started by a group of five computer science students who felt the gap between classroom theory and real-world problem-solving.
                  What began as a weekly study group quickly grew into one of the most active clubs on campus.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Today we host 80+ events annually, partner with local startups and tech companies, and run an annual hackathon that attracts participants from 20+ universities.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Club members collaborating" className="w-full h-full object-cover" />
              </div>
            </div>
          </GlassCard>
        </ScrollReveal>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { v: '2019', l: 'Founded' },
            { v: '500+', l: 'Members' },
            { v: '80+',  l: 'Events/Year' },
            { v: '20+',  l: 'Partners' },
          ].map((s, i) => (
            <ScrollReveal key={s.l} delay={i * 0.07}>
              <GlassCard>
                <div className="glass-card rounded-2xl p-6 text-center">
                  <p className="text-4xl font-bold text-cyan-300">{s.v}</p>
                  <p className="text-gray-300 text-sm mt-1">{s.l}</p>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </main>
  )
}
