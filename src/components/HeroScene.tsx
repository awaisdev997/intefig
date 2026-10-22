import { lazy, Suspense } from 'react'
import { useOnScreen } from '../hooks/useInView'
import { useDevicePerformance } from '../hooks/useDevicePerformance'
import { SceneFallback } from './SceneFallback'
const MarketingScene = lazy(() => import('./three/MarketingScene'))
export function HeroScene() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.05)
  const perf = useDevicePerformance()
  return (
    <div ref={ref} className="absolute inset-0" aria-hidden="true">
      {perf.canUse3D ? (
        <Suspense fallback={<SceneFallback />}><MarketingScene active={onScreen} low={perf.low} /></Suspense>
      ) : <SceneFallback />}
    </div>
  )
}
