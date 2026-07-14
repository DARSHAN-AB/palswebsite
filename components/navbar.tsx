'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Nav links ────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'Home',          href: '/' },
  { label: 'Events',        href: '/events' },
  { label: 'Gallery',       href: '/gallery' },
  { label: 'Announcements', href: '/announcements' },
  { label: 'Contact',       href: '/contact' },
] as const

function isActive(href: string, pathname: string) {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

// ─── Active-pill accent: golden-yellow matching the reference ─────────────
const ACTIVE_BG     = '#F5C518'          // warm gold / yellow
const ACTIVE_TEXT   = '#000000'
const INACTIVE_TEXT = 'rgba(255,255,255,0.75)'
const HOVER_TEXT    = '#ffffff'

// ─── Outer navbar: solid matte-black pill ─────────────────────────────────
const NAVBAR_BG = '#191919'              // #171717–#1A1A1A range

export function Navbar() {
  const pathname = usePathname()
  const [isOpen,    setIsOpen]   = useState(false)
  const [visible,   setVisible]  = useState(false)
  const [scrolled,  setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState(pathname)

  // entrance
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80)
    return () => clearTimeout(t)
  }, [])

  // compact slightly on scroll
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setActiveTab(pathname) }, [pathname])

  const navH     = scrolled ? '52px' : '58px'
  const topPad   = scrolled ? '8px'  : '14px'

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      style={{
        paddingTop:   topPad,
        paddingLeft:  '16px',
        paddingRight: '16px',
        transition:   'padding-top 350ms cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* ── Outer solid-black pill ─────────────────────────────────────── */}
      <motion.nav
        aria-label="Main navigation"
        className="pointer-events-auto w-full flex items-center justify-between"
        style={{
          maxWidth:     '920px',
          height:       navH,
          borderRadius: '9999px',
          background:   NAVBAR_BG,
          boxShadow:    '0 4px 24px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
          paddingLeft:  '20px',
          paddingRight: '20px',
          transition:   'height 350ms cubic-bezier(0.4,0,0.2,1)',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* ── LEFT: Logo ──────────────────────────────────────────────── */}
        <Link
          href="/"
          className="flex items-center gap-3 flex-shrink-0 select-none"
          style={{ transition: 'opacity 200ms ease' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.80')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          {/* Circular logo badge */}
          <div
            style={{
              width:        '34px',
              height:       '34px',
              borderRadius: '50%',
              background:   'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)',
              boxShadow:    '0 0 12px rgba(34,211,238,0.38)',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'center',
              flexShrink:   0,
            }}
          >
            <span style={{ color:'#fff', fontSize:'11px', fontWeight:900, letterSpacing:'-0.02em', lineHeight:1 }}>IH</span>
          </div>
          {/* Wordmark */}
          <span
            className="hidden sm:inline font-bold text-white"
            style={{ fontSize: '15px', letterSpacing: '-0.01em' }}
          >
            InnovatorsHub
          </span>
        </Link>

        {/* ── CENTER: Liquid-glass nav tab strip ──────────────────────── */}
        <div className="hidden lg:flex items-center flex-1 justify-center">
          {/* The glass pill wraps only the tab group */}
          <div
            className="flex items-center"
            style={{
              borderRadius:        '9999px',
              background:          'rgba(255,255,255,0.07)',
              backdropFilter:      'blur(12px)',
              WebkitBackdropFilter:'blur(12px)',
              border:              '1px solid rgba(255,255,255,0.10)',
              boxShadow:           'inset 0 1px 0 rgba(255,255,255,0.08)',
              padding:             '3px',
              gap:                 '1px',
            }}
          >
            {NAV_LINKS.map(link => {
              const active = isActive(link.href, activeTab)
              return (
                <NavItem
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={active}
                  onClick={() => { setActiveTab(link.href); setIsOpen(false) }}
                />
              )
            })}
          </div>
        </div>

        {/* ── RIGHT: Sign-In + Join Us ─────────────────────────────────── */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
          {/* Plain text link — matches reference "Sign-In" */}
          <Link
            href="/about"
            className="text-white font-medium select-none"
            style={{
              fontSize:   '13px',
              opacity:    0.80,
              transition: 'opacity 200ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.80')}
          >
            About Us
          </Link>

          {/* White pill button — matches reference "Join Arena" */}
          <Link
            href="/contact"
            className="font-semibold select-none"
            style={{
              fontSize:     '13px',
              color:        '#000',
              background:   '#ffffff',
              borderRadius: '9999px',
              padding:      '7px 18px',
              letterSpacing:'-0.01em',
              boxShadow:    '0 2px 8px rgba(0,0,0,0.30)',
              transition:   'transform 250ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 250ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform  = 'scale(1.04)'
              e.currentTarget.style.boxShadow  = '0 4px 14px rgba(0,0,0,0.40)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform  = 'scale(1)'
              e.currentTarget.style.boxShadow  = '0 2px 8px rgba(0,0,0,0.30)'
            }}
          >
            Join Arena
          </Link>
        </div>

        {/* ── Mobile hamburger ─────────────────────────────────────────── */}
        <button
          className="lg:hidden p-1.5 rounded-full text-white/70 hover:text-white"
          style={{
            background: 'rgba(255,255,255,0.08)',
            border:     '1px solid rgba(255,255,255,0.12)',
            transition: 'background 200ms ease',
          }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={16} /> : <Menu size={16} />}
        </button>

      </motion.nav>

      {/* ── Mobile dropdown ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full left-4 right-4 mt-2 pointer-events-auto"
            style={{ maxWidth: '920px', margin: '8px auto 0' }}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1,  y: 0,  scale: 1    }}
            exit={{    opacity: 0,  y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="flex flex-col gap-0.5 px-3 py-3 rounded-2xl"
              style={{
                background:          NAVBAR_BG,
                border:              '1px solid rgba(255,255,255,0.10)',
                boxShadow:           '0 8px 32px rgba(0,0,0,0.55)',
              }}
            >
              {NAV_LINKS.map(link => {
                const active = isActive(link.href, activeTab)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="font-medium px-4 py-2.5 rounded-full text-[13px]"
                    style={{
                      background: active ? ACTIVE_BG    : 'transparent',
                      color:      active ? ACTIVE_TEXT  : INACTIVE_TEXT,
                      transition: 'background 200ms ease, color 200ms ease',
                    }}
                    onClick={() => { setActiveTab(link.href); setIsOpen(false) }}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <div className="border-t border-white/10 mt-1.5 pt-2 flex flex-col gap-1.5">
                <Link
                  href="/about"
                  className="text-[13px] font-medium px-4 py-2 text-white/70"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="text-[13px] font-semibold px-4 py-2.5 rounded-full text-center text-black bg-white"
                  onClick={() => setIsOpen(false)}
                >
                  Join Us
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── NavItem — yellow active pill via Framer Motion layoutId ─────────────
interface NavItemProps {
  href:    string
  label:   string
  active:  boolean
  onClick: () => void
}

function NavItem({ href, label, active, onClick }: NavItemProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  return (
    <Link
      ref={ref}
      href={href}
      data-active={active}
      onClick={onClick}
      className="relative flex items-center justify-center select-none rounded-full z-10"
      style={{
        fontSize:     '13px',
        fontWeight:   active ? 700 : 500,
        color:        active ? ACTIVE_TEXT : INACTIVE_TEXT,
        padding:      '6px 11px',
        whiteSpace:   'nowrap',
        transition:   'color 200ms ease, transform 200ms ease',
        cursor:       'pointer',
      }}
      onMouseEnter={e => {
        if (!active) {
          e.currentTarget.style.color     = HOVER_TEXT
          e.currentTarget.style.transform = 'translateY(-1px)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          e.currentTarget.style.color     = INACTIVE_TEXT
          e.currentTarget.style.transform = 'translateY(0)'
        }
      }}
    >
      {/* Golden sliding pill behind the active item */}
      {active && (
        <motion.span
          layoutId="navbar-active-pill"
          className="absolute inset-0 rounded-full -z-10"
          style={{
            background: ACTIVE_BG,
            boxShadow:  '0 0 10px rgba(245,197,24,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
          }}
          transition={{
            type:      'spring',
            stiffness: 380,
            damping:   30,
            mass:      0.8,
          }}
        />
      )}
      {label}
    </Link>
  )
}
