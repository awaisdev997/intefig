import { Component, lazy, Suspense, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { LOGO_WHITE as logoWhite } from '../assets/logoData'
import { LOGO_INK as logoInk } from '../assets/logoData'

/**
 * Hero presentation of the original INTEFIG logo as a Componentry
 * "Dithered Logo" particle field (canvas 2D, lazy-loaded so it never
 * blocks first paint).
 *
 * Asset notes (verified against the vendored component's sampling code):
 * the white logo (src/assets/logoData.ts) is the original artwork with
 * RGB set to white; its bright pixels (luma 255 inside the alpha
 * silhouette) are used with `invert={false}`, filling the artwork with
 * full-density particles.
 *
 * Fallbacks — all render the static ink logo at the same size:
 * - prefers-reduced-motion (checked synchronously on first render, so no
 *   canvas is ever mounted in that case),
 * - canvas 2D unsupported,
 * - the lazy chunk or the canvas component erroring.
 * While the chunk loads, the static logo shows as the Suspense fallback.
 */

const DitheredLogo = lazy(() => import('./ui/dithered-logo'))

/** 813×251 artwork aspect; also the `scale` that makes the particle field
 *  fill a stage with this aspect (field size = min(stageW, stageH) × scale). */
const LOGO_ASPECT = 813 / 251

/** Swallows canvas-component errors so a broken effect can't crash the hero. */
class CanvasBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onError()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function supportsCanvas2D(): boolean {
  try {
    return !!document.createElement('canvas').getContext('2d')
  } catch {
    return false
  }
}

export function DitheredLogoHero({ className = '' }: { className?: string }) {
  const hookReduced = useReducedMotion()
  // Synchronous first-render check: with reduced motion the canvas branch
  // below is never rendered at all (the hook alone only reports after mount).
  const [initialReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [canvasOk] = useState(supportsCanvas2D)
  const [failed, setFailed] = useState(false)

  if (initialReduced || hookReduced || !canvasOk || failed) {
    return (
      <div className={className}>
        <img src={logoInk} alt="INTEFIG logo" className="h-full w-full object-contain" width={813} height={251} />
      </div>
    )
  }

  return (
    <div className={className}>
      <span className="sr-only">INTEFIG</span>
      <div aria-hidden="true" className="h-full w-full">
        <CanvasBoundary onError={() => setFailed(true)}>
          <Suspense
            fallback={<img src={logoInk} alt="" className="h-full w-full object-contain" width={813} height={251} />}
          >
            <DitheredLogo
              imageSrc={logoWhite}
              particleColor="#3B3F42"
              invert={false}
              gridSize={300}
              blur={2}
              scale={LOGO_ASPECT}
              className="h-full w-full"
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </CanvasBoundary>
      </div>
    </div>
  )
}
