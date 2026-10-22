import { Component, lazy, Suspense, useState } from 'react'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { LOGO_DITHER, LOGO_DITHER_ASPECT } from '../assets/logoData'
import { LogoLockup } from './Logo'

/**
 * Hero presentation of the INTEFIG logo (symbol + wordmark, matching the
 * owner's app-icon identity) as a Componentry "Dithered Logo" particle
 * field (canvas 2D, lazy-loaded so it never blocks first paint).
 *
 * Asset notes: the dither source (src/assets/logoData.ts) is the lockup
 * rendered as a white silhouette on transparency; its bright pixels
 * (luma 255 inside the alpha silhouette) are used with `invert={false}`,
 * filling the artwork with full-density ink particles.
 *
 * Fallbacks — all render the static vector lockup at the same stage size:
 * - prefers-reduced-motion (checked synchronously on first render, so no
 *   canvas is ever mounted in that case),
 * - canvas 2D unsupported,
 * - the lazy chunk or the canvas component erroring.
 * While the chunk loads, the static lockup shows as the Suspense fallback.
 */

const DitheredLogo = lazy(() => import('./ui/dithered-logo'))

function StaticLockup() {
  return (
    <div className="flex h-full w-full items-center justify-center" role="img" aria-label="INTEFIG logo">
      <LogoLockup variant="light" idSuffix="hero" markClassName="h-14 w-14 md:h-[4.5rem] md:w-[4.5rem]" textClassName="text-[2.6rem] md:text-[3.4rem]" />
    </div>
  )
}

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
        <StaticLockup />
      </div>
    )
  }

  return (
    <div className={className}>
      <span className="sr-only">INTEFIG</span>
      <div aria-hidden="true" className="h-full w-full">
        <CanvasBoundary onError={() => setFailed(true)}>
          <Suspense fallback={<StaticLockup />}>
            <DitheredLogo
              imageSrc={LOGO_DITHER}
              particleColor="#3B3F42"
              invert={false}
              gridSize={300}
              blur={2}
              scale={LOGO_DITHER_ASPECT}
              className="h-full w-full"
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </CanvasBoundary>
      </div>
    </div>
  )
}
