"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  ArrowLeft, CalendarDays, Clock3, MapPin,
  Share2, ArrowDown, Trophy, ArrowRight,
  Users, Coffee, Mic2, Star, CheckCircle, Zap, X, Loader2,
} from "lucide-react";
import { getSeatAvailability, submitRegistration } from "@/lib/registration";
import type { SeatAvailability, RegistrationPayload } from "@/lib/registration";
import { useSeatAvailability } from "@/lib/useSeatAvailability";
import { getEventById } from "@/data/events";

const EASE = [0.22, 1, 0.36, 1] as const;
const LIME = "#bef264";

type EventStatus = "LIVE" | "PAST" | "UPCOMING";
const STATUS_CONFIG: Record<EventStatus, { label: string; dot: boolean; bg: string; color: string }> = {
  LIVE:     { label: "Live",     dot: true,  bg: "#F5C518", color: "#000" },
  UPCOMING: { label: "Upcoming", dot: false, bg: "#1a1a1e", color: "#fff" },
  PAST:     { label: "Past",     dot: false, bg: "#e5e7eb", color: "#333" },
};

const event = getEventById("impromptu-prompt-league");
const eventStatus = (event?.status ?? "LIVE") as EventStatus;
const eventStatusMeta = STATUS_CONFIG[eventStatus];
const eventStatusLabel = eventStatusMeta.label;
const isPast = eventStatus === "PAST";

/* ── Countdown unit ─────────────────────────────────────────────────────── */
function CountUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span
        className="font-black tabular-nums leading-none"
        style={{ fontSize: "clamp(1.4rem, 3vw, 1.9rem)", color: "#fff", letterSpacing: "-0.03em" }}
      >
        {value}
      </span>
      <span style={{ fontSize: "8px", fontWeight: 700, color: "rgba(255,255,255,0.40)", letterSpacing: "0.22em", textTransform: "uppercase" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Seats tracker ───────────────────────────────────────────────────────
// Driven by the useSeatAvailability hook — always in sync with the button.
function SeatsTracker({
  loading, remainingSeats, totalSeats, status,
}: {
  loading:       boolean;
  remainingSeats: number;
  totalSeats:    number;
  status:        "loading" | "available" | "full" | "error";
}) {
  const filled = totalSeats - remainingSeats;
  const pct    = totalSeats > 0 ? Math.round((filled / totalSeats) * 100) : 0;

  return (
    <div style={{ marginTop: "14px" }}>
      <div className="flex items-center justify-between mb-2">
        <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.40)" }}>
          Seats Left
        </p>
        {status === "error" ? (
          <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)" }}>Unavailable</p>
        ) : loading ? (
          <Loader2 size={10} className="animate-spin" style={{ color: "rgba(255,255,255,0.30)" }} />
        ) : (
          <p style={{ fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.50)" }}>
            {remainingSeats} / {totalSeats}
          </p>
        )}
      </div>
      <div style={{ height: "6px", borderRadius: "9999px", background: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
        <div style={{ height: "100%", width: loading ? "0%" : `${pct}%`, borderRadius: "9999px", background: "#bef264", transition: "width 600ms ease" }} />
      </div>
      <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.30)", marginTop: "5px" }}>
        {status === "error"     ? "Unable to fetch seat availability"
         : loading              ? "Fetching availability…"
         : remainingSeats === 0 ? "No seats available"
                                : `${remainingSeats} seats available`}
      </p>
    </div>
  );
}

// ─── Registration modal ───────────────────────────────────────────────────
const BRANCHES = [
  "Artificial Intelligence & Machine Learning",
  "Computer Science & Engineering",
  "Information Science & Engineering",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Biotechnology",
  "Electronics & Instrumentation Engineering",
  "Chemical Engineering",
  "Aerospace Engineering",
  "Industrial Engineering & Management",
];

const SEMESTERS = ["Semester 1","Semester 2","Semester 3","Semester 4","Semester 5","Semester 6","Semester 7","Semester 8"];

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.07)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "10px",
  padding: "11px 14px",
  fontSize: "13px",
  color: "#fff",
  outline: "none",
  transition: "border-color 200ms ease",
};

const SELECT_STYLE: React.CSSProperties = {
  ...INPUT_STYLE,
  appearance: "none" as const,
  WebkitAppearance: "none" as const,
  cursor: "pointer",
  backgroundColor: "#1a1a1e",
  color: "#fff",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "6px" }}>
      {children}
    </p>
  );
}

interface RegForm {
  teamName: string;
  fullName: string;
  semester: string;
  usn:      string;
  branch:   string;
  email:    string;
  phone:    string;
}

function RegistrationModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<RegForm>({ teamName:"", fullName:"", semester:"", usn:"", branch:"", email:"", phone:"" });
  const [submitted, setSubmitted] = useState(false);
  const [errors,    setErrors]    = useState<Partial<RegForm>>({});
  const [submitting,  setSubmitting]  = useState(false);
  const [serverError, setServerError] = useState("");

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const set = (k: keyof RegForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let v = e.target.value;
    if (k === "usn") v = v.toUpperCase();
    setForm(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: undefined }));
  };

  const validate = (): boolean => {
    const errs: Partial<RegForm> = {};
    if (!form.teamName.trim()) errs.teamName = "Required";
    if (!form.fullName.trim()) errs.fullName  = "Required";
    if (!form.semester)        errs.semester  = "Required";
    if (!form.usn.trim())      errs.usn       = "Required";
    if (!form.branch)          errs.branch    = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errs.email = "Valid email required";
    if (!form.phone.match(/^(\+91)?[6-9]\d{9}$/))        errs.phone = "Valid Indian mobile required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError("");
    try {
      const payload: RegistrationPayload = {
        teamName: form.teamName,
        fullName: form.fullName,
        semester: form.semester,
        usn:      form.usn,
        branch:   form.branch,
        email:    form.email,
        phone:    form.phone,
      };
      const result = await submitRegistration("IPL", payload);
      if (result.success) {
        setSubmitted(true);
      } else {
        setServerError(result.message ?? "Something went wrong. Please try again.");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setServerError(message || "Unable to submit. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = "#bef264");
  const blurBorder  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) =>
    (e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)");

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(5px)", paddingTop: "80px" }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full overflow-y-auto"
        style={{ maxWidth: "580px", maxHeight: "90vh", background: "#0a0a0a", borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow: "0 0 0 1px rgba(190,242,100,0.08), 0 0 40px rgba(190,242,100,0.12), 0 24px 64px rgba(0,0,0,0.65)" }}
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{    scale: 0.94, opacity: 0, y: 16 }}
        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top lime strip */}
        <div style={{ height: "3px", background: "#bef264", borderRadius: "24px 24px 0 0" }} />

        <div style={{ padding: "28px 28px 32px" }}>
          {/* Close */}
          <button onClick={onClose} className="absolute top-5 right-5 flex items-center justify-center rounded-full"
            style={{ width:"32px", height:"32px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.10)", color:"#fff", cursor:"pointer" }}>
            <X size={14} />
          </button>

          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div style={{ width:"56px", height:"56px", borderRadius:"50%", background:"#bef264", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
                <CheckCircle size={28} style={{ color:"#000" }} />
              </div>
              <h3 className="font-black text-white" style={{ fontSize:"20px", letterSpacing:"-0.02em" }}>Registration Received!</h3>
              <p style={{ fontSize:"13px", color:"rgba(255,255,255,0.50)", lineHeight:1.7 }}>
                Thanks, <strong style={{ color:"#bef264" }}>{form.fullName}</strong>! Your spot has been noted. We&rsquo;ll be in touch soon.
              </p>
              <button onClick={onClose} className="rounded-full font-black uppercase"
                style={{ background:"#bef264", color:"#000", border:"none", padding:"11px 24px", fontSize:"12px", letterSpacing:"0.10em", cursor:"pointer", marginTop:"8px" }}>
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="mb-6">
                <h3 className="font-black text-white" style={{ fontSize:"18px", letterSpacing:"-0.02em", marginBottom:"4px" }}>Team Registration</h3>
                <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.40)" }}>IPL Hackathon — Entry Free</p>
              </div>

              {/* Team Name */}
              <div>
                <FieldLabel>Team Name *</FieldLabel>
                <input placeholder="Enter your team name" value={form.teamName} onChange={set("teamName")}
                  onFocus={focusBorder} onBlur={blurBorder} style={INPUT_STYLE} />
                {errors.teamName && <p style={{ fontSize:"10px", color:"#f87171", marginTop:"4px" }}>{errors.teamName}</p>}
              </div>

              {/* Full Name */}
              <div>
                <FieldLabel>Full Name *</FieldLabel>
                <input placeholder="Your Name" value={form.fullName} onChange={set("fullName")}
                  onFocus={focusBorder} onBlur={blurBorder} style={INPUT_STYLE} />
                {errors.fullName && <p style={{ fontSize:"10px", color:"#f87171", marginTop:"4px" }}>{errors.fullName}</p>}
              </div>

              {/* Semester */}
              <div>
                <FieldLabel>Semester *</FieldLabel>
                <select value={form.semester} onChange={set("semester")}
                  onFocus={focusBorder} onBlur={blurBorder} style={SELECT_STYLE} className="dark-select">
                  <option value="" disabled>Select Semester</option>
                  {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.semester && <p style={{ fontSize:"10px", color:"#f87171", marginTop:"4px" }}>{errors.semester}</p>}
              </div>

              {/* USN */}
              <div>
                <FieldLabel>USN *</FieldLabel>
                <input placeholder="Enter your USN (ex., 1BY24AI403)" value={form.usn} onChange={set("usn")}
                  onFocus={focusBorder} onBlur={blurBorder} style={INPUT_STYLE} />
                {errors.usn && <p style={{ fontSize:"10px", color:"#f87171", marginTop:"4px" }}>{errors.usn}</p>}
              </div>

              {/* Branch */}
              <div>
                <FieldLabel>Branch *</FieldLabel>
                <select value={form.branch} onChange={set("branch")}
                  onFocus={focusBorder} onBlur={blurBorder} style={SELECT_STYLE} className="dark-select">
                  <option value="" disabled>Select Branch</option>
                  {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.branch && <p style={{ fontSize:"10px", color:"#f87171", marginTop:"4px" }}>{errors.branch}</p>}
              </div>

              {/* Email */}
              <div>
                <FieldLabel>Email *</FieldLabel>
                <input type="email" placeholder="1by24ai403@bmsit.in" value={form.email} onChange={set("email")}
                  onFocus={focusBorder} onBlur={blurBorder} style={INPUT_STYLE} />
                {errors.email && <p style={{ fontSize:"10px", color:"#f87171", marginTop:"4px" }}>{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <FieldLabel>Phone *</FieldLabel>
                <input type="tel" placeholder="+91 XXXXXXXXXX" value={form.phone} onChange={set("phone")}
                  onFocus={focusBorder} onBlur={blurBorder} style={INPUT_STYLE} />
                {errors.phone && <p style={{ fontSize:"10px", color:"#f87171", marginTop:"4px" }}>{errors.phone}</p>}
              </div>

              {/* Server error */}
              {serverError && (
                <p style={{ fontSize: "12px", color: "#f87171", background: "rgba(248,113,113,0.10)", border: "1px solid rgba(248,113,113,0.20)", borderRadius: "8px", padding: "10px 12px" }}>
                  {serverError}
                </p>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={submitting} className="flex-1 rounded-full font-black uppercase inline-flex items-center justify-center gap-2"
                  style={{ background:"#bef264", color:"#000", border:"none", padding:"13px", fontSize:"12px", letterSpacing:"0.10em", cursor: submitting ? "default" : "pointer", opacity: submitting ? 0.75 : 1, transition:"filter 250ms ease" }}
                  onMouseEnter={e=>{ if(!submitting) e.currentTarget.style.filter="brightness(1.08)" }}
                  onMouseLeave={e=>{ e.currentTarget.style.filter="brightness(1)" }}>
                  {submitting ? <><Loader2 size={14} className="animate-spin" /> Submitting…</> : "Submit Registration"}
                </button>
                <button type="button" onClick={onClose} disabled={submitting} className="rounded-full font-black uppercase"
                  style={{ background:"transparent", color:"rgba(255,255,255,0.60)", border:"1px solid rgba(255,255,255,0.18)", padding:"13px 18px", fontSize:"12px", letterSpacing:"0.10em", cursor: submitting ? "default" : "pointer" }}>
                  Cancel
                </button>
              </div>
            </form>
          )}
          </div>
      </motion.div>
    </motion.div>
  );

}

export default function ImpromptuPromptLeaguePage() {
    // Event End Date & Time
    // Format: YYYY-MM-DDTHH:mm:ss
    const eventDate = new Date("2026-08-20T09:00:00");

    const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    });

    const [isPast, setIsPast] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [btnChecking, setBtnChecking] = useState(false);

    // ── Live seat availability via reusable hook ──────────────────────
    const seatInfo = useSeatAvailability("IPL", 120);

    const detailRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
    const updateCountdown = () => {
        const now = new Date();

        const difference = eventDate.getTime() - now.getTime();

        if (difference <= 0) {
        setIsPast(false);

        setTimeLeft({
            days: "00",
            hours: "00",
            minutes: "00",
            seconds: "00",
        });

        return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
        );

        const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) /
        (1000 * 60)
        );

        const seconds = Math.floor(
        (difference % (1000 * 60)) /
        1000
        );

        setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
        });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);

    }, []);
  return (
    <main style={{ background: "#f5f0eb" }}>

      {/* ════════════════════════════════════════
          HERO — unchanged from original
          ════════════════════════════════════════ */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">

        <Image src="/ipl hero.jpg" alt="Impromptu Prompt League" fill priority className="object-cover" />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

        <div className="relative z-20 flex h-full items-start lg:items-end">
          <div className="mx-auto w-full max-w-[1500px] px-10 pt-24 pb-28 lg:pt-0 lg:px-24 xl:px-32">

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Link href="/events" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/80 transition hover:text-lime-300">
                <ArrowLeft size={16} /> Back to Events
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8 flex flex-wrap gap-3">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black uppercase tracking-[0.08em]"
                style={{
                  background: eventStatusMeta.bg,
                  color: eventStatusMeta.color,
                }}
              >
                {eventStatusMeta.dot && (
                  <span className="block w-2 h-2 rounded-full bg-red-600 animate-pulse flex-shrink-0" />
                )}
                {eventStatusLabel}
              </span>
              <span className="rounded-full border border-white/30 bg-white/10 px-6 py-2 text-sm font-semibold uppercase text-white backdrop-blur-md">Hackathon</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 45 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
              className="max-w-5xl text-6xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white lg:text-8xl"
            >
              Impromptu<br />Prompt League
            </motion.h1>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="my-10 h-px bg-white/20" />

            

            <motion.div
              initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
              className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="flex items-center gap-6 sm:gap-14 flex-wrap items-center">
                {[
                  { label: "Location", icon: <MapPin     size={20} className="text-lime-300" />, value: "BMSIT&M"     },
                  { label: "Date",     icon: <CalendarDays size={20} className="text-lime-300" />, value: "21 May 2026" },
                  { label: "Duration", icon: <Clock3     size={20} className="text-lime-300" />, value: "9 Hours (9AM to 6PM)"     },
                ].map(m => (
                  <div key={m.label} className="flex items-center gap-3 min-w-0">
                    <p className="mr-2 mb-0 text-[10px] uppercase tracking-[0.28em] text-white/60 hidden sm:block">{m.label}</p>
                    <div className="flex items-center gap-2 text-sm sm:text-2xl font-semibold text-white min-w-0">
                      <span className="flex-shrink-0">{m.icon}</span>
                      <span className="whitespace-normal break-words sm:truncate">{m.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="inline-flex items-center gap-3 rounded-full bg-white px-9 py-5 text-lg font-bold text-black transition hover:bg-lime-300">
                  Explore Event <ArrowDown size={20} />
                </button>
                <button className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white hover:text-black">
                  <Share2 size={22} />
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          DETAIL SECTION
          ════════════════════════════════════════ */}
      <section ref={detailRef} className="w-full px-10 lg:px-24 xl:px-32" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <div className="max-w-[900px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 xl:gap-14 items-start">

            {/* ── LEFT ─────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.68, ease: EASE }}
              className="space-y-10"
            >
              {/* About block */}
              <div>
                <p className="font-black uppercase mb-5" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", letterSpacing: "-0.01em", color: "#0a0a0a" }}>
                  About the Event
                </p>
              </div>

              {/* Story block */}
              <div>
                <p className="font-black uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.20em", color: "#aaa" }}>
                  What is it ?
                </p>
                <div className="space-y-5" style={{ maxWidth: "680px" }}>
                  {[
                    "The Impromptu Prompt League is our premier prompt engineering competition bringing together passionate prompt engineers, innovators, and problem solvers.",
                    "This intensive event features real-world prompt engineering challenges across two competitive rounds — Exploration followed by Implementation — culminating in exciting prompt battles judged by external jury members from the industry.",
                    "Whether you're an experienced prompt engineer or an enthusiastic beginner, this competition offers a platform to showcase your skills, learn from peers, and network with industry professionals. Top performers may also receive recognition and prizes, making it a must-attend event for anyone passionate about prompt engineering.",
                  ].map((para, i) => (
                    <p key={i} style={{ fontSize: "16px", color: "#444", lineHeight: 1.85, textAlign: "justify" }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>

              {/* ── Timeline ──────────────────────────────── */}
              <div>
                <p className="font-black uppercase mb-8" style={{ fontSize: "10px", letterSpacing: "0.20em", color: "#aaa" }}>
                  Event Schedule
                </p>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-[19px]"
                    style={{ width: "2px", background: "linear-gradient(to bottom, #bef264 0%, rgba(190,242,100,0.15) 100%)" }} />
                  <div className="space-y-0">
                    {[
                      { icon: <Users size={14}/>,      time: "8:45 AM – 9:30 AM",  title: "Registration",             body: "Participants check in and receive their event materials." },
                      { icon: <Star  size={14}/>,      time: "9:45 AM – 11:00 AM", title: "Inauguration",             body: "Official opening with chief guests, keynote addresses, and setting the stage." },
                      { icon: <Coffee size={14}/>,     time: "11:00 AM – 11:15 AM",title: "Tea Break",                body: "A short refreshment break to recharge before the challenges begin." },
                      { icon: <Zap  size={14}/>,       time: "11:15 AM – 12:00 PM",title: "Ice Breaker",              body: "Warm-up prompt challenges to get participants into the competitive mindset." },
                      { icon: <Mic2  size={14}/>,      time: "12:00 PM – 1:30 PM", title: "Speakers Session",         body: "Industry experts share insights on AI, prompt engineering, and the future of intelligent systems." },
                      { icon: <CheckCircle size={14}/>,time: "1:30 PM – 4:00 PM",  title: "Main Session",             body: "The core competition — two intensive rounds of prompt engineering challenges." },
                      { icon: <Star  size={14}/>,      time: "4:00 PM – 4:15 PM",  title: "Announcements of Top 7",   body: "Shortlisted finalists announced for the pitching round." },
                      { icon: <Mic2  size={14}/>,      time: "4:15 PM – 5:30 PM",  title: "Pitching",                body: "Top 7 participants present their approaches to the jury panel." },
                      { icon: <CheckCircle size={14}/>,time: "5:30 PM – 5:45 PM",  title: "Evaluation & Feedback",   body: "Jury deliberation and constructive feedback delivered to participants." },
                      { icon: <Trophy size={14}/>,     time: "5:45 PM – 6:00 PM",  title: "Winner Announcement",     body: "Champions crowned and prizes awarded in the closing ceremony." },
                    ].map((item, i, arr) => (
                      <motion.div key={item.title}
                        initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.50, delay: i * 0.06, ease: EASE }}
                        className="flex gap-6"
                        style={{ paddingBottom: i < arr.length - 1 ? "28px" : "0" }}>
                        <div className="flex flex-col items-center flex-shrink-0" style={{ width: "40px" }}>
                          <div className="flex items-center justify-center rounded-full z-10"
                            style={{ width: "40px", height: "40px", background: "#0a0a0a", border: `2px solid ${LIME}`, color: LIME, flexShrink: 0 }}>
                            {item.icon}
                          </div>
                        </div>
                        <div style={{ paddingTop: "8px" }}>
                          <p style={{ fontSize: "10px", fontWeight: 700, color: "#aaa", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "3px" }}>{item.time}</p>
                          <h4 className="font-black" style={{ fontSize: "14px", color: "#0a0a0a", letterSpacing: "-0.01em", marginBottom: "3px" }}>{item.title}</h4>
                          <p style={{ fontSize: "12px", color: "#777", lineHeight: 1.6 }}>{item.body}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT ────────────────────────────────── */}
            <div className="flex flex-col gap-5">

              {/* Card 1 — Registration Status */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.62, delay: 0.10, ease: EASE }}
                style={{
                  background:   "#0a0a0a",
                  borderRadius: "18px",
                  padding:      "26px 16px 22px",
                  minHeight:    "190px",
                  border:       `2px solid ${LIME}`,
                  boxShadow:    `0 0 0 1px rgba(190,242,100,0.15), 0 0 16px rgba(190,242,100,0.50), 0 0 48px rgba(190,242,100,0.25), inset 0 1px 0 rgba(190,242,100,0.12)`,
                }}
              >
                <p className="font-black uppercase text-center mb-5" style={{ fontSize: "10px", letterSpacing: "0.22em", color: LIME }}>
                  Registration Status
                </p>

                {/* Countdown numbers */}
                <div className="grid grid-cols-4 gap-1 mb-5">
                <CountUnit value={timeLeft.days} label="Days" />
                <CountUnit value={timeLeft.hours} label="Hrs" />
                <CountUnit value={timeLeft.minutes} label="Min" />
                <CountUnit value={timeLeft.seconds} label="Sec" />
                </div>

                <button
                  disabled={isPast || seatInfo.loading || !seatInfo.canRegister || btnChecking}
                  onClick={async () => {
                    if (isPast || !seatInfo.canRegister) return;
                    setBtnChecking(true);
                    const stillOpen = await seatInfo.refreshAvailability();
                    setBtnChecking(false);
                    if (stillOpen) setModalOpen(true);
                  }}
                  className="w-full font-black uppercase rounded-xl py-3.5 inline-flex items-center justify-center gap-2"
                  style={{
                    fontSize:      "12px",
                    letterSpacing: "0.12em",
                    background:    (!seatInfo.canRegister && !seatInfo.loading)
                      ? "rgba(190,242,100,0.35)"
                      : LIME,
                    color:         "#000",
                    border:        "none",
                    cursor:        (isPast || !seatInfo.canRegister || seatInfo.loading || btnChecking)
                      ? "default"
                      : "pointer",
                    transition:    "background 250ms ease",
                  }}
                >
                  {isPast ? (
                    "Event Completed"
                  ) : seatInfo.loading ? (
                    <><Loader2 size={13} className="animate-spin" /> Loading…</>
                  ) : btnChecking ? (
                    <><Loader2 size={13} className="animate-spin" /> Reserving a Seat…</>
                  ) : !seatInfo.canRegister ? (
                    "Registrations Closed"
                  ) : (
                    "Click to Register"
                  )}
                </button>
                <SeatsTracker
                  loading={seatInfo.loading}
                  remainingSeats={seatInfo.remainingSeats}
                  totalSeats={seatInfo.totalSeats}
                  status={seatInfo.status}
                />
              </motion.div>

              {/* Card 2 — Rewards (lime, matches reference) */}
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.62, delay: 0.24, ease: EASE }}
                style={{
                  background:   LIME,
                  borderRadius: "18px",
                  padding:      "16px",
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-5">
                  <Trophy size={16} style={{ color: "#000" }} />
                  <p className="font-black uppercase" style={{ fontSize: "13px", letterSpacing: "0.14em", color: "#000" }}>
                    Rewards
                  </p>
                </div>

                {/* Prize rows */}
                <div className="space-y-0">
                  {[
                    { place: "#1 Winner Prize",      amount: "3,000" },
                    { place: "#2 First Runner Up",   amount: "2,000" },
                    { place: "#3 Second Runner Up",  amount: "1,000" },
                  ].map((prize, i, arr) => (
                    <div
                      key={prize.place}
                      className="flex items-center justify-between py-3"
                      style={{
                        borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.12)" : "none",
                      }}
                    >
                      <span style={{ fontSize: "9px", fontWeight: 700, color: "rgba(0,0,0,0.50)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                        {prize.place}
                      </span>
                      <span className="font-black" style={{ fontSize: "18px", color: "#000", letterSpacing: "-0.03em" }}>
                        {prize.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          AT A GLANCE
          ════════════════════════════════════════ */}
      <section style={{ background: "#f5f0eb", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[900px] mx-auto px-10 lg:px-24 xl:px-32">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.65, ease: EASE }}
            className="mb-10">
            <p className="font-black uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.22em", color: "#aaa" }}>At a Glance</p>
            <h2 className="font-black" style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", letterSpacing: "-0.03em", color: "#0a0a0a" }}>
              The competition in <span style={{ fontStyle: "italic", fontWeight: 400, fontFamily: "Georgia, serif" }}>numbers</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: "₹", value: "6,000", label: "Prize Pool"          },
              { icon: "👥", value: "120",   label: "Max Participants"   },
              { icon: "🎯", value: "2",     label: "Competitive Rounds" },
              { icon: "⏱",  value: "9",     label: "Hours of Competing" },
            ].map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
                style={{ background: "#fff", borderRadius: "16px", padding: "22px 20px", border: "1px solid #e8e8e8", boxShadow: "0 2px 10px rgba(0,0,0,0.055)" }}>
                <div style={{ fontSize: "20px", marginBottom: "10px" }}>{s.icon}</div>
                <p className="font-black leading-none mb-1" style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", letterSpacing: "-0.04em", color: "#0a0a0a" }}>{s.value}</p>
                <p style={{ fontSize: "9px", fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.18em" }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: 0.28, ease: EASE }}
            style={{ background: "#fff", borderRadius: "16px", padding: "24px", border: `1px solid ${LIME}` }}>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#555", marginBottom: "8px" }}>Open to all · Individual participation · Solo challenge</p>
            <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.75, marginBottom: "14px" }}>
              Whether you&rsquo;re a seasoned prompt engineer or a curious beginner — all are welcome.
            </p>
            <div className="flex flex-wrap gap-4">
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#0a0a0a" }}>Capacity: <span style={{ color: LIME.replace("#bef264","#7aaf00") }}>120 participants</span></span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#0a0a0a" }}>Prizes: <span style={{ color: LIME.replace("#bef264","#7aaf00") }}>₹6,000 pool</span></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CHIEF GUESTS & SPEAKERS
          ════════════════════════════════════════ */}
      <section style={{ background: "#0a0a0a", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[900px] mx-auto px-10 lg:px-24 xl:px-32">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.65, ease: EASE }}
            className="mb-10">
            <p className="font-black uppercase mb-2" style={{ fontSize: "10px", letterSpacing: "0.22em", color: LIME }}>Chief Guests & Speakers</p>
            <h2 className="font-black text-white" style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", letterSpacing: "-0.03em" }}>Honoured <span style={{ fontStyle: "italic", fontWeight: 400, fontFamily: "Georgia, serif" }}>guests</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { role: "Chief Guest", name: "Dr. Parthasarathi", title: "PALS Champion", desc: "A distinguished leader and champion of the PALS community, bringing invaluable insights and mentorship to aspiring prompt engineers.", delay: 0.08 },
              { role: "Chief Guest", name: "Dr. N P Rajamane",  title: "Former Founder and Head, Scientist\nAML-CSIR-SERC, Chennai", desc: "A renowned scientist and former head of AML at CSIR-SERC, bringing decades of research expertise and innovation to guide the next generation of AI practitioners.", delay: 0.18 },
              { role: "Esteemed Speaker", name: "Dr. Satyadhyan Chickerur", title: "Director, Centre for Artificial Intelligence\nKLE Technological University", desc: "A visionary leader in AI research and education, directing the Centre for AI at KLE Tech University, inspiring innovation and excellence in artificial intelligence.", delay: 0.28 },
            ].map(g => (
              <motion.div key={g.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.60, delay: g.delay, ease: EASE }}
                style={{ background: "#161616", borderRadius: "20px", padding: "24px", border: "1px solid rgba(255,255,255,0.07)" }}>
                {/* Avatar placeholder */}
                {/* <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: `linear-gradient(135deg, ${LIME}55, ${LIME}22)`, border: `2px solid ${LIME}55`, marginBottom: "16px" }} /> */}
                <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: LIME, marginBottom: "6px" }}>{g.role}</p>
                <h3 className="font-black text-white" style={{ fontSize: "15px", letterSpacing: "-0.01em", marginBottom: "4px" }}>{g.name}</h3>
                <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)", lineHeight: 1.55, marginBottom: "12px", whiteSpace: "pre-line" }}>{g.title}</p>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          TWO ROUNDS · ONE CHAMPION
          ════════════════════════════════════════ */}
      <section style={{ background: "#111114", paddingTop: "80px", paddingBottom: "80px" }}>
        <div className="max-w-[900px] mx-auto px-10 lg:px-24 xl:px-32">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.65, ease: EASE }}
            className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-5"
              style={{ border: `1px solid ${LIME}44`, background: `${LIME}10`, fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: LIME }}>
              Two Rounds · One Champion
            </span>
            <h2 className="font-black text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.03em" }}>
              The path to <span style={{ fontStyle: "italic", fontWeight: 400, fontFamily: "Georgia, serif" }}>victory</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { num: "Round 01", title: "Exploration", accent: "#0ea5e9",
                desc: "Participants tackle real-world prompt engineering challenges, exploring creative and technical approaches to craft effective, precise prompts.",
                tags: ["Creativity","Precision","Problem Solving","AI Thinking"], delay: 0.10 },
              { num: "Round 02", title: "Implementation", accent: "#7c3aed",
                desc: "The elite prompt battles — shortlisted participants go head-to-head in high-stakes implementation challenges evaluated by industry jury members.",
                tags: ["Prompt Battles","Live Evaluation","Industry Jury","High Stakes"], delay: 0.22 },
            ].map(r => (
              <motion.div key={r.num}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.60, delay: r.delay, ease: EASE }}
                style={{ background: "#1a1a1e", borderRadius: "20px", padding: "28px", border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 20% 20%, ${r.accent}20 0%, transparent 60%)`, pointerEvents: "none" }} />
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: r.accent, marginBottom: "8px" }} className="relative z-10">{r.num}</p>
                <h3 className="font-black text-white relative z-10" style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", letterSpacing: "-0.02em", marginBottom: "12px" }}>{r.title}</h3>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: "20px" }} className="relative z-10">{r.desc}</p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {r.tags.map(t => (
                    <span key={t} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: "9999px", padding: "4px 10px", fontSize: "9px", fontWeight: 700, color: "rgba(255,255,255,0.65)", letterSpacing: "0.10em", textTransform: "uppercase" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          YOUR MOVE — Final CTA
          ════════════════════════════════════════ */}
      <IPLCta />

      {/* Registration modal */}
      <AnimatePresence>
        {modalOpen && <RegistrationModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>

    </main>
  );
}

// ─── IPL Final CTA ────────────────────────────────────────────────────────
function IPLCta() {
  const [hov, setHov] = useState(false);
  return (
    <section style={{ background: "#f5f0eb", paddingTop: "80px", paddingBottom: "100px" }}>
      <div className="max-w-[900px] mx-auto px-10 lg:px-24 xl:px-32">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.68, ease: EASE }}
          style={{ background: "#0a0a0a", borderRadius: "28px", padding: "clamp(40px,7vw,72px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${LIME}16 0%, transparent 70%)`, pointerEvents: "none" }} />
          <p className="font-black uppercase relative z-10" style={{ fontSize: "10px", letterSpacing: "0.22em", color: LIME, marginBottom: "12px" }}>Your Move</p>
          <h2 className="font-black text-white relative z-10" style={{ fontSize: "clamp(2rem, 5vw, 3.8rem)", letterSpacing: "-0.03em", marginBottom: "16px" }}>
            Ready to engineer it?
          </h2>
          <p style={{ fontSize: "15px", color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: "520px", margin: "0 auto 20px", position: "relative", zIndex: 10 }}>
            The Impromptu Prompt League is your stage to prove that the right words, framed the right way, can unlock anything.
          </p>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.35)", marginBottom: "6px", position: "relative", zIndex: 10 }}>
            20 Aug 2026 · 9:00 AM – 6:00 PM · 2nd Floor Seminar Hall, Academic Block, BMSIT
          </p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.28)", marginBottom: "32px", position: "relative", zIndex: 10 }}>
            Open to all · Spots limited to 120 participants
          </p>
          <div className="relative z-10">
            <Link href="/events">
              <button onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                className="inline-flex items-center gap-3 rounded-full font-bold"
                style={{ fontSize: "14px", letterSpacing: "0.04em", padding: "14px 28px",
                  background: hov ? LIME : "#fff", color: "#000", border: "none", cursor: "pointer",
                  transition: "background 280ms ease" }}>
                See All Events
                <span style={{ display: "inline-flex", transform: hov ? "rotate(0deg)" : "rotate(-45deg)", transition: "transform 280ms cubic-bezier(0.34,1.56,0.64,1)" }}>
                  <ArrowRight size={17} strokeWidth={2.5} />
                </span>
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
