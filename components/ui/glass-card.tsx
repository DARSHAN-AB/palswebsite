'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  /** Pass style={{ ... }} for one-off overrides without losing tilt behavior */
  style?: React.CSSProperties
}

/**
 * GlassCard — clear-glass wrapper with subtle VisionOS-style 3-D tilt and
 * moving light-reflection on hover.
 *
 * Uses the .glass-card CSS utility for consistent clear-glass styling
 * (background image fully visible through it). Inner children provide
 * their own rounded corners and padding.
 */
export function GlassCard({ children, className = '', style }: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const rect = card.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    const cx   = rect.width  / 2
    const cy   = rect.height / 2
    const MAX  = 3.5  // degrees — slightly less than before for elegance

    const rotX = ((relY - cy) / cy) * -MAX
    const rotY = ((relX - cx) / cx) *  MAX

    card.style.transform =
      `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.008,1.008,1.008)`

    const pctX = (relX / rect.width)  * 100
    const pctY = (relY / rect.height) * 100
    glow.style.background =
      `radial-gradient(circle at ${pctX}% ${pctY}%, rgba(255,255,255,0.10) 0%, transparent 55%)`
    glow.style.opacity = '1'
  }

  const onMouseLeave = () => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    glow.style.opacity   = '0'
  }

  return (
    <div
      ref={cardRef}
      className={`relative will-change-transform transition-transform duration-300 ease-out ${className}`}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Travelling light-reflection overlay */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 transition-opacity duration-300 z-10"
        aria-hidden="true"
      />
      {children}
    </div>
  )
}
