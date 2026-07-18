"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Globe, AtSign, Code, MessageCircle } from "lucide-react";

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

// ─── Social icon button ───────────────────────────────────────────────────
function SocialBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      aria-label={label}
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
    </button>
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
                <div style={{
                  width: "42px", height: "42px", borderRadius: "50%",
                  background: "linear-gradient(135deg,#22d3ee,#0ea5e9)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{ color:"#fff", fontSize:"13px", fontWeight:900, letterSpacing:"-0.02em" }}>PC</span>
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
                <SocialBtn icon={<Globe       size={16} />} label="LinkedIn"  />
                <SocialBtn icon={<AtSign      size={16} />} label="Instagram" />
                <SocialBtn icon={<Code        size={16} />} label="GitHub"    />
                <SocialBtn icon={<MessageCircle size={16} />} label="Discord" />
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
