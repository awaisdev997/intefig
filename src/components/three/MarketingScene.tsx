import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraRig, Lights } from './CameraRig'
import { FloatingNodes } from './FloatingNodes'
import { DataNetwork } from './DataNetwork'
import { ParticleField } from './ParticleField'
export default function MarketingScene({ active = true, low = false }: { active?: boolean; low?: boolean }) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0, 7.2], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} aria-hidden="true">
      <Suspense fallback={null}>
        <Lights /><CameraRig intensity={0.4} /><FloatingNodes /><DataNetwork /><ParticleField count={low ? 35 : 90} />
      </Suspense>
    </Canvas>
  )
}
