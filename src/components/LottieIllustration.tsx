import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { LottieRefCurrentProps } from 'lottie-react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/**
 * Reusable, performance-first Lottie illustration.
 *
 * - The lottie-react player is code-split (React.lazy) and only rendered once
 *   the animation JSON has been fetched.
 * - The JSON itself is fetched via `loadData` only when the component comes
 *   within 300px of the viewport (unless `eager`, used for the hero).
 * - Playback runs only while the component is actually on screen; it pauses
 *   when scrolled away.
 * - Under prefers-reduced-motion nothing autoplays: a single representative
 *   frame (~55% through the animation) is shown instead.
 * - Any failure (JSON fetch, player chunk, player error) renders an empty,
 *   correctly-sized container — a decorative animation must never crash or
 *   shift the layout of the section around it.
 */

const LottiePlayer = lazy(() => import('lottie-react'))

/** Swallows player load/render errors so a broken animation can't crash a section. */
class PlayerBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

export interface LottieIllustrationProps {
  /** Dynamic import of the animation JSON, e.g. () => import('../assets/lottie/hero-envelope.json') */
  loadData: () => Promise<{ default: object }>
  /** Sizing/positioning classes for the (always rendered) outer box. */
  className?: string
  /** Load immediately instead of waiting until near the viewport (hero). */
  eager?: boolean
  /** Playback speed multiplier. Default 1. */
  speed?: number
  /** Accessible label. Without one the illustration is treated as decorative. */
  label?: string
  /** Restrict playback to a frame range, e.g. trim an empty tail before looping. */
  segment?: [number, number]
  /** Frame (0–1) parked on under reduced motion. Default 0.55. */
  staticFrame?: number
}

export function LottieIllustration({ loadData, className = '', eager = false, speed = 1, label, segment, staticFrame = 0.55 }: LottieIllustrationProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<LottieRefCurrentProps | null>(null)
  const reduced = useReducedMotion()
  const [near, setNear] = useState(eager)
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState<object | null>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  // Begin loading once the component approaches the viewport.
  useEffect(() => {
    if (eager) return
    const el = rootRef.current
    if (!el) return
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          ob.disconnect()
        }
      },
      { rootMargin: '300px' },
    )
    ob.observe(el)
    return () => ob.disconnect()
  }, [eager])

  // Track real on-screen visibility for play/pause.
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ob = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [])

  // Fetch the animation JSON (module imports are cached, so remounts are free).
  useEffect(() => {
    if (!near || data || failed) return
    let alive = true
    loadData()
      .then((m) => {
        if (alive) setData(m.default)
      })
      .catch(() => {
        if (alive) setFailed(true)
      })
    return () => {
      alive = false
    }
  }, [near, data, failed, loadData])

  // Drive playback from visibility / reduced-motion once the player is in the DOM.
  useEffect(() => {
    const player = playerRef.current
    if (!player || !ready) return
    player.setSpeed(speed)
    if (reduced) {
      const total = player.getDuration(true) ?? 0
      player.goToAndStop(Math.round(total * staticFrame), true)
    } else if (visible) {
      if (segment) player.playSegments(segment, true)
      else player.play()
    } else {
      player.pause()
    }
  }, [ready, visible, reduced, speed, segment, staticFrame])

  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true }

  return (
    <div ref={rootRef} className={className} {...a11y}>
      {data && !failed && (
        <PlayerBoundary>
          <Suspense fallback={<div className="h-full w-full" />}>
            <LottiePlayer
              lottieRef={playerRef}
              animationData={data}
              autoplay={!reduced}
              loop
              onDOMLoaded={() => setReady(true)}
              onDataFailed={() => setFailed(true)}
              style={{ width: '100%', height: '100%' }}
            />
          </Suspense>
        </PlayerBoundary>
      )}
    </div>
  )
}
