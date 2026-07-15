"use client";

import { useState } from "react";
import { motion }   from "framer-motion";
import { Mail, Globe, ArrowRight, Send, CheckCircle } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

// ─── Field component ──────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: "#888", textTransform: "uppercase" }}>
        {label}
      </p>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#f5f5f5",
  border: "1px solid #ebebeb",
  borderRadius: "10px",
  padding: "13px 16px",
  fontSize: "14px",
  color: "#111",
  outline: "none",
  transition: "border-color 200ms ease",
};

// ─── Card 1 — Contact info (hover: lime border + lime Globe) ─────────────
function Card1() {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:    "#1a1a1e",
        borderRadius:  "22px",
        padding:       "28px",
        border:        hov ? "1px solid #bef264" : "1px solid rgba(255,255,255,0.08)",
        position:      "relative",
        overflow:      "hidden",
        transition:    "border-color 280ms ease",
      }}
    >
      <Globe
        size={44}
        strokeWidth={1.2}
        style={{
          position:   "absolute", top: "22px", right: "22px",
          color:      hov ? "#bef264" : "rgba(255,255,255,0.20)",
          transition: "color 280ms ease",
        }}
      />
      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#666", textTransform: "uppercase", marginBottom: "10px" }}>
        Global HQ
      </p>
      <h2 className="text-white font-black uppercase leading-tight"
        style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)", letterSpacing: "-0.02em", marginBottom: "24px" }}>
        Bangalore<br />Karnataka, India
      </h2>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "18px" }}>
        <a href="mailto:club@bmsit.in" className="inline-flex items-center gap-2"
          style={{ fontSize: "13px", color: "rgba(255,255,255,0.60)", transition: "color 200ms ease" }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.60)")}>
          <Mail size={14} style={{ flexShrink: 0 }} />
          club@bmsit.in
        </a>
      </div>
    </div>
  );
}

// ─── Card 2 — Partner card (taller, arrow rotates 45° on hover) ───────────
function Card2() {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background:   "#bef264",
        borderRadius: "22px",
        padding:      "28px 28px 28px 28px",
        minHeight:    "320px",
        position:     "relative",
        overflow:     "hidden",
        display:      "flex",
        flexDirection:"column",
        transition:   "filter 280ms ease",
        filter:       hov ? "brightness(1.06)" : "brightness(1)",
      }}
    >
      {/* Arrow — rotates to point right on hover */}
      <ArrowRight
        size={22}
        style={{
          position:   "absolute", top: "24px", right: "24px",
          color:      "#000",
          transform:  hov ? "rotate(0deg)" : "rotate(-45deg)",
          transition: "transform 320ms cubic-bezier(0.34,1.56,0.64,1)",
        }}
      />

      {/* Status badge */}
      <div className="inline-flex items-center gap-1.5 mb-5">
        <span className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest"
          style={{ background: "rgba(0,0,0,0.15)", color: "#000" }}>
          Status :: Online
        </span>
      </div>

      <h3 className="font-black uppercase leading-tight text-black"
        style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.45rem)", letterSpacing: "-0.02em", marginBottom: "auto" }}>
        We are actively<br />recruiting partners.
      </h3>

      <button
        className="w-full font-black uppercase tracking-widest rounded-full py-3.5 text-white text-[12px] mt-8"
        style={{ background: "#000", border: "none", cursor: "pointer", transition: "background 250ms ease", letterSpacing: "0.10em" }}
        onMouseEnter={e => (e.currentTarget.style.background = "#222")}
        onMouseLeave={e => (e.currentTarget.style.background = "#000")}
      >
        Apply to Partner
      </button>
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main
      className="min-h-screen"
      style={{
        background: "#0e0e10",
        // subtle dot grid
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <div className="w-full px-10 lg:px-20 pt-32 pb-20">

        {/* ══════════════════════════════════════
            HERO
            ══════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, ease: EASE }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-8"
        >
          {/* Left heading */}
          <div>
            <h1
              className="uppercase leading-none font-black tracking-tight"
              style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
            >
              <span className="block text-white">Contact</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #bef264 0%, #84cc16 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Protocol.
              </span>
            </h1>
          </div>

          {/* Right quote */}
          <div className="lg:max-w-xs lg:text-right pb-2">
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
              &ldquo;The line is open. Whether you&rsquo;re a partner, creator,
              or attendee—<strong style={{ color: "rgba(255,255,255,0.90)" }}>make your signal clear.</strong>&rdquo;
            </p>
          </div>
        </motion.div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.10)", marginBottom: "48px" }} />

        {/* ══════════════════════════════════════
            TWO-COLUMN LAYOUT
            ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-5 items-start">

          {/* ── LEFT COLUMN ─────────────────── */}
          <div className="flex flex-col gap-5">

            {/* Card 1 — Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: EASE }}
            >
              <Card1 />
            </motion.div>

            {/* Card 2 — Partner recruitment (lime) */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.26, ease: EASE }}
            >
              <Card2 />
            </motion.div>
          </div>

          {/* ── RIGHT: Form card ─────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.18, ease: EASE }}
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "40px 36px",
              border: "1px solid #ebebeb",
              boxShadow: "0 4px 32px rgba(0,0,0,0.10)",
            }}
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 gap-5 text-center">
                <CheckCircle size={52} style={{ color: "#84cc16" }} />
                <h3 style={{ fontSize: "20px", fontWeight: 900, color: "#0e0e10" }}>Transmission Received!</h3>
                <p style={{ fontSize: "13px", color: "#888", maxWidth: "280px", lineHeight: 1.65 }}>
                  Thanks for reaching out. We'll get back to you within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2
                  className="font-black uppercase tracking-tight text-black"
                  style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.7rem)", letterSpacing: "-0.02em", marginBottom: "28px" }}
                >
                  Send Transmission
                </h2>

                {/* Identity — Name */}
                <Field label="Identity">
                  <input
                    name="name" type="text" placeholder="Name" required
                    style={inputStyle}
                    onFocus={e  => (e.currentTarget.style.borderColor = "#bef264")}
                    onBlur={e   => (e.currentTarget.style.borderColor = "#ebebeb")}
                  />
                </Field>

                {/* Email */}
                <Field label="Signal">
                  <input
                    name="email" type="email" placeholder="your@email.com" required
                    style={inputStyle}
                    onFocus={e  => (e.currentTarget.style.borderColor = "#bef264")}
                    onBlur={e   => (e.currentTarget.style.borderColor = "#ebebeb")}
                  />
                </Field>

                {/* Topic — subject dropdown */}
                <Field label="Topic">
                  <select
                    name="topic" required
                    style={{ ...inputStyle, appearance: "none", WebkitAppearance: "none", cursor: "pointer" }}
                    onFocus={e  => (e.currentTarget.style.borderColor = "#bef264")}
                    onBlur={e   => (e.currentTarget.style.borderColor = "#ebebeb")}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Event Registration">Event Registration</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Other">Other</option>
                  </select>
                </Field>

                {/* Data — message */}
                <Field label="Data">
                  <textarea
                    name="message" rows={5} placeholder="Write your message here..." required
                    style={{ ...inputStyle, resize: "none" }}
                    onFocus={e  => (e.currentTarget.style.borderColor = "#bef264")}
                    onBlur={e   => (e.currentTarget.style.borderColor = "#ebebeb")}
                  />
                </Field>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 rounded-full font-black uppercase text-white text-[12px] tracking-widest py-4 mt-2"
                  style={{
                    background: loading ? "#333" : "#0e0e10",
                    border: "none",
                    letterSpacing: "0.12em",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "background 250ms ease",
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#222" }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#0e0e10" }}
                >
                  {loading ? "Sending…" : (
                    <>
                      Initialize Send
                      <Send size={14} strokeWidth={2.2} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </main>
  );
}
