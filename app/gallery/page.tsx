import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { GlassCard }    from '@/components/ui/glass-card'

export const metadata = { title: 'Gallery — InnovatorsHub' }

const PHOTOS = [
  { src: 'https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=600&h=400&fit=crop', caption: 'AI Summit 2024', span: 'lg:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop', caption: 'Web3 Workshop' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop', caption: 'Team Collaboration' },
  { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=400&fit=crop', caption: 'Hackathon 2023' },
  { src: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop', caption: 'Speaker Session', span: 'lg:col-span-2' },
  { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop', caption: 'Design Workshop' },
  { src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', caption: 'Networking Night' },
  { src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop', caption: 'Awards Night' },
]

export default function GalleryPage() {
  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        <ScrollReveal className="max-w-2xl space-y-4">
          <h1 className="text-5xl sm:text-6xl font-bold text-white">Gallery</h1>
          <p className="text-lg text-gray-300">Moments from our events, workshops, and community gatherings.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PHOTOS.map((photo, i) => (
            <ScrollReveal key={i} delay={i * 0.06} className={photo.span ?? ''}>
              <GlassCard className="h-full">
                <div className="group relative overflow-hidden rounded-2xl h-60 sm:h-72">
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white font-semibold text-sm">{photo.caption}</p>
                  </div>
                </div>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </main>
  )
}
