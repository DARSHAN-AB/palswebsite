"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// ─── Staggered reveal — each child slides up from 28px, fades in ──────────
const EASE = [0.22, 1, 0.36, 1] as const;

function RevealLine({
  children,
  delay,
  inView,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  delay: number;
  inView: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    // Clip wrapper keeps overflow hidden so text enters from below
    <div className="overflow-hidden">
      <motion.div
        className={className}
        style={style}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.72, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function CommunityCTA() {
  const [hov, setHov] = useState(false);

  // once: false → fires on every viewport entry/exit
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section className="py-16 bg-transparent">
      <div className="w-full px-6 md:px-12 lg:px-24 xl:px-36">

        {/* ── Black container ─────────────────────────────────── */}
        <div
          ref={ref}
          className="relative flex flex-col items-center justify-center text-center"
          style={{
            background:   "#000",          // pure matte black — no gradient, no glow
            borderRadius: "38px",
            minHeight:    "578px",
            padding:      "88px 64px",     // more breathing room
          }}
        >

          {/* ── Label ────────────────────────────────────────── */}
          <RevealLine delay={0.00} inView={inView} className="mb-8">
            <div
              className="flex items-center gap-2"
              style={{ letterSpacing: "0.38em" }}
            >
              <span
                className="block rounded-full flex-shrink-0"
                style={{ width: "6px", height: "6px", background: "#bef264" }}
              />
              <span
                className="uppercase text-[11px] font-medium"
                style={{ color: "rgba(200,200,200,0.65)" }}
              >
                The Next Standard
              </span>
            </div>
          </RevealLine>

          {/* ── Headline ─────────────────────────────────────── */}
          <div className="space-y-0 leading-none">

            {/* Line 1 — EXPERIENCE */}
            <RevealLine delay={0.12} inView={inView}>
              <p
                className="uppercase tracking-tight text-white"
                style={{
                  fontSize:   "clamp(3rem, 6.5vw, 5.2rem)",
                  fontWeight: 300,
                  lineHeight: 1.0,
                }}
              >
                Experience
              </p>
            </RevealLine>

            {/* Line 2 — BEYOND */}
            <RevealLine delay={0.24} inView={inView}>
              <p
                className="uppercase tracking-tight"
                style={{
                  fontSize:   "clamp(3rem, 6.5vw, 5.2rem)",
                  fontWeight: 300,
                  lineHeight: 1.0,
                  color:      "rgba(255,255,255,0.30)",
                }}
              >
                Beyond
              </p>
            </RevealLine>

            {/* Line 3 — ORDINARY. (italic serif) */}
            <RevealLine delay={0.36} inView={inView}>
              <p
                className="tracking-tight text-white"
                style={{
                  fontSize:   "clamp(3rem, 6.5vw, 5.2rem)",
                  fontWeight: 700,
                  fontStyle:  "italic",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  lineHeight: 1.08,
                }}
              >
                Ordinary.
              </p>
            </RevealLine>

          </div>

          {/* ── CTA button ───────────────────────────────────── */}
          <RevealLine delay={0.50} inView={inView} className="mt-10">
            <Link href="/events">
              <button
                className="inline-flex items-center gap-2.5 rounded-full bg-white text-black font-semibold"
                style={{
                  fontSize:      "12px",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  padding:       "13px 28px",
                  // stationary — no scale on hover
                  boxShadow:     hov
                    ? "0 6px 24px rgba(0,0,0,0.40)"
                    : "0 2px 12px rgba(0,0,0,0.30)",
                  background:    hov ? "#f0f0f0" : "#ffffff",
                  transition:    "box-shadow 280ms ease, background 250ms ease",
                  cursor:        "pointer",
                }}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
              >
                Secure Your Spot
                {/* Arrow slides right on hover — button itself never moves */}
                <ArrowRight
                  size={14}
                  strokeWidth={2.2}
                  style={{
                    transform:  hov ? "translateX(3px)" : "translateX(0)",
                    transition: "transform 280ms ease",
                  }}
                />
              </button>
            </Link>
          </RevealLine>

        </div>
      </div>
    </section>
  );
}
