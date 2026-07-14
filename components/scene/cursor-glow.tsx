'use client'

import { useEffect, useRef } from 'react'

/**
 * CursorGlow — soft radial white/blue glow that lazily chases the cursor.
 * Uses RAF + lerp for smooth interpolation (never snaps).
 * pointer-events: none so it never blocks interaction.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let curX = window.innerWidth  / 2
    let curY = window.innerHeight / 2
    let tgtX = curX
    let tgtY = curY
    let rafId = 0

    const LERP = 0.07

    const onMove = (e: MouseEvent) => {
      tgtX = e.clientX
      tgtY = e.clientY
    }

    const tick = () => {
      curX += (tgtX - curX) * LERP
      curY += (tgtY - curY) * LERP

      if (ref.current) {
        ref.current.style.transform =
          `translate3d(${curX - 200}px,${curY - 200}px,0)`
      }

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[2] will-change-transform"
      aria-hidden="true"
      style={{
        width: 400,
        height: 400,
        borderRadius: '50%',
        background:
          'radial-gradient(circle, rgba(125,211,252,0.10) 0%, rgba(56,189,248,0.05) 40%, transparent 70%)',
        filter: 'blur(40px)',
      }}
    />
  )
}
