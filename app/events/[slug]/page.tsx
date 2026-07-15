"use client";

import { use, useRef } from "react";
import { notFound }    from "next/navigation";
import Link            from "next/link";
import { motion }      from "framer-motion";
import {
  ArrowLeft, MapPin, Calendar, Share2,
  ChevronDown, CheckCircle,
} from "lucide-react";
import { getEventById, getFeaturedEvents } from "@/data/events";
import { EventCard } from "@/components/event-card";

// ─── Tokens ───────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;
const LIME = "#bef264";
const BLACK = "#0a0a0a";

// ─── Status pill config ───────────────────────────────────────────────────
const STATUS: Record<string, { bg: string; color: string; label: string }> = {
  LIVE:     { bg: LIME,      color: BLACK, label: "Live Now"  },
  UPCOMING: { bg: "#1a1a1e", color: "#fff", label: "Upcoming" },
  PAST:     { bg: "#e5e7eb", color: "#333", label: "Past"     },
};

const CAT_LABEL: Record<string, string> = {
  conference: "Conference",
  workshop:   "Workshop",
  networking: "Networking",
  webinar:    "Webinar",
};

// ─── Date formatter ───────────────────────────────────────────────────────
function fmtFull(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
}

// ─── Share button ─────────────────────────────────────────────────────────
function ShareButton() {
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try { await navigator.share({ url }); } catch (_) { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };
  return (
    <button
      onClick={handleShare}
      aria-label="Share event"
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{
        width: "48px", height: "48px",
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.22)",
        backdropFilter: "blur(8px)",
        color: "#fff",
        cursor: "pointer",
        transition: "background 250ms ease",
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.20)")}
      onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
    >
      <Share2 size={18} strokeWidth={2} />
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
interface PageProps { params: Promise<{ slug: string }> }

export default function EventDetailPage({ params }: PageProps) {
  const { slug }   = use(params);
  const event      = getEventById(slug);
  if (!event) notFound();

  const detailRef  = useRef<HTMLDivElement>(null);
  const otherEvents = getFeaturedEvents().filter(e => e.id !== event.id).slice(0, 3);

  const st  = STATUS[event.status] ?? STATUS.UPCOMING;
  const cat = CAT_LABEL[event.category] ?? event.category;

  const scrollToDetail = () =>
    detailRef.current?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="min-h-screen" style={{ background: "#f5f0eb" }}>

      {/* ══════════════════════════════════════════════
          HERO — full-bleed image with overlays
          ══════════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          minHeight: "clamp(440px, 56vw, 620px)",
          borderRadius: "0 0 28px 28px",
        }}
      >
        {/* Background image */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, ease: EASE }}
        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.72)" }}
          />
        </motion.div>

        {/* Gradient overlays */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.12) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.30) 0%, transparent 55%)",
          }}
        />

        {/* Content */}
        <div
          className="relative z-10 flex flex-col justify-between h-full"
          style={{ minHeight: "clamp(440px, 56vw, 620px)", padding: "0" }}
        >
          {/* Top — back link */}
          <div className="w-full px-10 lg:px-20 pt-28">
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.10, ease: EASE }}
            >
              <Link
                href="/events"
                className="inline-flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase" }}
              >
                <ArrowLeft size={13} /> Back to Events
              </Link>
            </motion.div>
          </div>

          {/* Bottom — main hero content */}
          <div className="w-full px-10 lg:px-20 pb-10">

            {/* Status + category pills */}
            <motion.div
              className="flex items-center gap-2 mb-5 flex-wrap"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.20, ease: EASE }}
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wide"
                style={{ background: st.bg, color: st.color }}
              >
                {event.status === "LIVE" && (
                  <span className="block w-1.5 h-1.5 rounded-full bg-black animate-pulse flex-shrink-0" />
                )}
                {st.label}
              </span>
              <span
                className="inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wide"
                style={{ background: "rgba(255,255,255,0.15)", color: "#fff", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                {cat}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.70, delay: 0.28, ease: EASE }}
              className="text-white font-black uppercase leading-none tracking-tight mb-8"
              style={{ fontSize: "clamp(2.2rem, 6vw, 5rem)", maxWidth: "700px" }}
            >
              {event.title}
            </motion.h1>

            {/* Info row + CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row sm:items-end gap-6 flex-wrap"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.60, delay: 0.40, ease: EASE }}
            >
              {/* Location */}
              <div>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: "4px" }}>
                  Location
                </p>
                <span className="flex items-center gap-1.5 text-white" style={{ fontSize: "14px", fontWeight: 600 }}>
                  <MapPin size={14} style={{ color: LIME, flexShrink: 0 }} />
                  {event.mode === "Virtual" ? "Virtual Event" : event.location}
                </span>
              </div>

              {/* Divider */}
              <div className="hidden sm:block" style={{ width: "1px", height: "36px", background: "rgba(255,255,255,0.15)" }} />

              {/* Date & Time */}
              <div>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginBottom: "4px" }}>
                  Date & Time
                </p>
                <span className="flex items-center gap-1.5 text-white" style={{ fontSize: "14px", fontWeight: 600 }}>
                  <Calendar size={14} style={{ color: LIME, flexShrink: 0 }} />
                  <span>
                    {fmtFull(event.date)}
                    <span style={{ color: "rgba(255,255,255,0.55)", marginLeft: "8px", fontSize: "13px" }}>
                      {event.time}
                    </span>
                  </span>
                </span>
              </div>

              {/* Spacer */}
              <div className="flex-1 hidden sm:block" />

              {/* CTA buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={scrollToDetail}
                  className="inline-flex items-center gap-2 rounded-full font-black uppercase text-[12px] tracking-widest"
                  style={{
                    background: "#fff", color: BLACK,
                    padding: "13px 24px",
                    border: "none", cursor: "pointer",
                    letterSpacing: "0.10em",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.30)",
                    transition: "background 250ms ease",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f0f0f0")}
                  onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
                >
                  <ChevronDown size={15} strokeWidth={2.5} />
                  Explore Event
                </button>
                <ShareButton />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DETAIL SECTION
          ══════════════════════════════════════════════ */}
      <div ref={detailRef} className="w-full px-10 lg:px-20 py-16">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── Main ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.60, ease: EASE }}
            >
              <div style={{ background: "#fff", borderRadius: "20px", padding: "28px 32px", border: "1px solid #e8e8e8", boxShadow: "0 2px 10px rgba(0,0,0,0.055)" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 900, color: BLACK, letterSpacing: "-0.02em", marginBottom: "14px", textTransform: "uppercase" }}>
                  About This Event
                </h2>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.8 }}>{event.description}</p>

                <div style={{ borderTop: "1px solid #f0f0f0", marginTop: "20px", paddingTop: "20px" }}>
                  <h3 style={{ fontSize: "13px", fontWeight: 900, color: BLACK, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "12px" }}>
                    What You&rsquo;ll Get
                  </h3>
                  <ul className="space-y-2">
                    {[
                      "Industry insights from world-class experts",
                      "Hands-on experience with cutting-edge practices",
                      "Networking with fellow innovators",
                      "Exclusive resources and follow-up materials",
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2" style={{ fontSize: "13px", color: "#555" }}>
                        <CheckCircle size={14} style={{ color: LIME, flexShrink: 0, marginTop: "2px" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.60, delay: 0.08, ease: EASE }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Date",      value: fmtFull(event.date) },
                  { label: "Time",      value: event.time },
                  { label: "Location",  value: event.mode === "Virtual" ? "Virtual" : event.location },
                  { label: "Attendees", value: `${event.attendees.toLocaleString()}+` },
                ].map(c => (
                  <div key={c.label} style={{ background: "#fff", borderRadius: "14px", padding: "16px", border: "1px solid #e8e8e8" }}>
                    <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: "#aaa", textTransform: "uppercase", marginBottom: "6px" }}>{c.label}</p>
                    <p style={{ fontSize: "13px", fontWeight: 700, color: BLACK }}>{c.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* ── Sidebar ── */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.60, delay: 0.12, ease: EASE }}
          >
            <div className="sticky top-24 space-y-4">

              {/* Registration card */}
              <div style={{ background: BLACK, borderRadius: "20px", padding: "24px" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "rgba(255,255,255,0.40)", textTransform: "uppercase", marginBottom: "12px" }}>
                  Registration
                </p>
                <div className="space-y-2 mb-5" style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
                  <p><span style={{ color: "#fff", fontWeight: 600 }}>Status:</span> {event.status === "LIVE" ? "Open Now" : event.status === "UPCOMING" ? "Opening Soon" : "Closed"}</p>
                  <p><span style={{ color: "#fff", fontWeight: 600 }}>Mode:</span> {event.mode}</p>
                  <p><span style={{ color: "#fff", fontWeight: 600 }}>Fee:</span> Free for members</p>
                </div>

                <button
                  className="w-full rounded-full font-black uppercase text-[12px] tracking-widest py-3.5"
                  style={{ background: LIME, color: BLACK, border: "none", cursor: "pointer", letterSpacing: "0.10em", transition: "filter 250ms ease" }}
                  onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.08)")}
                  onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
                >
                  Register Now
                </button>

                <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "16px", paddingTop: "16px" }}>
                  <ShareButton />
                </div>
              </div>

              {/* Event details */}
              <div style={{ background: "#fff", borderRadius: "20px", padding: "20px", border: "1px solid #e8e8e8" }}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: "#aaa", textTransform: "uppercase", marginBottom: "12px" }}>
                  Event Details
                </p>
                {[
                  { label: "Category", value: cat },
                  { label: "Type",     value: "Club Event" },
                  { label: "Level",    value: "All Levels" },
                ].map(d => (
                  <div key={d.label} className="flex justify-between items-center py-2" style={{ borderTop: "1px solid #f0f0f0", fontSize: "12px" }}>
                    <span style={{ color: "#aaa" }}>{d.label}</span>
                    <span style={{ color: BLACK, fontWeight: 700 }}>{d.value}</span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>

        </div>

        {/* ── More Events ── */}
        {otherEvents.length > 0 && (
          <div className="mt-20">
            <h2 style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", fontWeight: 900, color: BLACK, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "20px" }}>
              More Events
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {otherEvents.map(e => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
          </div>
        )}
      </div>

    </main>
  );
}
