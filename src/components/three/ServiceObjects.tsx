import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { Suspense } from 'react'
import * as THREE from 'three'
import { SERVICES } from '../../data/content'
import { CameraRig, Lights } from './CameraRig'
import { ParticleField } from './ParticleField'

/**
 * Satellite layouts — one per service. Five nodes rest on a loose ellipse
 * (rx ≈ 2.2, ry ≈ 1.25, z jitter −0.4…0.4); each service rotates / re-weights
 * the ellipse slightly so switching services reads as the same system
 * rearranging, not a carousel spinning to a new slab.
 */
const LAYOUTS: [number, number, number][][] = [
  // 01 Email Campaigns
  [[2.2, 0, 0.2], [0.68, 1.19, -0.3], [-1.78, 0.73, 0.35], [-1.78, -0.73, -0.25], [0.68, -1.19, 0.3]],
  // 02 eCommerce Automation
  [[1.91, 0.62, -0.3], [-0.46, 1.22, 0.25], [-2.18, 0.13, -0.2], [-0.89, -1.14, 0.4], [1.63, -0.84, -0.35]],
  // 03 SMS Automation
  [[1.1, 1.08, 0.3], [-1.47, 0.93, -0.35], [-2.01, -0.51, 0.2], [-0.23, -1.25, -0.3], [2.15, -0.26, 0.35]],
  // 04 Tools Integration
  [[0, 1.25, -0.25], [-2.09, 0.39, 0.3], [-1.29, -1.01, -0.35], [1.29, -1.01, 0.25], [2.09, 0.39, -0.2]],
  // 05 Landing Pages
  [[-1.1, 1.08, 0.35], [-2.15, -0.26, -0.3], [-0.23, -1.25, 0.3], [1.99, -0.51, -0.25], [1.47, 0.93, 0.2]],
  // 06 Lead Generation / Surveys
  [[-1.91, 0.62, -0.3], [-1.63, -0.84, 0.25], [0.89, -1.14, -0.2], [2.19, 0.13, 0.35], [0.46, 1.22, -0.35]],
]

const SATELLITE_COLORS = SERVICES.slice(0, 5).map((s) => s.color)

export function ServiceObjects({ activeIndex }: { activeIndex: number }) {
  const group = useRef<THREE.Group>(null!)
  const inner = useRef<THREE.Group>(null!)
  const accentMat = useRef<THREE.MeshStandardMaterial>(null!)
  const satellites = useRef<(THREE.Group | null)[]>([])
  const targetColor = useMemo(
    () => new THREE.Color(SERVICES[activeIndex]?.color || '#C8401B'),
    [activeIndex],
  )

  useFrame((state, delta) => {
    if (!group.current || !inner.current) return
    // Group eases a few degrees per service — a nudge, never a spin.
    group.current.rotation.y = THREE.MathUtils.damp(
      group.current.rotation.y,
      activeIndex * 0.12,
      3.2,
      delta,
    )
    // Barely-there breathing only; the layout morph is the real motion.
    inner.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.7) * 0.008)

    // Accent bar colour cross-fades to the active service colour.
    if (accentMat.current) {
      accentMat.current.color.lerp(targetColor, 1 - Math.exp(-4 * delta))
    }

    // Satellites glide to the active service's layout.
    const layout = LAYOUTS[activeIndex] ?? LAYOUTS[0]
    satellites.current.forEach((sat, i) => {
      if (!sat) return
      const [tx, ty, tz] = layout[i]
      sat.position.x = THREE.MathUtils.damp(sat.position.x, tx, 3.2, delta)
      sat.position.y = THREE.MathUtils.damp(sat.position.y, ty, 3.2, delta)
      sat.position.z = THREE.MathUtils.damp(sat.position.z, tz, 3.2, delta)
    })
  })

  return (
    <group ref={group}>
      <group ref={inner}>
        {/* Central UI card — the constant the whole system rearranges around. */}
        <group>
          <RoundedBox args={[1.85, 1.2, 0.14]} radius={0.09} smoothness={4}>
            <meshStandardMaterial color="#FFFFFF" roughness={0.35} metalness={0.05} />
          </RoundedBox>
          {/* Header bar — cross-fades to the active service colour. */}
          <RoundedBox args={[0.5, 0.09, 0.02]} radius={0.02} smoothness={2} position={[-0.55, 0.42, 0.09]}>
            <meshStandardMaterial ref={accentMat} color={SERVICES[0].color} roughness={0.4} metalness={0.05} />
          </RoundedBox>
          {/* Text-line bars suggesting card content. */}
          <RoundedBox args={[0.95, 0.045, 0.02]} radius={0.02} smoothness={2} position={[-0.32, 0.12, 0.09]}>
            <meshStandardMaterial color="#D3E0C9" roughness={0.5} metalness={0} />
          </RoundedBox>
          <RoundedBox args={[0.7, 0.045, 0.02]} radius={0.02} smoothness={2} position={[-0.44, -0.08, 0.09]}>
            <meshStandardMaterial color="#D8DCD2" roughness={0.5} metalness={0} />
          </RoundedBox>
        </group>

        {/* Satellite nodes morphing between per-service layouts. */}
        {SATELLITE_COLORS.map((color, i) => (
          <group
            key={color + i}
            ref={(el) => { satellites.current[i] = el }}
            position={LAYOUTS[0][i]}
            rotation={[0.08 * (i % 3), 0.12 * i, 0.05 * i]}
          >
            <RoundedBox args={[0.34, 0.24, 0.12]} radius={0.05} smoothness={4}>
              <meshStandardMaterial color={color} roughness={0.4} metalness={0.05} />
            </RoundedBox>
          </group>
        ))}

        {/* One thin elliptical orbit line, well clear of the nodes. */}
        <mesh scale={[1, 0.58, 1]}>
          <torusGeometry args={[2.3, 0.012, 8, 100]} />
          <meshBasicMaterial color="#7A957E" transparent opacity={0.16} depthWrite={false} />
        </mesh>
      </group>
    </group>
  )
}

export function ServiceCanvas({ activeIndex, active = true, low = false }: { activeIndex: number; active?: boolean; low?: boolean }) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0, 6.4], fov: 42 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <Suspense fallback={null}><Lights /><CameraRig intensity={0.25} /><ServiceObjects activeIndex={activeIndex} /><ParticleField count={low ? 25 : 60} /></Suspense>
    </Canvas>
  )
}
