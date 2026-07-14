'use client'

import { ParallaxBackground } from './parallax-background'
import { CursorGlow }         from './cursor-glow'

/**
 * SceneWrapper — renders the fixed background layers that appear on every page.
 * Mounted once in the root layout so there is no re-mount on navigation.
 */
export function SceneWrapper() {
  return (
    <>
      <ParallaxBackground />
      {/* <CursorGlow /> */}
    </>
  )
}
