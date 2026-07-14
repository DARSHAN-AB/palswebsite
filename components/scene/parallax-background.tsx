'use client'

import { useEffect, useRef } from 'react'

/**
 * ParallaxBackground
 * Moves the space-bg image and optional nebula layer with mouse position.
 * Uses RAF + lerp so movement feels heavy and cinematic — never instant.
 * Layer depths:
 *   bg   (nebula)  →  mouse × 0.12
 *   deep (stars)   →  mouse × 0.05   (handled by StarField via CSS var)
 */
export function ParallaxBackground() {
  const bgRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let currentX = 0
    let currentY = 0
    let targetX = 0
    let targetY = 0
    let rafId = 0

    const LERP = 0.06          // interpolation factor — lower = heavier feel
    const MAX = 20             // max ±px travel

    const onMouseMove = (e: MouseEvent) => {
      // Normalise to –1…1
      const nx = (e.clientX / window.innerWidth  - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      targetX = -nx * MAX
      targetY = -ny * MAX
    }

    const tick = () => {
      currentX += (targetX - currentX) * LERP
      currentY += (targetY - currentY) * LERP

      if (bgRef.current) {
        bgRef.current.style.transform =
          `translate3d(${currentX}px,${currentY}px,0) scale(1.08)`
      }

      // Expose as CSS vars for star layer (parallax depth 0.05)
      document.documentElement.style.setProperty(
        '--parallax-x', `${currentX * 0.42}px`
      )
      document.documentElement.style.setProperty(
        '--parallax-y', `${currentY * 0.42}px`
      )

      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    /* Wrapper clips the overscroll so nothing bleeds outside the viewport */
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]" aria-hidden="true">
      {/* Layer 2 — nebula / main BG  depth 0.12 */}
      <div
        ref={bgRef}
        className="absolute inset-[-5%] will-change-transform"
        style={{
          backgroundImage: "url('/images/space-bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  )
}
