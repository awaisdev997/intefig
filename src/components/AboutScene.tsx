import { lazy, Suspense } from 'react'
import { ORBIT_WORDS } from '../data/content'
import { useOnScreen } from '../hooks/useInView'
import { useDevicePerformance } from '../hooks/useDevicePerformance'
import { SceneFallback } from './SceneFallback'
const AboutCore = lazy(() => import('./three/AboutCore'))
export function AboutScene() {
  const { ref, onScreen } = useOnScreen<HTMLDivElement>(0.05)
  const perf = useDevicePerformance()
  return <div ref={ref} className="h-full w-full">{perf.canUse3D ? <Suspense fallback={<SceneFallback labels={ORBIT_WORDS} />}><AboutCore active={onScreen} low={perf.low} /></Suspense> : <SceneFallback labels={ORBIT_WORDS} />}</div>
}
