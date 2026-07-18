"use client";

import Link from "next/link";
import { ArrowUpRight, Handshake } from "lucide-react";
import { motion } from "framer-motion";

/* ─── Entry animations (mount only, no ongoing motion) ──────────────────── */
const entryLeft  = { initial: { opacity: 0, x: -36 }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } };
const entryUp    = { initial: { opacity: 0, y: 36  }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: 0.13, ease: [0.22, 1, 0.36, 1] } };
const entryRight = { initial: { opacity: 0, x: 36  }, whileInView: { opacity: 1, x: 0 }, viewport: { once: true }, transition: { duration: 0.65, delay: 0.22, ease: [0.22, 1, 0.36, 1] } };

export default function ShowcaseSection() {
  return (
    <section className="py-20 bg-transparent">
      {/* Wider horizontal padding to match reference margins */}
      <div className="w-full px-14 lg:px-28">

        {/* ── Three-column grid ── */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-[1.6fr_0.85fr_1.1fr]">

          {/* ══════════════════════════════════════════════════
              LEFT CARD — Purple, fully static, hover shadow only
              ══════════════════════════════════════════════════ */}
          <motion.div {...entryLeft} className="group col-span-2 lg:col-span-1">
            <Link href="/gallery">
              <div
                className="
                  relative h-[300px] sm:h-[428px] overflow-hidden rounded-[28px] p-6 sm:p-8
                  text-white
                  shadow-sm hover:shadow-xl
                  transition-shadow duration-400
                "
                style={{
                  background:
                    "linear-gradient(135deg,#6500ff 0%,#8d1cff 35%,#6c00ff 65%,#b24dff 100%)",
                }}
              >
                {/* Static radial highlight */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-25"
                  style={{
                    background:
                      "radial-gradient(circle at 28% 18%, rgba(255,255,255,.22), transparent 48%)",
                  }}
                />

                <div className="relative flex h-full flex-col">

                  {/* Badge */}
                  <div>
                    <span className="inline-flex rounded-full bg-black/20 px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase backdrop-blur-sm">
                      Visual Archives
                    </span>
                  </div>

                  {/* Heading */}
                  <div className="mt-6">
                    <h2 className="text-[22px] leading-[0.9] font-black italic uppercase">
                      GLOBAL
                      <br />
                      EVENT
                      <br />
                      <span className="text-lime-300">GALLERY.</span>
                    </h2>
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />

                  {/* Divider + bottom row */}
                  <div className="border-t border-white/20 pt-5">
                    <div className="flex items-end justify-between">

                      {/* Description */}
                      <p className="max-w-[220px] text-[10px] font-semibold uppercase leading-[1.55] text-white/85">
                        Explore our visual archives
                        <br />
                        of past events, epic moments,
                        <br />
                        and community vibes.
                      </p>

                      {/* Lime arrow button — NO animation, fully static */}
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-lime-300 text-black shadow-md">
                        <ArrowUpRight size={20} strokeWidth={2.5} />
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </Link>
          </motion.div>

          {/* ══════════════════════════════════════════════════
              CENTER CARD — image zooms on hover, card is fixed
              ══════════════════════════════════════════════════ */}
          <motion.div {...entryUp} className="group">
            <Link href="/events">
              <div className="relative h-[220px] sm:h-[428px] overflow-hidden rounded-[28px] shadow-sm">

                {/* Image zoom only — card never moves */}
                <img
                  src="/gallery-preview.jpg"
                  alt="Event highlights"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Handshake + ELITE COLLABS */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                  <Handshake size={38} strokeWidth={1.6} />
                  <h3 className="text-[15px] font-black uppercase leading-[1.1] tracking-wide text-center">
                    ELITE
                    <br />
                    COLLABS
                  </h3>
                </div>

              </div>
            </Link>
          </motion.div>

          {/* ══════════════════════════════════════════════════
              RIGHT CARD — white → lime on hover
                           arrow hidden by default, fades in on hover
                           card never moves
              ══════════════════════════════════════════════════ */}
          <motion.div {...entryRight} className="group">
            <Link href="/events">
              <div
                className="
                  relative h-[220px] sm:h-[428px] overflow-hidden rounded-[28px]
                  border border-neutral-200 p-5 sm:p-7
                  transition-colors duration-400
                  hover:bg-lime-300
                "
              >

                {/* Top decorative lines */}
                <div className="absolute left-7 top-7">
                  <div className="h-[5px] w-10 rounded-full bg-black" />
                  <div className="mt-1.5 h-[5px] w-6 rounded-full bg-black/30" />
                </div>

                {/* Bottom-left heading */}
                <div className="absolute bottom-7 left-7">
                  <h2 className="text-[22px] font-black uppercase leading-[0.9] text-black">
                    JOIN
                    <br />
                    THE
                    <br />
                    HYPE.
                  </h2>
                </div>

                {/*
                  Bottom-right arrow:
                  - Hidden initially (opacity-0 translate-x-1 translate-y-1)
                  - Fades + slides in on hover via group-hover utilities
                  - No circle, plain black icon, card never moves
                */}
                <div
                  className="
                    absolute bottom-7 right-7
                    text-black
                    opacity-0 translate-x-1 translate-y-1
                    group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0
                    transition-all duration-300 ease-out
                  "
                >
                  <ArrowUpRight size={26} strokeWidth={2.5} />
                </div>

              </div>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
