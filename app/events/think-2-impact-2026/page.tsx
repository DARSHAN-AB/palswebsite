"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {useEffect, useState, useRef } from "react";
import {
  ArrowLeft, CalendarDays, Clock3, MapPin,
  Share2, ArrowDown, Trophy, ArrowRight, Mail,
} from "lucide-react";
import { getEventById } from "@/data/events";

const EASE = [0.22, 1, 0.36, 1] as const;
const LIME = "#bef264";
type EventStatus = "LIVE" | "PAST" | "UPCOMING";
const STATUS_CONFIG: Record<EventStatus, { label: string; dot: boolean; bg: string; color: string }> = {
  LIVE:     { label: "Live",     dot: true,  bg: "#F5C518", color: "#000" },
  UPCOMING: { label: "Upcoming", dot: false, bg: "#1a1a1e", color: "#fff" },
  PAST:     { label: "Past",     dot: false, bg: "#e5e7eb", color: "#333" },
};

const event = getEventById("think-2-impact-2026");
const eventStatus = (event?.status ?? "PAST") as EventStatus;
const eventStatusMeta = STATUS_CONFIG[eventStatus];


/* ── Countdown unit ─────────────────────────────────────────────────────── */
function CountUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span
        className="font-black tabular-nums leading-none"
        style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", color: "#fff", letterSpacing: "-0.03em" }}
      >
        {value}
      </span>
      <span style={{ fontSize: "8px", fontWeight: 700, color: "rgba(255,255,255,0.40)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

export default function Think2ImpactPage() {
  // Event End Date & Time
  // Format: YYYY-MM-DDTHH:mm:ss
  const eventDate = new Date("2026-05-21T18:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [isPast, setIsPast] = useState(eventStatus === "PAST");

  const detailRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();

      const difference = eventDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsPast(true);

        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });

        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
      );

      const seconds = Math.floor(
        (difference % (1000 * 60)) /
        1000
      );

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);

  }, []);
  return (
    <main style={{ background: "#f5f0eb" }}>

      {/* ════════════════════════════════════════
          HERO — unchanged from original
          ════════════════════════════════════════ */}
      <section className="relative h-[88vh] min-h-[720px] w-full overflow-hidden">

        <Image src="/hero.jpg" alt="Think 2 Impact 2026" fill priority className="object-cover" />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        <div className="relative z-20 flex h-full items-start lg:items-end">
          <div className="mx-auto w-full max-w-[1500px] px-10 pt-24 pb-40 lg:pt-0 lg:px-24 xl:px-32">

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/events" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/80 transition hover:text-lime-300">
                <ArrowLeft size={16} /> Back to Events
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8 flex flex-wrap gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black uppercase tracking-[0.08em]"
                style={{
                  background: eventStatusMeta.bg,
                  color: eventStatusMeta.color,
                }}
              >
                {eventStatusMeta.dot && (
                  <span className="block w-2 h-2 rounded-full bg-red-600 animate-pulse flex-shrink-0" />
                )}
                {eventStatusMeta.label}
              </span>
              <span className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-semibold uppercase text-white backdrop-blur-md">Hackathon</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="max-w-5xl text-6xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white lg:text-8xl"
            >
              Think 2<br />Impact 2026
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="my-10 h-px bg-white/20" />

            

            <motion.div
              initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="flex items-center gap-6 sm:gap-14 flex-wrap items-center">
                {[
                  { label: "Location", icon: <MapPin     size={20} className="text-lime-300" />, value: "BMSIT&M"     },
                  { label: "Date",     icon: <CalendarDays size={20} className="text-lime-300" />, value: "14 Mar 2026" },
                  { label: "Duration", icon: <Clock3     size={20} className="text-lime-300" />, value: "9 Hours (9AM to 6PM)"     },
                ].map(m => (
                  <div key={m.label} className="flex items-center gap-3 min-w-0">
                    <p className="mr-2 mb-0 text-[10px] uppercase tracking-[0.28em] text-white/60 hidden sm:block">{m.label}</p>
                    <div className="flex items-center gap-2 text-sm sm:text-2xl font-semibold text-white min-w-0">
                      <span className="flex-shrink-0">{m.icon}</span>
                      <span className="whitespace-normal break-words sm:truncate">{m.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="inline-flex items-center gap-3 rounded-full bg-white px-9 py-5 text-lg font-bold text-black transition hover:bg-lime-300">
                  Explore Event <ArrowDown size={20} />
                </button>
                <button className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-black">
                  <Share2 size={22} />
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          DETAIL SECTION
          ════════════════════════════════════════ */}
      <section className="w-full px-10 lg:px-24 xl:px-32" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <div ref={detailRef} className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 xl:gap-14 items-start">

            {/* ── LEFT ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.68, ease: EASE }}
              className="space-y-10"
            >
              {/* About block */}
              <div>
                <p className="font-black uppercase mb-5" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", letterSpacing: "-0.01em", color: "#0a0a0a" }}>
                  About the Event
                </p>
              </div>

              {/* Story block */}
              <div>
                <p className="font-black uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.20em", color: "#aaa" }}>
                  What Happened
                </p>
                <div className="space-y-5" style={{ maxWidth: "680px" }}>
                  {[
                    "Think2Impact 2026 was a 9-hour innovation-driven hackathon finale organized by PALS Club BMSIT&M in collaboration with the PALS Team.",
                    "Bringing together 138 participants across 40+ teams from Bengaluru, Tamil Nadu, and various regions of Karnataka, the event created a platform for students to transform ideas into impactful real-world solutions.",
                    "The hackathon featured both Hardware and Software tracks, encouraging interdisciplinary innovation, rapid prototyping, collaborative problem-solving, and entrepreneurial thinking. The event concluded with final pitching sessions, prototype demonstrations, keynote interactions, and networking opportunities with innovators and mentors.",
                  ].map((para, i) => (
                    <p key={i} style={{ fontSize: "16px", color: "#444", lineHeight: 1.85, textAlign: "justify" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* ── Timeline ──────────────────────────────── */}
              <div>
                <p className="font-black uppercase mb-8" style={{ fontSize: "10px", letterSpacing: "0.20em", color: "#aaa" }}>
                  Event Timeline
                </p>

                <div className="relative">
                  {/* Vertical line */}
                  <div
                    className="absolute top-0 bottom-0 left-[19px]"
                    style={{ width: "2px", background: "linear-gradient(to bottom, #bef264 0%, rgba(190,242,100,0.15) 100%)" }}
                  />

                  <div className="space-y-0">
                    {[
                      { n: "01", title: "Keynote Session",       body: "Setting the stage with industry-leading perspectives."                   },
                      { n: "02", title: "Prototype Demos",        body: "Live walkthroughs of working hardware and software builds."              },
                      { n: "03", title: "Final Pitches",          body: "Teams defending their work with conviction and clarity."                 },
                      { n: "04", title: "Networking Lounge",      body: "Builders, mentors, and judges trading ideas off-stage."                 },
                      { n: "05", title: "Jury Evaluation",        body: "Rigorous judging based on innovation, execution, and impact."            },
                      { n: "06", title: "Closing Celebrations",   body: "A fitting end to an intense day of building."                           },
                    ].map((item, i, arr) => (
                      <motion.div
                        key={item.n}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.50, delay: i * 0.07, ease: EASE }}
                        className="flex gap-6"
                        style={{ paddingBottom: i < arr.length - 1 ? "32px" : "0" }}
                      >
                        {/* Node */}
                        <div className="flex flex-col items-center flex-shrink-0" style={{ width: "40px" }}>
                          <div
                            className="flex items-center justify-center rounded-full font-black z-10"
                            style={{
                              width:      "40px",
                              height:     "40px",
                              background: "#0a0a0a",
                              border:     `2px solid ${LIME}`,
                              color:      LIME,
                              fontSize:   "11px",
                              letterSpacing: "0.04em",
                              flexShrink: 0,
                            }}
                          >
                            {item.n}
                          </div>
                        </div>

                        {/* Content */}
                        <div style={{ paddingTop: "8px" }}>
                          <h4 className="font-black" style={{ fontSize: "15px", color: "#0a0a0a", letterSpacing: "-0.01em", marginBottom: "4px" }}>
                            {item.title}
                          </h4>
                          <p style={{ fontSize: "13px", color: "#777", lineHeight: 1.65 }}>
                            {item.body}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT ────────────────────────────────── */}
            <div className="flex flex-col gap-5">

              {/* Card 1 — Registration Status */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.62, delay: 0.10, ease: EASE }}
                style={{
                  background:   "#0a0a0a",
                  borderRadius: "18px",
                  padding:      "26px 16px 22px",
                  minHeight:    "190px",
                  border:       `2px solid ${LIME}`,
                  boxShadow:    `0 0 0 1px rgba(190,242,100,0.15), 0 0 16px rgba(190,242,100,0.50), 0 0 48px rgba(190,242,100,0.25), inset 0 1px 0 rgba(190,242,100,0.12)`,
                }}
              >
                <p className="font-black uppercase text-center mb-5" style={{ fontSize: "10px", letterSpacing: "0.22em", color: LIME }}>
                  Registration Status
                </p>

                {/* Countdown numbers */}
                <div className="grid grid-cols-4 gap-1 mb-5">
                  <CountUnit value={timeLeft.days} label="Days" />
                  <CountUnit value={timeLeft.hours} label="Hrs" />
                  <CountUnit value={timeLeft.minutes} label="Min" />
                  <CountUnit value={timeLeft.seconds} label="Sec" />
                </div>

                <button
                  disabled={isPast}
                  className="w-full font-black uppercase rounded-xl py-3.5"
                  style={{
                    fontSize:      "12px",
                    letterSpacing: "0.12em",
                    background:    LIME,
                    color:         "#000",
                    border:        "none",
                    cursor:        isPast ? "default" : "pointer",
                  }}
                >
                  {isPast ? "Event Completed" : "Login to Register"}
                </button>
              </motion.div>

              {/* Card 2 — Developer Support */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.62, delay: 0.20, ease: EASE }}
                style={{
                  background:   "#0a0a0a",
                  borderRadius: "18px",
                  padding:      "16px",
                  border:       `1px solid rgba(190,242,100,0.18)`,
                  boxShadow:    "0 8px 24px rgba(0,0,0,0.16)",
                }}
              >
                <div className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10" style={{ color: LIME }}>
                    <Mail size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-black uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em", color: LIME }}>
                      Need Help?
                    </p>
                    <p className="mt-1 text-[11px] leading-5" style={{ color: "rgba(255,255,255,0.72)" }}>
                      Facing any issues with event registration or the website? Feel free to contact the developer.
                    </p>
                    <p className="mt-2 text-[11px] font-semibold" style={{ color: "rgba(255,255,255,0.92)" }}>
                      Darshan A B
                    </p>
                    <a
                      href="mailto:24ug1byai417@bmsit.in"
                      className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold transition-colors"
                      style={{ color: "#fff", transition: "color 200ms ease" }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = LIME; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "#fff"; }}
                    >
                      <Mail size={12} />
                      24ug1byai417@bmsit.in
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Card 3 — Rewards (lime, matches reference) */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.62, delay: 0.24, ease: EASE }}
                style={{
                  background:   LIME,
                  borderRadius: "18px",
                  padding:      "16px",
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-5">
                  <Trophy size={16} style={{ color: "#000" }} />
                  <p className="font-black uppercase" style={{ fontSize: "13px", letterSpacing: "0.14em", color: "#000" }}>
                    Rewards
                  </p>
                </div>

                {/* Prize rows */}
                <div className="space-y-0">
                  {[
                    { place: "#1 Winner Prize",      amount: "15000" },
                    { place: "#2 First Runner Up",   amount: "10000" },
                    { place: "#3 Second Runner Up",  amount: "5000"  },
                  ].map((prize, i, arr) => (
                    <div
                      key={prize.place}
                      className="flex items-center justify-between py-3"
                      style={{
                        borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.12)" : "none",
                      }}
                    >
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(0,0,0,0.50)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                        {prize.place}
                      </span>
                      <span className="font-black" style={{ fontSize: "18px", color: "#000", letterSpacing: "-0.03em" }}>
                        {prize.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          BY THE NUMBERS
          ════════════════════════════════════════ */}
      <section style={{ background: "#f5f0eb", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[900px] mx-auto px-10 lg:px-24 xl:px-32">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="text-center mb-12"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ border: "1px solid rgba(0,0,0,0.12)", background: "rgba(0,0,0,0.05)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#555" }}
            >
              By the Numbers
            </span>
            <h2 className="font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.03em", color: "#0a0a0a" }}>
              The day in{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400, fontFamily: "Georgia, serif", color: "#333" }}>numbers</span>
            </h2>
          </motion.div>

          {/* Stat cards grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: "👥", value: "138", label: "Innovators"    },
              { icon: "🎯", value: "40+", label: "Teams"         },
              { icon: "⏱",  value: "9",   label: "Hours of Code" },
              { icon: "🔲", value: "2",   label: "Tracks"        },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                style={{ background: "#fff", borderRadius: "16px", padding: "22px 20px", border: "1px solid #e8e8e8", boxShadow: "0 2px 10px rgba(0,0,0,0.055)" }}
              >
                <div style={{ fontSize: "20px", marginBottom: "10px" }}>{s.icon}</div>
                <p className="font-black leading-none mb-1.5" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", letterSpacing: "-0.04em", color: "#0a0a0a" }}>
                  {s.value}
                </p>
                <p style={{ fontSize: "9px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.18em" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Participations from banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.55, delay: 0.30, ease: EASE }}
            style={{
              borderRadius: "16px",
              padding: "22px 24px",
              background: "#fff",
              border: "1px solid #bef264",
            }}
          >
            <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.20em", textTransform: "uppercase", color: LIME, marginBottom: "8px" }}>
              Participations From
            </p>
            <p className="font-black text-black" style={{ fontSize: "clamp(1rem, 2.2vw, 1.3rem)", letterSpacing: "-0.01em" }}>
              Bengaluru · Chennai · Different parts of Karnataka
            </p>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          TWO TRACKS · ONE STAGE
          ════════════════════════════════════════ */}
      <section style={{ background: "#0d0d0d", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[900px] mx-auto px-10 lg:px-24 xl:px-32">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE }}
            className="text-center mb-12"
          >
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6"
              style={{ border: "1px solid rgba(190,242,100,0.30)", background: "rgba(190,242,100,0.06)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: LIME }}
            >
              Two Tracks · One Stage
            </span>
            <h2 className="font-black text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.03em" }}>
              Built across{" "}
              <span style={{ fontStyle: "italic", fontWeight: 400, fontFamily: "Georgia, serif" }}>disciplines</span>
            </h2>
          </motion.div>

          {/* Track cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                track:  "Track 01",
                title:  "Hardware",
                desc:   "Physical prototypes, embedded systems, IoT solutions, and tangible innovations built from the ground up.",
                tags:   ["Prototyping", "IoT", "Embedded", "Robotics"],
                accent: "#b45309",   // amber
                icon:   "🔲",
                delay:  0.10,
              },
              {
                track:  "Track 02",
                title:  "Software",
                desc:   "Full-stack apps, AI-driven tools, intelligent systems, and digital experiences crafted in real time.",
                tags:   ["Web Apps", "AI/ML", "Mobile", "APIs"],
                accent: "#7c3aed",   // violet
                icon:   "</>",
                delay:  0.22,
              },
            ].map(t => (
              <motion.div
                key={t.track}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.60, delay: t.delay, ease: EASE }}
                style={{
                  background:   "#161616",
                  borderRadius: "20px",
                  padding:      "28px",
                  border:       "1px solid rgba(255,255,255,0.06)",
                  position:     "relative",
                  overflow:     "hidden",
                }}
              >
                {/* Subtle accent glow */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(circle at 20% 20%, ${t.accent}22 0%, transparent 60%)`, pointerEvents: "none" }} />

                {/* Top row */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div
                    className="flex items-center justify-center rounded-xl text-white font-black"
                    style={{ width: "40px", height: "40px", background: `${t.accent}40`, border: `1px solid ${t.accent}60`, fontSize: t.icon === "≤/>" ? "11px" : "18px" }}
                  >
                    {t.icon}
                  </div>
                  <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: `${t.accent}dd` }}>
                    {t.track}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="font-black text-white mb-3 relative z-10"
                  style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", letterSpacing: "-0.03em" }}
                >
                  {t.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "20px" }} className="relative z-10">
                  {t.desc}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  {t.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        background:   "rgba(255,255,255,0.07)",
                        border:       "1px solid rgba(255,255,255,0.10)",
                        borderRadius: "9999px",
                        padding:      "4px 10px",
                        fontSize:     "9px",
                        fontWeight:   700,
                        color:        "rgba(255,255,255,0.65)",
                        letterSpacing:"0.10em",
                        textTransform:"uppercase",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════
          WHAT'S NEXT
          ════════════════════════════════════════ */}
      <WhatsNext />

    </main>
  );
}

// ─── What's Next section ─────────────────────────────────────────────────
function WhatsNext() {
  const [hov, setHov] = useState(false);

  return (
    <section style={{ background: "#f5f0eb", paddingTop: "80px", paddingBottom: "100px" }}>
      <div className="max-w-[900px] mx-auto px-10 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.68, ease: EASE }}
          className="text-center"
          style={{ maxWidth: "620px", margin: "0 auto" }}
        >
          {/* Eyebrow */}
          <p
            className="font-black uppercase mb-5"
            style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#aaa" }}
          >
            What's Next
          </p>

          {/* Heading */}
          <h2
            className="font-black leading-tight mb-6"
            style={{
              fontSize:      "clamp(1.8rem, 4vw, 2.8rem)",
              letterSpacing: "-0.03em",
              color:         "#0a0a0a",
            }}
          >
            More than a hackathon
          </h2>

          {/* Body */}
          <div className="space-y-4 mb-10">
            <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.8 }}>
              Think2Impact is a platform for innovators, creators, and
              problem-solvers to collaborate and build impactful solutions
              for real-world challenges.
            </p>
            <p style={{ fontSize: "16px", color: "#555", lineHeight: 1.8 }}>
              With the success of Think2Impact 2026, PALS Club BMSIT&M
              looks forward to expanding the next edition with larger
              participation, stronger industry collaboration, and even
              bigger innovation opportunities.
            </p>
          </div>

          {/* CTA button — white → lime on hover, arrow turns right */}
          <Link href="/events">
            <button
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              className="inline-flex items-center gap-3 rounded-full font-bold"
              style={{
                fontSize:      "14px",
                letterSpacing: "0.04em",
                padding:       "14px 28px",
                background:    hov ? LIME : "#fff",
                color:         "#000",
                border:        "2px solid #0a0a0a",
                cursor:        "pointer",
                transition:    "background 280ms ease",
              }}
            >
              Explore More Events
              <span
                style={{
                  display:    "inline-flex",
                  transform:  hov ? "rotate(0deg)" : "rotate(-45deg)",
                  transition: "transform 280ms cubic-bezier(0.34,1.56,0.64,1)",
                }}
              >
                <ArrowRight size={17} strokeWidth={2.5} />
              </span>
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
