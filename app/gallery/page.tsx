"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { events } from "@/data/events";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";
import Link from "next/link";

// ─── Only include events that have photos ────────────────────────────────
const GALLERY_EVENTS = events.filter(e => e.photos && e.photos.length > 0);

// ─── Helpers ─────────────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

const CAT_LABEL: Record<string, string> = {
  conference: "Conference",
  workshop:   "Workshop",
  networking: "Networking",
  webinar:    "Webinar",
};

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  LIVE:     { bg: "#bef264", color: "#000" },
  UPCOMING: { bg: "#93c5fd", color: "#000" },
  PAST:     { bg: "#e5e7eb", color: "#333" },
};

// ─── Lightbox ────────────────────────────────────────────────────────────
interface LightboxState {
  photos:  string[]
  index:   number
  title:   string
}

function Lightbox({ state, onClose }: { state: LightboxState; onClose: () => void }) {
  const [idx, setIdx] = useState(state.index);
  const total = state.photos.length;

  const prev = useCallback(() => setIdx(i => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx(i => (i + 1) % total), [total]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")     onClose();
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      {/* Panel */}
      <motion.div
        className="relative flex flex-col items-center"
        style={{ maxWidth: "min(90vw, 1000px)", width: "100%" }}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1,    opacity: 1 }}
        exit={{    scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.28, ease: EASE }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between w-full mb-3 px-1">
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.50)", fontWeight: 600 }}>
            {state.title}
          </p>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
              {idx + 1} / {total}
            </span>
            <button
              onClick={onClose}
              className="flex items-center justify-center rounded-full"
              style={{
                width: "32px", height: "32px",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", cursor: "pointer",
              }}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={state.photos[idx]}
            alt={`Photo ${idx + 1}`}
            className="w-full object-cover"
            style={{ borderRadius: "16px", maxHeight: "72vh" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0  }}
            exit={{    opacity: 0, x: -20 }}
            transition={{ duration: 0.22, ease: EASE }}
          />
        </AnimatePresence>

        {/* Nav arrows */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 flex items-center justify-center rounded-full"
              style={{
                width: "44px", height: "44px",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", cursor: "pointer",
                transition: "background 200ms ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.20)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 flex items-center justify-center rounded-full"
              style={{
                width: "44px", height: "44px",
                background: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", cursor: "pointer",
                transition: "background 200ms ease",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.20)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {total > 1 && (
          <div className="flex gap-1.5 mt-4">
            {state.photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                style={{
                  width:  i === idx ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "9999px",
                  background: i === idx ? "#bef264" : "rgba(255,255,255,0.25)",
                  border: "none", cursor: "pointer",
                  transition: "width 280ms ease, background 280ms ease",
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ─── Photo thumbnail ──────────────────────────────────────────────────────
function PhotoThumb({
  src, alt, onClick,
}: { src: string; alt: string; onClick: () => void }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative overflow-hidden"
      style={{
        borderRadius: "14px",
        cursor: "pointer",
        aspectRatio: "4/3",
        background: "#e8e8e8",
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{
          transform:  hov ? "scale(1.05)" : "scale(1)",
          filter:     hov ? "brightness(1.06)" : "brightness(1)",
          transition: "transform 380ms cubic-bezier(0.22,1,0.36,1), filter 300ms ease",
        }}
      />
      {/* Hover overlay */}
      <div
        style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.18)",
          opacity: hov ? 1 : 0,
          transition: "opacity 300ms ease",
          borderRadius: "14px",
        }}
      />
    </div>
  );
}

// ─── Event gallery block ──────────────────────────────────────────────────
function EventGalleryBlock({
  event, delay, onOpen,
}: {
  event: typeof events[0];
  delay: number;
  onOpen: (photos: string[], index: number, title: string) => void;
}) {
  const photos  = event.photos ?? [event.image];
  const st      = STATUS_STYLE[event.status] ?? STATUS_STYLE.PAST;
  const catLbl  = CAT_LABEL[event.category] ?? event.category;

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {/* ── Event header ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
        <div>
          {/* Category + status badges */}
          <div className="flex items-center gap-2 mb-2">
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide"
              style={{ background: "#0a0a0a", color: "#fff" }}
            >
              {catLbl}
            </span>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wide"
              style={{ background: st.bg, color: st.color }}
            >
              {event.status}
            </span>
          </div>

          {/* Title */}
          <h2
            className="text-black uppercase leading-tight"
            style={{ fontSize: "clamp(1.2rem, 2.8vw, 1.7rem)", fontWeight: 900, letterSpacing: "-0.02em" }}
          >
            {event.title}
          </h2>

          {/* Meta */}
          <p style={{ fontSize: "12px", color: "#888", marginTop: "4px" }}>
            {fmtDate(event.date)}&ensp;·&ensp;{photos.length} Photos
          </p>
        </div>

        {/* View event link */}
        <Link
          href={`/events/${event.slug}`}
          className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide"
          style={{
            background: "#0a0a0a", color: "#fff",
            transition: "background 200ms ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#333")}
          onMouseLeave={e => (e.currentTarget.style.background = "#0a0a0a")}
        >
          <Images size={13} /> View Event
        </Link>
      </div>

      {/* ── Thin divider ─────────────────────────────────── */}
      <div style={{ borderTop: "1.5px solid #e8e8e8", marginBottom: "18px" }} />

      {/* ── Photo grid ───────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {photos.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
          >
            <PhotoThumb
              src={src}
              alt={`${event.title} — photo ${i + 1}`}
              onClick={() => onOpen(photos, i, event.title)}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  const openLightbox = (photos: string[], index: number, title: string) =>
    setLightbox({ photos, index, title });
  const closeLightbox = () => setLightbox(null);

  return (
    <main className="min-h-screen" style={{ background: "#f5f0eb" }}>
      <div className="w-full px-14 lg:px-28 pt-32 pb-20">

        {/* ── Page header ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mb-14"
        >
          <h1
            className="text-black uppercase leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, letterSpacing: "-0.03em" }}
          >
            Event Gallery
          </h1>
          <p style={{ fontSize: "14px", color: "#888", marginTop: "8px" }}>
            Memories from every event — click any photo to explore.
          </p>
        </motion.div>

        {/* ── Event blocks ─────────────────────────────────── */}
        <div className="space-y-20">
          {GALLERY_EVENTS.map((event, i) => (
            <EventGalleryBlock
              key={event.id}
              event={event}
              delay={0}
              onOpen={openLightbox}
            />
          ))}
        </div>

        {/* ── Empty state ───────────────────────────────────── */}
        {GALLERY_EVENTS.length === 0 && (
          <div className="text-center py-32">
            <p style={{ fontSize: "14px", color: "#aaa", fontWeight: 600 }}>
              No gallery photos yet — check back after our next event.
            </p>
          </div>
        )}

      </div>

      {/* ── Lightbox ─────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox state={lightbox} onClose={closeLightbox} />
        )}
      </AnimatePresence>
    </main>
  );
}
