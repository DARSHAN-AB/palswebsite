'use client'

import HeroSection from "@/components/home/HeroSection";
import TaglineSection from "@/components/home/TaglineSection";
import ShowcaseSection from "@/components/home/ShowcaseSection";
import PartnersRoller from "@/components/home/PartnersRoller";
import FeaturedEventsSection from "@/components/home/FeaturedEventsSection";
import CommunityCTA from "@/components/home/CommunityCTA";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: '#f5f0eb' }}>
      <HeroSection />
      <TaglineSection />
      <PartnersRoller />
      <ShowcaseSection />
      <FeaturedEventsSection />
      <CommunityCTA />
    </main>
  );
}
