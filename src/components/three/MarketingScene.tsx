import { Canvas, useThree } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import * as THREE from 'three'
import { CameraRig, Lights } from './CameraRig'
import { FloatingNodes } from './FloatingNodes'
import { DataNetwork } from './DataNetwork'
import { ParticleField } from './ParticleField'

/**
 * Keeps the whole node ecosystem inside the frame on narrow canvases.
 * The node layout spans a fixed world width, so as the canvas aspect
 * shrinks the camera steps back instead of letting edge cards clip.
 * CameraRig preserves camera.position.z while adding pointer parallax.
 */
function ResponsiveFraming() {
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  useEffect(() => {
    const aspect = size.width / size.height
    const z = aspect >= 1.5 ? 7.2 : aspect >= 1.15 ? 9.0 : 11.0
    camera.position.z = z
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
  }, [camera, size])
  return null
}

export default function MarketingScene({ active = true, low = false }: { active?: boolean; low?: boolean }) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0, 7.2], fov: 42 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} aria-hidden="true">
      <Suspense fallback={null}>
        <Lights /><CameraRig intensity={0.4} /><ResponsiveFraming /><FloatingNodes /><DataNetwork /><ParticleField count={low ? 35 : 90} />
      </Suspense>
    </Canvas>
  )
}
