"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Lightbulb, Award, Users, TrendingUp,
  Globe, GraduationCap, ArrowRight,
  Rocket, Target, BookOpen, Star, Handshake, Zap,
} from "lucide-react";

// ─── Shared tokens ────────────────────────────────────────────────────────
const EASE   = [0.22, 1, 0.36, 1] as const;
const LIME   = "#bef264";
const CREAM  = "#f5f0eb";
const BLACK  = "#0a0a0a";

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, margin: "-60px" },
  transition:{ duration: 0.70, delay, ease: EASE },
});

const fadeIn = (delay = 0) => ({
  initial:    { opacity: 0 },
  whileInView:{ opacity: 1 },
  viewport:   { once: true, margin: "-60px" },
  transition: { duration: 0.60, delay, ease: EASE },
});

// ─── Section wrapper ─────────────────────────────────────────────────────
function Section({
  children, bg = CREAM, className = "",
}: { children: React.ReactNode; bg?: string; className?: string }) {
  return (
    <section style={{ background: bg }} className={className}>
      <div className="w-full px-10 lg:px-20 py-20 lg:py-28">
        {children}
      </div>
    </section>
  );
}

// ─── Label chip ───────────────────────────────────────────────────────────
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest"
      style={{ background: LIME, color: BLACK }}
    >
      {children}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: CREAM }}>

      {/* ══════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════ */}
      <section
        style={{
          background: BLACK,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      >
        <div className="w-full px-10 lg:px-20 pt-36 pb-28">
          <div className="max-w-5xl">

            <motion.div {...fadeUp(0.05)} className="mb-5">
              <Chip>About PALS</Chip>
            </motion.div>

            <motion.h1
              {...fadeUp(0.15)}
              className="font-black uppercase leading-none tracking-tight text-white"
              style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
            >
              Building the
              <br />
              <span style={{ color: LIME }}>Engineers</span>
              <br />
              of Tomorrow.
            </motion.h1>

            <motion.p
              {...fadeUp(0.28)}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.75,
                maxWidth: "600px",
                marginTop: "24px",
              }}
            >
              IIT alumni transforming engineering education —
              one institution at a time.
            </motion.p>

            <motion.div {...fadeUp(0.38)} className="flex gap-4 mt-10 flex-wrap">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full font-black uppercase text-[12px] tracking-widest px-6 py-3.5"
                style={{ background: LIME, color: BLACK, letterSpacing: "0.10em", transition: "filter 250ms ease" }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.08)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
              >
                Join the Movement <ArrowRight size={14} />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full font-black uppercase text-[12px] tracking-widest px-6 py-3.5"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.14)", letterSpacing: "0.10em", transition: "background 250ms ease" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              >
                Explore Initiatives
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 1 — OUR BEGINNING
          ══════════════════════════════════════════════ */}
      <Section bg={CREAM}>
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div>
            <motion.div {...fadeUp(0)} className="mb-4"><Chip>Origin</Chip></motion.div>
            <motion.h2
              {...fadeUp(0.08)}
              className="font-black uppercase leading-tight text-black"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.03em", marginBottom: "24px" }}
            >
              Our Beginning:
              <br />
              <span style={{ color: "#555" }}>The Gap We Exist to Close</span>
            </motion.h2>
            <motion.div {...fadeUp(0.16)} className="space-y-5">
              <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.8 }}>
                India&rsquo;s engineering education had a problem:{" "}
                <strong style={{ color: BLACK }}>brilliant theory, thin practice.</strong>{" "}
                Students graduated sharp — but not ready.
              </p>
              <p style={{ fontSize: "15px", color: "#444", lineHeight: 1.8 }}>
                PALS was built to bridge that divide. Conceived by IIT alumni, backed
                by the IIT Madras Alumni Trust — a mission to reshape how engineers are made.
              </p>
              <p style={{ fontSize: "13px", color: "#888", marginTop: "8px" }}>
                Since 2011 — transforming institutions across South India.
              </p>
            </motion.div>
          </div>

          {/* Right — quote block */}
          <motion.div {...fadeUp(0.22)}>
            <div
              style={{
                background: BLACK,
                borderRadius: "24px",
                padding: "40px 36px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Lime top strip */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "4px", background: LIME, borderRadius: "24px 24px 0 0" }} />
              <p
                className="font-black uppercase leading-tight text-white"
                style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.55rem)", letterSpacing: "-0.02em", marginBottom: "20px" }}
              >
                &ldquo;We don&rsquo;t just teach engineering — we build engineers who
                <span style={{ color: LIME }}> build the future.</span>&rdquo;
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.40)", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                PALS Club · BMSIT&M
              </p>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — VISION & MISSION
          ══════════════════════════════════════════════ */}
      <Section bg="#111114">
        <motion.div {...fadeUp(0)} className="mb-12 text-center">
          <Chip>Purpose</Chip>
          <h2
            className="font-black uppercase text-white mt-4"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}
          >
            Vision & Mission
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {[
            {
              icon: <Globe size={28} style={{ color: LIME }} />,
              label: "Our Vision",
              heading: "Engineers who don't just work — they create.",
              body: "Visionary, skilled, ready to shape tomorrow. A generation of engineers who lead industries, solve real problems, and build the future.",
              delay: 0.10,
            },
            {
              icon: <Target size={28} style={{ color: LIME }} />,
              label: "Our Mission",
              heading: "IIT knowledge reaching every campus.",
              body: "A platform where IIT knowledge reaches every campus. Where students become innovators, entrepreneurs, and leaders through experiential learning.",
              delay: 0.20,
            },
          ].map(card => (
            <motion.div key={card.label} {...fadeUp(card.delay)}>
              <div
                style={{
                  background: "#1a1a1e",
                  borderRadius: "22px",
                  padding: "36px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  height: "100%",
                }}
              >
                <div style={{ marginBottom: "20px" }}>{card.icon}</div>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#555", textTransform: "uppercase", marginBottom: "8px" }}>{card.label}</p>
                <h3 className="font-black text-white uppercase leading-tight" style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.02em", marginBottom: "14px" }}>
                  {card.heading}
                </h3>
                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.50)", lineHeight: 1.75 }}>{card.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — WHAT WE STAND FOR
          ══════════════════════════════════════════════ */}
      <Section bg={CREAM}>
        <motion.div {...fadeUp(0)} className="mb-12">
          <Chip>Principles</Chip>
          <h2
            className="font-black uppercase text-black mt-4"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}
          >
            What We Stand For
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { n: "01", icon: <Handshake size={20} />, title: "Industry–Academia Bridge",  body: "Stronger collaboration between industry leaders and academic institutions." },
            { n: "02", icon: <BookOpen  size={20} />, title: "Experiential Learning",     body: "Education beyond textbooks — hands-on, real-world, and project-driven." },
            { n: "03", icon: <Lightbulb size={20} />, title: "Innovation Culture",        body: "Fostering a mindset that sees problems as opportunities at every campus." },
            { n: "04", icon: <Rocket    size={20} />, title: "Entrepreneurial Mindset",   body: "Equipping every student with the drive and tools to build their own path." },
            { n: "05", icon: <TrendingUp size={20} />, title: "Future-Ready Engineers",  body: "Globally competitive graduates prepared for the challenges of tomorrow." },
            { n: "06", icon: <GraduationCap size={20}/>, title: "IIT Alumni Mentorship", body: "Direct access to IIT alumni networks, knowledge, and real-world guidance." },
          ].map((card, i) => (
            <motion.div key={card.n} {...fadeUp(i * 0.07)}>
              <StandCard {...card} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — OUR DNA
          ══════════════════════════════════════════════ */}
      <Section bg="#111114">
        <motion.div {...fadeUp(0)} className="mb-12 text-center">
          <Chip>Core Values</Chip>
          <h2 className="font-black uppercase text-white mt-4" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}>
            Our DNA
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: <Lightbulb size={22} />, value: "Innovation",    body: "Thinking different. Building what matters." },
            { icon: <Award     size={22} />, value: "Excellence",    body: "World-class standards — from curriculum to execution." },
            { icon: <Users     size={22} />, value: "Collaboration", body: "Academia, industry, alumni — united for growth." },
            { icon: <Zap       size={22} />, value: "Leadership",    body: "Creating individuals who inspire and drive change." },
          ].map((card, i) => (
            <motion.div key={card.value} {...fadeUp(i * 0.09)}>
              <div
                style={{
                  background: "#1a1a1e",
                  borderRadius: "20px",
                  padding: "28px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: LIME, display: "flex", alignItems: "center",
                    justifyContent: "center", color: BLACK, marginBottom: "18px",
                  }}
                >
                  {card.icon}
                </div>
                <h3 className="font-black uppercase text-white" style={{ fontSize: "14px", letterSpacing: "-0.01em", marginBottom: "8px" }}>
                  {card.value}
                </h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65 }}>{card.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ══════════════════════════════════════════════
          SECTION 5 — POWERED BY IIT
          ══════════════════════════════════════════════ */}
      <Section bg={CREAM}>
        <motion.div
          {...fadeUp(0)}
          style={{
            background: BLACK,
            borderRadius: "32px",
            padding: "clamp(48px, 8vw, 80px)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle lime glow */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(190,242,100,0.10) 0%, transparent 70%)",
          }} />

          <motion.div {...fadeIn(0.10)} className="relative z-10">
            <Chip>Heritage</Chip>
            <h2
              className="font-black uppercase text-white mt-6 leading-tight"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.5rem)", letterSpacing: "-0.03em", maxWidth: "700px", margin: "24px auto 0" }}
            >
              Powered by{" "}
              <span style={{ color: LIME }}>IIT Alumni</span>{" "}
              Excellence
            </h2>
            <p
              style={{
                fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
                color: "rgba(255,255,255,0.50)",
                lineHeight: 1.8,
                maxWidth: "560px",
                margin: "20px auto 0",
              }}
            >
              PALS carries the DNA of IIT Madras — technical excellence, research, innovation,
              and leadership — brought to engineering campuses across the nation.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full font-black uppercase text-[12px] tracking-widest px-7 py-4"
                style={{ background: LIME, color: BLACK, letterSpacing: "0.10em", transition: "filter 250ms ease" }}
                onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.08)")}
                onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
              >
                Join the Movement <ArrowRight size={14} />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full font-black uppercase text-[12px] tracking-widest px-7 py-4"
                style={{ background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.14)", letterSpacing: "0.10em", transition: "background 250ms ease" }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
              >
                Explore Initiatives
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </Section>

    </main>
  );
}

// ─── Stand card (What We Stand For) ──────────────────────────────────────
function StandCard({ n, icon, title, body }: { n: string; icon: React.ReactNode; title: string; body: string }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "24px",
        border: "1px solid #e8e8e8",
        boxShadow: "0 2px 10px rgba(0,0,0,0.055)",
        height: "100%",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = LIME;
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.10)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#e8e8e8";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 10px rgba(0,0,0,0.055)";
      }}
      style={{
        background: "#fff", borderRadius: "18px", padding: "24px",
        border: "1px solid #e8e8e8", boxShadow: "0 2px 10px rgba(0,0,0,0.055)",
        height: "100%", transition: "border-color 250ms ease, box-shadow 250ms ease",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div style={{ color: LIME }}>{icon}</div>
        <span style={{ fontSize: "11px", fontWeight: 900, color: "#d4d4d4", letterSpacing: "0.05em" }}>{n}</span>
      </div>
      <h4 style={{ fontSize: "13px", fontWeight: 900, color: BLACK, letterSpacing: "-0.01em", marginBottom: "8px", textTransform: "uppercase" }}>
        {title}
      </h4>
      <p style={{ fontSize: "12px", color: "#777", lineHeight: 1.65 }}>{body}</p>
    </div>
  );
}
