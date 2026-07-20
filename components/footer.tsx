"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

// ─── Stagger entrance ─────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

const colVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const colItem = {
  hidden:  { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.62, ease: EASE } },
};

// ─── Accent yellow (matches reference headings) ───────────────────────────
const YELLOW = "#F5C518";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.94 8.5A1.56 1.56 0 1 0 6.94 5.38a1.56 1.56 0 0 0 0 3.12Z" />
      <path d="M5.5 9.5h2.88v8H5.5z" />
      <path d="M11.5 17.5h2.88v-4.02c0-1.22.98-2.2 2.2-2.2h.03c1.22 0 2.2.98 2.2 2.2v4.02h2.88v-4.7c0-3.18-2.58-5.76-5.76-5.76s-5.76 2.58-5.76 5.76z" />
    </svg>
  );
}

// ─── Social icon button ───────────────────────────────────────────────────
function SocialBtn({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  const [hov, setHov] = useState(false);
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      aria-label={label}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "38px", height: "38px",
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hov ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.10)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#fff",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "background 250ms ease, transform 250ms ease",
        cursor: "pointer",
      }}
    >
      {icon}
    </a>
  );
}

// ─── Footer link ──────────────────────────────────────────────────────────
function FLink({ href, label }: { href: string; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.li variants={colItem}>
      <Link
        href={href}
        style={{
          fontSize: "12px",
          color: hov ? "#ffffff" : "rgba(255,255,255,0.65)",
          transition: "color 200ms ease",
        }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        {label}
      </Link>
    </motion.li>
  );
}

// ─── Newsletter form ──────────────────────────────────────────────────────
function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done,  setDone]  = useState(false);
  const [hovBtn, setHovBtn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return done ? (
    <p style={{ fontSize: "13px", color: "#bef264" }}>You're in! We'll keep you posted. 🎉</p>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex flex-col gap-3 sm:flex-row"
    >
      <input
        type="email"
        required
        placeholder="Email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{
          width: "100%",
          minWidth: 0,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.14)",
          borderRadius: "9999px",
          padding: "9px 16px",
          fontSize: "13px",
          color: "#fff",
          outline: "none",
          transition: "border-color 200ms ease",
        }}
        onFocus={e  => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.30)")}
        onBlur={e   => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")}
      />
      <button
        type="submit"
        className="w-full sm:w-auto"
        style={{
          borderRadius: "9999px",
          padding: "11px 18px",
          width: "100%",
          fontSize: "13px",
          fontWeight: 700,
          background: hovBtn ? "#a855f7" : "#7c3aed",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          transition: "background 250ms ease, transform 250ms ease",
          transform: hovBtn ? "scale(1.04)" : "scale(1)",
          // whiteSpace: "nowrap",
        }}
        onMouseEnter={() => setHovBtn(true)}
        onMouseLeave={() => setHovBtn(false)}
      >
        Join
      </button>
    </form>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────
export function Footer() {
  return (
    /* Outer section — same page padding used across all sections */
    <section className="py-0" style={{ background: '#f5f0eb' }}>
      <div className="w-full px-5 lg:px-10">

        {/* Black container — rounded top corners only, flat bottom, flush width */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: EASE }}
          style={{
            background:   "#000",
            borderRadius: "32px 32px 0 0",   /* rounded top, flat bottom */
            padding: "70px clamp(24px,5vw,160px) 45px",
          }}
        >

          {/* ── Four-column grid ──────────────────────────────── */}
          <motion.div
            className="
            grid
            grid-cols-1
            gap-8
            md:grid-cols-[1.4fr_1fr_1fr_1.4fr]
            md:gap-10
            mb-12
            "
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >

            {/* ── Col 1: Brand ── */}
            <motion.div variants={colItem} className="space-y-5">
              {/* Logo + name */}
              <div className="flex items-center gap-3">
                <div style={{ width: "42px", height: "42px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  <Image src="/roller2.png" alt="PALS Club" width={42} height={42} className="object-cover" />
                </div>
                <span style={{ color:"#fff", fontSize:"13px", fontWeight:800, letterSpacing:"-0.01em" }}>
                  PALS Club
                </span>
              </div>

              {/* Tagline */}
              <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.50)", lineHeight: 1.65, maxWidth: "200px" }}>
                Empowering students through innovation, hackathons, workshops and real-world experiences.
              </p>

              {/* Social icons */}
              <div className="flex gap-2 pt-1">
                <SocialBtn icon={<InstagramIcon />} label="Instagram" href="https://instagram.com/pals.x.bmsit" />
                <SocialBtn icon={<LinkedInIcon />} label="LinkedIn" href="https://www.linkedin.com/company/pals-bmsit/posts/" />
                <SocialBtn icon={<Mail size={16} />} label="Email" href="mailto:24ug1byai417@bmsit.in" />
              </div>
            </motion.div>

            {/* ── Col 2: Platform ── */}
            <div>
              <motion.p
                variants={colItem}
                style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.14em",
                         textTransform:"uppercase", color: YELLOW, marginBottom:"20px" }}
              >
                Platform
              </motion.p>
              <motion.ul variants={colVariants} initial="hidden" whileInView="visible"
                viewport={{ once: true }} className="space-y-3">
                {[
                  { label:"Home",    href:"/"            },
                  { label:"Events",  href:"/events"      },
                  { label:"Gallery", href:"/gallery"     },
                  { label:"Team",    href:"/team"        },
                  { label:"Contact", href:"/contact"     },
                ].map(l => <FLink key={l.href} {...l} />)}
              </motion.ul>
            </div>

            {/* ── Col 3: About ── */}
            <div>
              <motion.p
                variants={colItem}
                style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.14em",
                         textTransform:"uppercase", color: YELLOW, marginBottom:"20px" }}
              >
                About
              </motion.p>
              <motion.ul variants={colVariants} initial="hidden" whileInView="visible"
                viewport={{ once: true }} className="space-y-3">
                {[
                  { label:"About PALS",        href:"/about"        },
                  { label:"Join Us",            href:"/contact"      },
                  { label:"Announcements",      href:"/announcements"},
                  { label:"Privacy Policy",     href:"#"             },
                  { label:"Terms & Conditions", href:"#"             },
                ].map(l => <FLink key={l.label} {...l} />)}
              </motion.ul>
            </div>

            {/* ── Col 4: Stay Updated ── */}
            <motion.div variants={colItem}>
              <p style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.14em",
                          textTransform:"uppercase", color: YELLOW, marginBottom:"14px" }}>
                Stay Updated
              </p>
              <p style={{ fontSize:"11px", color:"rgba(255,255,255,0.50)", lineHeight:1.65, maxWidth:"220px" }}>
                Get notified about upcoming hackathons, workshops and community events.
              </p>
              <NewsletterForm />
            </motion.div>

          </motion.div>

          {/* ── Divider ───────────────────────────────────────── */}
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.10)", marginBottom:"28px" }} />

          {/* ── Bottom row ────────────────────────────────────── */}
          <div className="
          flex
          flex-col
          items-center
          gap-4
          text-center
          sm:flex-row
          sm:justify-between
          sm:text-left
          ">
            <p style={{ fontSize:"10px", color:"rgba(255,255,255,0.35)" }}>
              © {new Date().getFullYear()} PALS Club BMSIT&M. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[["Terms","#"],["Privacy","#"],["Contact","/contact"]].map(([label,href])=>(
                <Link key={label} href={href}
                  style={{ fontSize:"10px", color:"rgba(255,255,255,0.35)",
                           transition:"color 200ms ease" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.35)")}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
