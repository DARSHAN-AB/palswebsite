'use client'

import { EventCard }         from '@/components/event-card'
import HeroSection from "@/components/home/HeroSection";
import TaglineSection from "@/components/home/TaglineSection";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import PartnersRoller from "@/components/home/PartnersRoller";
import FeaturedEventsSection from "@/components/home/FeaturedEventsSection";
// import CTASection from "@/components/home/CTASection";
import CommunityCTA from "@/components/home/CommunityCTA";
import { getFeaturedEvents } from '@/data/events'
import { ArrowRight, Zap, Users, Rocket, Calendar, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// ─── Entry animation variants ─────────────────────────────────────────────
const fadeUp   = (delay = 0) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay } })
const fadeRight= (delay = 0) => ({ initial: { opacity: 0, x: 28 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay } })

// ─── Shared glass surface ────────────────────────────────────────────────
const glassSurface: React.CSSProperties = {
  background:           'radial-gradient(ellipse 80% 45% at 50% 0%, rgba(255,255,255,0.055) 0%, transparent 65%), rgba(255,255,255,0.08)',
  backdropFilter:       'blur(4px)',
  WebkitBackdropFilter: 'blur(4px)',
  border:               '1px solid rgba(255,255,255,0.14)',
  boxShadow:            '0 2px 24px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.13)',
}

export default function Home() {
  const featuredEvents = getFeaturedEvents()

  return (
    <main className="min-h-screen" style={{ background: '#f5f0eb' }}>
      <HeroSection />
      <TaglineSection />
      <PartnersRoller />
      <ShowcaseSection />
      <FeaturedEventsSection />
      {/* <CTASection /> */}
      <CommunityCTA />
    </main>
  );
}
