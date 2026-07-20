"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ArrowUpRight, Pin, Bell } from "lucide-react";
import { events } from "@/data/events";

// ─── Design tokens (same as Events page) ─────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Data ─────────────────────────────────────────────────────────────────
type Tag = "Hackathon" | "Membership" | "Workshop" | "Visit" | "Recap" | "General";

interface Announcement {
  id:      number;
  title:   string;
  date:    string;
  tag:     Tag;
  pinned:  boolean;
  body:    string;
  href:    string;
}

const formatAnnouncementDate = (value: Date) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "2-digit", month: "short" }).format(value);

const formatEventDate = (value: Date) =>
  new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(value);

const TODAY = new Date(2026, 6, 20);

const getEventBySlug = (slug: string) => events.find((event) => event.slug === slug);

const buildAnnouncements = (): Announcement[] => {
  const think2Impact = getEventBySlug("think-2-impact-2026");
  const impromptu = getEventBySlug("impromptu-prompt-league");

  const toDate = (value: string) => {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const announcements: Announcement[] = [];

  if (think2Impact) {
    const thinkDate = toDate(think2Impact.date);

    const announcementDate = new Date(thinkDate);
    announcementDate.setMonth(announcementDate.getMonth() - 1);

    announcements.push({
      id: 1,
      title: `${think2Impact.title} Registration Window Closed`,
      date: formatAnnouncementDate(announcementDate),
      tag: "Recap",
      pinned: false,
      body: `Registration for ${think2Impact.title} has now closed. Thank you to everyone who made the event a success.\nEvent date: ${formatEventDate(thinkDate)}.`,
      href: `/events/${think2Impact.slug}`,
    });

    announcements.push({
      id: 4,
      title: `${think2Impact.title} Gallery is Live`,
      date: formatAnnouncementDate(announcementDate),
      tag: "Recap",
      pinned: false,
      body: `Photographs from ${think2Impact.title} have now been uploaded to the website gallery and students can visit the Gallery page to relive the event highlights.\nEvent date: ${formatEventDate(thinkDate)}.`,
      href: "/gallery",
    });
  }

  if (impromptu) {
    const impromptuDate = toDate(impromptu.date);
    const announcementDate = new Date(impromptuDate);
    announcementDate.setDate(announcementDate.getDate() - 14);

    announcements.push({
      id: 2,
      title: "Official Launch of PALS Club BMSIT&M",
      date: formatAnnouncementDate(TODAY),
      tag: "General",
      pinned: true,
      body: `PALS Club BMSIT&M officially launches alongside ${impromptu.title}, welcoming students into the innovation community and introducing upcoming hackathons, workshops, and technical events.\nEvent date: ${formatEventDate(impromptuDate)}.`,
      href: `/events/${impromptu.slug}`,
    });

    announcements.push({
      id: 3,
      title: `${impromptu.title} Registrations are Live!`,
      date: formatAnnouncementDate(TODAY),
      tag: "Hackathon",
      pinned: true,
      body: `Registrations for ${impromptu.title} are now open and students are encouraged to register before the deadline. Seats are limited. ${impromptu.description}\nEvent date: ${formatEventDate(impromptuDate)}.`,
      href: `/events/${impromptu.slug}`,
    });
  }

  return announcements;
};

const ANNOUNCEMENTS: Announcement[] = buildAnnouncements();

// ─── Filter keys ──────────────────────────────────────────────────────────
type FilterKey = "ALL" | Tag;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "ALL",       label: "ALL"       },
  { key: "Hackathon", label: "EVENTS"    },
  { key: "Workshop",  label: "WORKSHOPS" },
  { key: "Recap",     label: "RESULTS"   },
  { key: "General",   label: "GENERAL"   },
];

// ─── Tag badge styles ─────────────────────────────────────────────────────
const TAG_STYLE: Record<Tag, { bg: string; color: string }> = {
  Hackathon:  { bg: "#0a0a0a", color: "#bef264" },
  Membership: { bg: "#0a0a0a", color: "#93c5fd" },
  Workshop:   { bg: "#0a0a0a", color: "#fff"    },
  Visit:      { bg: "#0a0a0a", color: "#86efac" },
  Recap:      { bg: "#e5e7eb", color: "#333"    },
  General:    { bg: "#e5e7eb", color: "#333"    },
};

// ─── Circular arrow button (same as Events cards) ─────────────────────────
function CircleArrow({ cardHov, href }: { cardHov: boolean; href: string }) {
  const [hov, setHov] = useState(false);
  const active = hov || cardHov;
  return (
    <Link
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "34px", height: "34px",
        borderRadius: "50%",
        background:   active ? "#bef264" : "#0a0a0a",
        display: "flex", alignItems: "center", justifyContent: "center",
        transform:  hov ? "scale(1.10)" : "scale(1)",
        transition: "transform 250ms cubic-bezier(0.34,1.56,0.64,1), background 250ms ease",
        cursor: "pointer", flexShrink: 0,
      }}
    >
      <ArrowUpRight size={14} strokeWidth={2.5} style={{ color: active ? "#000" : "#fff" }} />
    </Link>
  );
}

// ─── Featured card (pinned, full-width) ───────────────────────────────────
function FeaturedCard({ a, index }: { a: Announcement; index: number }) {
  const [cardHov, setCardHov] = useState(false);
  const ts = TAG_STYLE[a.tag];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
    >
      <div
        className="bg-white flex flex-col sm:flex-row gap-6 p-6 sm:p-8"
        style={{
          borderRadius: "20px",
          border:       cardHov ? "1px solid #d4d4d4" : "1px solid #e8e8e8",
          boxShadow:    cardHov ? "0 8px 28px rgba(0,0,0,0.10)" : "0 2px 10px rgba(0,0,0,0.055)",
          transition:   "box-shadow 300ms ease, border-color 300ms ease",
        }}
        onMouseEnter={() => setCardHov(true)}
        onMouseLeave={() => setCardHov(false)}
      >
        {/* Left accent bar */}
        <div
          className="hidden sm:block flex-shrink-0"
          style={{ width: "4px", borderRadius: "9999px", background: "#bef264" }}
        />

        <div className="flex flex-col flex-1 gap-3">
          {/* Top row */}
          <div className="flex items-center gap-2 flex-wrap">
            <Pin size={12} style={{ color: "#bef264" }} />
            <span
              className="rounded-full px-2.5 py-[4px] text-[10px] font-black uppercase tracking-wide"
              style={{ background: ts.bg, color: ts.color }}
            >
              {a.tag}
            </span>
            <span style={{ fontSize: "11px", color: "#aaa" }}>{a.date}</span>
            <span
              className="rounded-full px-2 py-[3px] text-[9px] font-black uppercase tracking-wide"
              style={{ background: "#bef264", color: "#000" }}
            >
              Pinned
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-black leading-tight"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.25rem)", fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            {a.title}
          </h2>

          {/* Body */}
          <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.65, whiteSpace: "pre-line" }}>{a.body}</p>

          {/* Bottom */}
          <div className="flex items-center justify-between mt-1">
            <span style={{ fontSize: "11px", color: "#bbb" }}>
              Posted by <span style={{ color: "#555", fontWeight: 600 }}>PALS Club</span>
            </span>
            <CircleArrow cardHov={cardHov} href={a.href} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Regular card ─────────────────────────────────────────────────────────
function AnnouncementCard({ a, index }: { a: Announcement; index: number }) {
  const [cardHov, setCardHov] = useState(false);
  const ts = TAG_STYLE[a.tag];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.50, delay: index * 0.07, ease: EASE }}
    >
      <div
        className="bg-white flex flex-col overflow-hidden"
        style={{
          borderRadius: "18px",
          border:       cardHov ? "1px solid #d4d4d4" : "1px solid #e8e8e8",
          boxShadow:    cardHov ? "0 8px 28px rgba(0,0,0,0.10)" : "0 2px 10px rgba(0,0,0,0.055)",
          transition:   "box-shadow 300ms ease, border-color 300ms ease",
        }}
        onMouseEnter={() => setCardHov(true)}
        onMouseLeave={() => setCardHov(false)}
      >
        {/* Lime top strip */}
        <div style={{ height: "3px", background: a.pinned ? "#bef264" : "#e8e8e8" }} />

        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Tag + date */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="rounded-full px-2.5 py-[4px] text-[10px] font-black uppercase tracking-wide"
              style={{ background: ts.bg, color: ts.color }}
            >
              {a.tag}
            </span>
            <span style={{ fontSize: "11px", color: "#bbb" }}>{a.date}</span>
          </div>

          {/* Title */}
          <h3
            className="text-black leading-snug"
            style={{ fontSize: "14px", fontWeight: 900, letterSpacing: "-0.01em" }}
          >
            {a.title}
          </h3>

          {/* Body */}
          <p
            className="line-clamp-2"
            style={{ fontSize: "12px", color: "#777", lineHeight: 1.6, whiteSpace: "pre-line" }}
          >
            {a.body}
          </p>

          {/* Divider */}
          <div style={{ borderTop: "1px solid #f0f0f0" }} />

          {/* Footer */}
          <div className="flex items-center justify-between">
            <span style={{ fontSize: "11px", color: "#bbb" }}>
              <span style={{ color: "#555", fontWeight: 600 }}>PALS Club</span>
            </span>
            <CircleArrow cardHov={cardHov} href={a.href} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function AnnouncementsPage() {
  const [query,  setQuery]  = useState("");
  const [filter, setFilter] = useState<FilterKey>("ALL");

  const featured = ANNOUNCEMENTS.filter(a => a.pinned);
  const regular  = ANNOUNCEMENTS.filter(a => !a.pinned);

  const filtered = useMemo(() => {
    const pool = filter === "ALL" ? regular : regular.filter(a => {
      if (filter === "Hackathon") return a.tag === "Hackathon";
      if (filter === "Workshop")  return a.tag === "Workshop";
      if (filter === "Recap")     return a.tag === "Recap";
      if (filter === "General")   return a.tag === "General" || a.tag === "Visit" || a.tag === "Membership";
      return true;
    });
    if (!query.trim()) return pool;
    const q = query.toLowerCase();
    return pool.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.body.toLowerCase().includes(q)  ||
      a.tag.toLowerCase().includes(q)
    );
  }, [filter, query, regular]);

  return (
    <main className="min-h-screen" style={{ background: "#f5f0eb" }}>
      <div className="w-full px-6 sm:px-10 lg:px-24 pt-28 sm:pt-32 pb-16">

        {/* ══════════════════════════════════════
            HERO — mirrors Events page
            ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: EASE }}
          className="relative overflow-visible sm:overflow-hidden flex flex-col"
          style={{
            background: "#000",
            borderRadius: "28px",
            minHeight: "350px",
            padding: "48px 52px",
            marginBottom: "20px",
          }}
        >
          {/* Radial depth */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 65% 70% at 50% 50%, rgba(40,40,40,0.60) 0%, transparent 70%)",
          }} />

          {/* Left content */}
          <div className="relative z-10 mt-auto">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
              className="mb-5"
            >
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-black tracking-wide uppercase"
                style={{ background: "#bef264", color: "#000" }}
              >
                <Bell size={10} />
                Latest Updates
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: EASE }}
            >
              <h1
                className="font-black uppercase leading-none tracking-tight"
                style={{ fontSize: "clamp(3rem, 7vw, 5rem)" }}
              >
                <span className="text-white block">Stay</span>
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(90deg, #bef264 0%, #86efac 50%, #34d399 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Informed.
                </span>
              </h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", marginTop: "12px", maxWidth: "380px", lineHeight: 1.65 }}>
                Latest club announcements, event updates, registrations, results and important notices.
              </p>
            </motion.div>
          </div>

          {/* Right quote card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.68, delay: 0.38, ease: EASE }}
            className="absolute right-10 bottom-10 hidden lg:block"
            style={{ maxWidth: "240px" }}
          >
            <div style={{
              background: "rgba(45,45,45,0.95)",
              borderRadius: "16px",
              padding: "18px 20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.50)",
            }}>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.80)", lineHeight: 1.65, fontStyle: "italic" }}>
                &ldquo;Never miss important updates from PALS Club.&rdquo;
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ══════════════════════════════════════
            SEARCH + FILTER BAR (same as Events)
            ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 mb-10"
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "12px 16px",
            boxShadow: "0 2px 18px rgba(0,0,0,0.07)",
            border: "1px solid #ececec",
          }}
        >
          <div className="flex items-center gap-3 w-full lg:flex-1" style={{
            background: "#f5f5f7", borderRadius: "9999px", padding: "10px 20px", minHeight: "46px",
          }}>
            <Search size={18} style={{ color: "#aaa", flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search announcements..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: "15px", fontWeight: 500, color: "#111", border: "none", caretColor: "#111" }}
            />
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-start lg:justify-end">
            {FILTERS.map(f => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  style={{
                    borderRadius: "9999px", padding: "10px 18px",
                    fontSize: "11.5px", fontWeight: 700, letterSpacing: "0.07em",
                    cursor: "pointer",
                    transition: "background 200ms ease, color 200ms ease, border-color 200ms ease",
                    background:  active ? "#0a0a0a" : "transparent",
                    color:       active ? "#fff"    : "#888",
                    border:      active ? "1.5px solid transparent" : "1.5px solid #e0e0e0",
                    whiteSpace:  "nowrap",
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════
            PINNED / FEATURED
            ══════════════════════════════════════ */}
        {filter === "ALL" && !query && featured.length > 0 && (
          <div className="mb-8 space-y-4">
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: "#aaa", textTransform: "uppercase" }}>
              Pinned
            </p>
            {featured.map((a, i) => (
              <FeaturedCard key={a.id} a={a} index={i} />
            ))}
          </div>
        )}

        {/* ══════════════════════════════════════
            CARD GRID
            ══════════════════════════════════════ */}
        {filtered.length > 0 ? (
          <>
            {(filter !== "ALL" || query) && (
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: "#aaa", textTransform: "uppercase", marginBottom: "16px" }}>
                {filtered.length} Result{filtered.length !== 1 ? "s" : ""}
              </p>
            )}
            {filter === "ALL" && !query && (
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", color: "#aaa", textTransform: "uppercase", marginBottom: "16px" }}>
                Latest
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((a, i) => (
                <AnnouncementCard key={a.id} a={a} index={i} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Bell size={32} style={{ color: "#ccc", margin: "0 auto 12px" }} />
            <p style={{ fontSize: "14px", fontWeight: 600, color: "#aaa" }}>No announcements found.</p>
            <p style={{ fontSize: "12px", color: "#bbb", marginTop: "4px" }}>Try another search or filter.</p>
          </div>
        )}

      </div>
    </main>
  );
}
