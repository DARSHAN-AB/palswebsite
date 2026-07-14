import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { GlassCard }    from '@/components/ui/glass-card'
import { ArrowRight }   from 'lucide-react'
import Link             from 'next/link'

export const metadata = { title: 'Articles — InnovatorsHub' }

const ARTICLES = [
  { slug: '#', title: 'How We Built a Real-Time Collaboration Tool in 48 Hours',    excerpt: 'A behind-the-scenes look at our winning hackathon project — from idea to deployment in two days.',                                           date: 'July 8, 2025',  author: 'Jordan Lee',    tag: 'Build Log', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=360&fit=crop' },
  { slug: '#', title: "A Beginner's Guide to Prompt Engineering with GPT-4",        excerpt: 'Everything we covered in our Generative AI workshop, distilled into a practical guide you can start using today.',                               date: 'June 30, 2025', author: 'Priya Sharma',  tag: 'Tutorial',  img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=360&fit=crop' },
  { slug: '#', title: '5 Things I Wish I Knew Before My First Internship',          excerpt: 'Lessons from our senior members who just completed industry internships at top tech companies.',                                                  date: 'June 22, 2025', author: 'Maya Patel',    tag: 'Career',    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=360&fit=crop' },
  { slug: '#', title: 'Why Every CS Student Should Learn UI/UX Design',             excerpt: 'Sofia shares why understanding design makes you a better engineer and how to get started.',                                                       date: 'June 15, 2025', author: 'Sofia Torres',  tag: 'Opinion',   img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=360&fit=crop' },
]

const TAG_STYLES: Record<string, string> = {
  'Build Log': 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25',
  'Tutorial':  'bg-sky-500/15  text-sky-300  border border-sky-500/25',
  'Career':    'bg-white/8     text-green-300  border border-green-500/25',
  'Opinion':   'bg-white/8     text-purple-300 border border-purple-500/25',
}

export default function ArticlesPage() {
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <ScrollReveal className="max-w-2xl space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white">Articles</h1>
          <p className="text-lg text-gray-300">Tutorials, build logs, and opinions written by InnovatorsHub members.</p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {ARTICLES.map((article, i) => (
            <ScrollReveal key={article.title} delay={i * 0.08}>
              <GlassCard className="h-full">
                <Link href={article.slug}>
                  <div className="group glass-card rounded-2xl overflow-hidden h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${TAG_STYLES[article.tag] ?? ''}`}>
                          {article.tag}
                        </span>
                        <span className="text-xs text-gray-500">{article.date}</span>
                      </div>
                      <h2 className="font-semibold text-white text-base leading-snug group-hover:text-cyan-300 transition-colors">
                        {article.title}
                      </h2>
                      <p className="text-sm text-gray-300 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center justify-between pt-1 border-t border-white/10">
                        <span className="text-xs text-gray-400">By {article.author}</span>
                        <span className="text-xs text-cyan-300 flex items-center gap-1">Read <ArrowRight size={11} /></span>
                      </div>
                    </div>
                  </div>
                </Link>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </main>
  )
}
