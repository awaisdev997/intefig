import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { SERVICES } from '../../data/content'
export function ServiceObjects({ activeIndex }: { activeIndex: number }) {
  const group = useRef<THREE.Group>(null!)
  const inner = useRef<THREE.Group>(null!)
  useFrame((state, delta) => {
    if (!group.current || !inner.current) return
    const targetRot = activeIndex * (Math.PI / 3)
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetRot, 3, delta)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, Math.sin(activeIndex * 1.3) * 0.18, 3, delta)
    const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.02
    inner.current.scale.setScalar(s)
  })
  const activeColor = new THREE.Color(SERVICES[activeIndex]?.color || '#C8401B')
  return (
    <group ref={group}><group ref={inner}>
      {SERVICES.map((s, i) => {
        const angle = (i / SERVICES.length) * Math.PI * 2
        const isActive = i === activeIndex
        return (
          <group key={s.title} position={[Math.sin(angle) * 2.1, Math.cos(i * 2.1) * 0.35, Math.cos(angle) * 2.1]} rotation={[0.15 * i, angle, 0.08 * i]}>
            <RoundedBox args={isActive ? [1.5, 1.0, 0.4] : [1.15, 0.78, 0.32]} radius={0.1} smoothness={4}>
              <meshStandardMaterial color={isActive ? activeColor : s.color} roughness={0.3} metalness={0.2} transparent opacity={isActive ? 1 : 0.72} emissive={isActive ? activeColor : '#000000'} emissiveIntensity={isActive ? 0.18 : 0} />
            </RoundedBox>
          </group>
        )
      })}
      <mesh><torusGeometry args={[2.1, 0.018, 8, 80]} /><meshStandardMaterial color="#C8401B" transparent opacity={0.4} /></mesh>
    </group></group>
  )
}
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CameraRig, Lights } from './CameraRig'
import { ParticleField } from './ParticleField'
export function ServiceCanvas({ activeIndex, active = true, low = false }: { activeIndex: number; active?: boolean; low?: boolean }) {
  return (
    <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0, 6.4], fov: 42 }} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <Suspense fallback={null}><Lights /><CameraRig intensity={0.25} /><ServiceObjects activeIndex={activeIndex} /><ParticleField count={low ? 25 : 60} /></Suspense>
    </Canvas>
  )
}
