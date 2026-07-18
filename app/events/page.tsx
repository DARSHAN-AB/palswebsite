"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { events } from "@/data/events";
import type { EventStatus } from "@/data/events";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// ─── Easing ───────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Filter pill config ───────────────────────────────────────────────────
type FilterKey = "ALL" | EventStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "ALL",      label: "ALL EVENTS" },
  { key: "LIVE",     label: "LIVE"       },
  { key: "UPCOMING", label: "UPCOMING"   },
  { key: "PAST",     label: "PAST"       },
];

// ─── Date formatter ───────────────────────────────────────────────────────
function fmtDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${m}/${d}/${y}`;
}


export default function EventsPage() {
  const [query,  setQuery]  = useState("");
  const [filter, setFilter] = useState<FilterKey>("ALL");

  // Real-time filter + search
  const filtered = useMemo(() => {
    return events.filter(ev => {
      const matchStatus = filter === "ALL" || ev.status === filter;
      const q = query.toLowerCase();
      const matchSearch =
        !q ||
        ev.title.toLowerCase().includes(q) ||
        ev.description.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q) ||
        ev.mode.toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [query, filter]);

  return (
    <main className="min-h-screen" style={{ background: "#f5f0eb" }}>

      {/* ── Page padding matches the rest of the site ─────────────── */}
      <div className="w-full px-6 sm:px-10 lg:px-24 pt-28 sm:pt-32 pb-16">

        {/* ══════════════════════════════════════════════════
            HERO — black capsule
            ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: EASE }}
          className="relative overflow-visible sm:overflow-hidden flex flex-col"
          style={{
            background:   "#000",
            borderRadius: "28px",
            minHeight:    "415px",
            padding:      "48px 52px",
            marginBottom: "20px",
          }}
        >
          {/* Subtle radial gradient for depth */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 65% 70% at 50% 50%, rgba(40,40,40,0.60) 0%, transparent 70%)",
            }}
          />

          {/* ── Left content ─────────────────────────────── */}
          <div className="relative z-10 mt-auto">

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
              className="mb-6"
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black tracking-wide uppercase"
                style={{ background: "#bef264", color: "#000" }}
              >
                <span className="block w-1.5 h-1.5 rounded-full bg-black" />
                Live Schedule
              </span>
            </motion.div>

            {/* Hero heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              <h1
                className="font-black uppercase leading-none tracking-tight"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
              >
                <span className="text-white block">Global</span>
                <span
                  className="block"
                  style={{
                    background:
                      "linear-gradient(90deg, #d946ef 0%, #a855f7 50%, #ec4899 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Exhibitions.
                </span>
              </h1>
            </motion.div>
          </div>

          {/* ── Right quote card ─────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.68, delay: 0.38, ease: EASE }}
            className="absolute right-10 bottom-10 hidden lg:block"
            style={{ maxWidth: "260px" }}
          >
            <div
              style={{
                background:   "rgba(45,45,45,0.95)",
                borderRadius: "16px",
                padding:      "20px 22px",
                boxShadow:    "0 8px 32px rgba(0,0,0,0.50)",
              }}
            >
              <p
                style={{
                  fontSize:   "12px",
                  color:      "rgba(255,255,255,0.80)",
                  lineHeight: 1.65,
                  fontStyle:  "italic",
                }}
              >
                &ldquo;Events are the new retail. We curate the best popup
                experiences, art shows, and music festivals.&rdquo;
              </p>
            </div>
          </motion.div>

        </motion.div>

        {/* ══════════════════════════════════════════════════
            SEARCH + FILTER BAR
            ══════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 mb-10"
          style={{
            background:   "#fff",
            borderRadius: "24px",
            padding:      "12px 16px",
            boxShadow:    "0 2px 18px rgba(0,0,0,0.07)",
            border:       "1px solid #ececec",
          }}
        >
          {/* ── Search input pill ── */}
          <div
            className="flex items-center gap-3 w-full lg:flex-1"
            style={{
              background:   "#f5f5f7",
              borderRadius: "9999px",
              padding:      "10px 20px",
              minHeight:    "46px",
            }}
          >
            <Search size={18} style={{ color: "#aaa", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Find your next experience..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              style={{
                fontSize:          "15px",
                fontWeight:        500,
                color:             "#111",
                border:            "none",
                caretColor:        "#111",
              }}
            />
          </div>

          {/* ── Filter pills ── */}
          <div className="flex items-center gap-1.5 flex-wrap justify-start lg:justify-end">
            {FILTERS.map(f => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    borderRadius: "9999px",
                    padding:      "10px 18px",
                    fontSize:     "11.5px",
                    fontWeight:   700,
                    letterSpacing:"0.07em",
                    cursor:       "pointer",
                    transition:   "background 200ms ease, color 200ms ease, border-color 200ms ease",
                    background:   active ? "#0a0a0a" : "transparent",
                    color:        active ? "#fff"    : "#888",
                    border:       active ? "1.5px solid transparent" : "1.5px solid #e0e0e0",
                    whiteSpace:   "nowrap",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════
            EVENTS GRID
            ══════════════════════════════════════════════════ */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((event, i) => (
              <EventCard key={event.id} event={event} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-[14px] font-semibold text-gray-400">
              No events match your search.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}

// ─── Event card — matches reference layout ────────────────────────────────
function EventCard({ event, index }: { event: typeof events[0]; index: number }) {
  const [imgHov, setImgHov] = useState(false);
  const [cardHov, setCardHov] = useState(false);

  // Status pill style
  const statusStyle: Record<EventStatus, { bg: string; color: string }> = {
    LIVE:     { bg: "#bef264", color: "#000" },
    UPCOMING: { bg: "#60a5fa", color: "#000" },
    PAST:     { bg: "#e5e7eb", color: "#333" },
  };
  const st = statusStyle[event.status];

  // Category label from event.category
  const catLabel = event.category.toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: EASE }}
    >
      <Link href={`/events/${event.slug}`} style={{ display: "block" }}>
      <div
        className="bg-white overflow-hidden flex flex-col cursor-pointer"
        style={{
          borderRadius: "20px",
          border:       "1px solid #e8e8e8",
          boxShadow:    cardHov ? "0 16px 40px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
          transform:    cardHov ? "translateY(-6px)" : "translateY(0)",
          transition:   "box-shadow 300ms ease, transform 300ms ease",
        }}
        onMouseEnter={() => setCardHov(true)}
        onMouseLeave={() => setCardHov(false)}
      >
        {/* ── Image — 60% card height ── */}
        <div
          className="relative overflow-hidden flex-shrink-0"
          style={{
            height:        "268px",
            borderRadius:  "20px 20px 0 0",
          }}
          onMouseEnter={() => setImgHov(true)}
          onMouseLeave={() => setImgHov(false)}        >
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
            style={{
              transform:  cardHov ? "scale(1.04) translateY(-2px)" : "scale(1) translateY(0)",
              transition: "transform 380ms cubic-bezier(0.22,1,0.36,1)",
            }}
          />

          {/* Status + category pills — top-left */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide"
              style={{ background: st.bg, color: st.color }}
            >
              {event.status === "LIVE" && (
                <span className="block w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
              )}
              {event.status}
            </span>
            <span
              className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide"
              style={{ background: "#0a0a0a", color: "#fff" }}
            >
              {catLabel}
            </span>
          </div>
        </div>

        {/* ── Content — ~40% ── */}
        <div className="px-5 pt-4 pb-5 flex flex-col flex-1">

          {/* Date / location row */}
          <div
            className="flex items-center gap-2 mb-3"
            style={{ fontSize: "10px", color: "#aaa", fontWeight: 500 }}
          >
            <span style={{ color: "#ccc" }}>◎</span>
            <span>TBA</span>
            <span style={{ color: "#ddd" }}>·</span>
            <span>{fmtDate(event.date)}</span>
          </div>

          {/* Title */}
          <h3
            className="text-black leading-tight mb-1.5"
            style={{ fontSize: "16px", fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            {event.title}
          </h3>

          {/* Description */}
          <p
            className="line-clamp-2 mb-4"
            style={{ fontSize: "11px", color: "#888", lineHeight: 1.5 }}
          >
            {event.description}
          </p>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #f0f0f0", marginBottom: "14px" }} />

          {/* Bottom row: 3 decorative dots + circle arrow */}
          <div className="flex items-center justify-between mt-auto">

            {/* Decorative dots */}
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block rounded-full"
                  style={{ width: "10px", height: "10px", background: "#e8e8e8" }}
                />
              ))}
            </div>

            {/* Circle arrow button */}
            <CircleArrow cardHov={cardHov} />

          </div>
        </div>
      </div>
      </Link>
    </motion.div>
  );
}

// ─── Circular arrow button ────────────────────────────────────────────────
function CircleArrow({ cardHov }: { cardHov: boolean }) {
  const [hov, setHov] = useState(false);
  const active = hov || cardHov;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width:          "36px",
        height:         "36px",
        borderRadius:   "50%",
        background:     active ? "#bef264" : "#0a0a0a",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        transform:      hov ? "scale(1.10)" : "scale(1)",
        transition:     "transform 250ms cubic-bezier(0.34,1.56,0.64,1), background 250ms ease",
        cursor:         "pointer",
        flexShrink:     0,
      }}
    >
      <ArrowUpRight size={15} strokeWidth={2.5} style={{ color: active ? "#000" : "#fff" }} />    </div>
  );
}
