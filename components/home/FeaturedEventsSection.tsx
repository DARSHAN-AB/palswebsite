"use client";

import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { events } from "@/data/events";
import type { EventStatus } from "@/data/events";
import { useState } from "react";

// ─── Top 3 events only on homepage ───────────────────────────────────────
const HOMEPAGE_EVENTS = events.slice(0, 3);

// ─── Status badge config ──────────────────────────────────────────────────
const STATUS_CONFIG: Record<EventStatus, { label: string; dot: boolean }> = {
  LIVE:     { label: "LIVE",     dot: true  },
  PAST:     { label: "PAST",     dot: false },
  UPCOMING: { label: "UPCOMING", dot: false },
};

// ─── Date formatter → M/D/YYYY ────────────────────────────────────────────
function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${m}/${d}/${y}`;
}

// ─── Event card ───────────────────────────────────────────────────────────
function EventCard({
  event,
  index,
}: {
  event: (typeof events)[0];
  index: number;
}) {
  const [hov, setHov] = useState(false);
  const badge = STATUS_CONFIG[event.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="bg-white overflow-hidden cursor-pointer flex flex-col"
        style={{
          borderRadius: "18px",
          border:       "1px solid #e2e2e2",
          boxShadow:    hov
            ? "0 12px 36px rgba(0,0,0,0.11)"
            : "0 2px 10px rgba(0,0,0,0.055)",
          transition:   "box-shadow 300ms ease",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {/* ── Image ───────────────────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ height: "205px" }}>
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            style={{
              transform:  hov ? "scale(1.04)" : "scale(1)",
              transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          {/* Status badge — yellow pill with 2px black border */}
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-[5px] text-[10px] font-black tracking-[0.10em] uppercase"
              style={{
                background: "#F5C518",
                color:      "#000",
                border:     "2px solid #000",
                lineHeight: 1,
              }}
            >
              {badge.dot && (
                <span className="block w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse flex-shrink-0" />
              )}
              {badge.label}
            </span>
          </div>
        </div>

        {/* ── Body ────────────────────────────────────────────── */}
        <div className="px-5 pb-5 pt-4 flex flex-col gap-2.5 flex-1">

          {/* Title — bolder, tighter */}
          <h3
            className="uppercase leading-tight text-black"
            style={{ fontSize: "14px", fontWeight: 900, letterSpacing: "-0.01em" }}
          >
            {event.title}
          </h3>

          {/* Description — slightly darker */}
          <p className="text-[11.5px] leading-relaxed line-clamp-1" style={{ color: "#555" }}>
            {event.description}
          </p>

          {/* Dashed divider */}
          <div style={{ borderTop: "1.5px dashed #d8d8d8", marginTop: "2px" }} />

          {/* Date + mode — better contrast */}
          <div className="flex items-center justify-between" style={{ fontSize: "11px", color: "#444" }}>
            <span className="flex items-center gap-1.5">
              <Calendar size={11} style={{ color: "#666" }} />
              {fmtDate(event.date)}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={11} style={{ color: "#666" }} />
              {event.mode.toUpperCase()}
            </span>
          </div>

          {/* Dashed divider */}
          <div style={{ borderTop: "1.5px dashed #d8d8d8" }} />

          {/* Spacer pushes button to bottom */}
          <div className="flex-1" />

          {/* CTA button */}
          <ViewMissionButton slug={event.slug} />

        </div>
      </div>
    </motion.div>
  );
}

// ─── VIEW MISSION button ──────────────────────────────────────────────────
// Colors transition smoothly; arrow is ALWAYS yellow; button never moves.
function ViewMissionButton({ slug }: { slug: string }) {
  const [hov, setHov] = useState(false);

  return (
    <Link href={`/events/${slug}`}>
      <div
        className="w-full flex items-center justify-center gap-2 rounded-full py-3"
        style={{
          fontSize:      "11.5px",
          fontWeight:    900,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          background:    hov ? "#ffffff" : "#0a0a0a",
          color:         hov ? "#0a0a0a" : "#ffffff",
          border:        hov ? "1.5px solid #0a0a0a" : "1.5px solid transparent",
          // ── no transform, no scale, button is fully stationary ──
          transition:    "background 260ms ease, color 260ms ease, border-color 260ms ease",
          cursor:        "pointer",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        VIEW MISSION
        {/* Arrow is always yellow regardless of hover state */}
        <ArrowUpRight size={14} strokeWidth={2.5} style={{ color: "#F5C518", flexShrink: 0 }} />
      </div>
    </Link>
  );
}

// ─── Explore All button ───────────────────────────────────────────────────
function ExploreAllButton() {
  const [hov, setHov] = useState(false);

  return (
    <Link href="/events">
      <span
        className="inline-flex items-center gap-1.5 rounded-full px-5 py-2.5"
        style={{
          fontSize:      "11px",
          fontWeight:    900,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          background:    hov ? "#222" : "#0a0a0a",
          color:         "#fff",
          boxShadow:     hov ? "0 4px 16px rgba(0,0,0,0.22)" : "none",
          transform:     hov ? "scale(1.03)" : "scale(1)",
          transition:    "background 250ms ease, box-shadow 250ms ease, transform 250ms cubic-bezier(0.34,1.56,0.64,1)",
          cursor:        "pointer",
          whiteSpace:    "nowrap",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        EXPLORE_ALL
      </span>
    </Link>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────
export default function FeaturedEventsSection() {
  return (
    <section className="py-20 bg-transparent">
      <div className="w-full px-14 lg:px-28">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2
              className="uppercase leading-none text-black"
              style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.01em" }}
            >
              Event Activity
            </h2>
            <p
              className="mt-1.5 uppercase"
              style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", color: "#888" }}
            >
              Our Latest Highlights, Past &amp; Future
            </p>
          </div>
          <ExploreAllButton />
        </div>

        {/* Full-width divider */}
        <div className="w-full bg-black mb-8" style={{ height: "1.5px" }} />

        {/* 3-column grid — equal widths, equal height via items-stretch */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {HOMEPAGE_EVENTS.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
