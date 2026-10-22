import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { CameraRig, Lights } from './CameraRig'
import { ParticleField } from './ParticleField'
import { Suspense } from 'react'

const ORBIT_RADIUS = 2.15
const ORBIT_COLORS = ['#3B3F42', '#C8401B']

function Core() {
  const core = useRef<THREE.Group>(null!)
  const orbiters = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    if (core.current) {
      // Slow, steady spin with only a whisper of wobble.
      core.current.rotation.y += delta * 0.12
      core.current.rotation.x = Math.sin(t * 0.25) * 0.04
    }
    // Orbit spheres travel in the tilted ring plane (local XY of their group).
    orbiters.current.forEach((mesh, i) => {
      if (!mesh) return
      const a = t * 0.18 + (i / 6) * Math.PI * 2
      mesh.position.set(Math.cos(a) * ORBIT_RADIUS, Math.sin(a) * ORBIT_RADIUS, 0)
    })
  })

  return (
    <group>
      <group ref={core}>
        {/* Smooth sage core — physical material for soft, realistic light. */}
        <mesh>
          <sphereGeometry args={[1.02, 48, 48]} />
          <meshPhysicalMaterial color="#7A957E" roughness={0.32} metalness={0.05} clearcoat={0.55} clearcoatRoughness={0.5} />
        </mesh>
        {/* Faint wireframe shell for depth, kept almost subliminal. */}
        <mesh>
          <sphereGeometry args={[1.03, 32, 32]} />
          <meshBasicMaterial color="#3B3F42" wireframe transparent opacity={0.06} />
        </mesh>
      </group>

      {/* Tilted orbit: ring + six spheres share the group so they stay in-plane. */}
      <group rotation={[Math.PI / 2.4, 0.4, 0]}>
        <mesh>
          <torusGeometry args={[ORBIT_RADIUS, 0.014, 8, 100]} />
          <meshBasicMaterial color="#7A957E" transparent opacity={0.45} depthWrite={false} />
        </mesh>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh
            key={i}
            ref={(el) => { orbiters.current[i] = el }}
            position={[Math.cos((i / 6) * Math.PI * 2) * ORBIT_RADIUS, Math.sin((i / 6) * Math.PI * 2) * ORBIT_RADIUS, 0]}
          >
            <sphereGeometry args={[0.075, 20, 20]} />
            <meshStandardMaterial color={ORBIT_COLORS[i % 2]} roughness={0.4} metalness={0.05} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

export default function AboutCore({ active, low }: { active: boolean; low: boolean }) {
  return <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0.6, 6.2], fov: 42 }} gl={{ antialias: true, alpha: true }} aria-hidden="true"><Suspense fallback={null}><Lights /><CameraRig intensity={0.3} /><Core /><ParticleField count={low ? 25 : 55} /></Suspense></Canvas>
}
