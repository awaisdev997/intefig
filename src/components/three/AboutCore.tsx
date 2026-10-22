import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import { ORBIT_WORDS } from '../../data/content'
import { CameraRig, Lights } from './CameraRig'
import { ParticleField } from './ParticleField'
import { Suspense } from 'react'
function Core() {
  const group = useRef<THREE.Group>(null!)
  useFrame((state, delta) => { if (group.current) { group.current.rotation.y += delta * 0.25; group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.12 } })
  return (
    <group ref={group}>
      <mesh><icosahedronGeometry args={[1.05, 1]} /><meshStandardMaterial color="#C8401B" roughness={0.25} metalness={0.3} flatShading /></mesh>
      <mesh rotation={[Math.PI / 2.4, 0.4, 0]}><torusGeometry args={[2.15, 0.02, 8, 90]} /><meshStandardMaterial color="#7A957E" transparent opacity={0.7} /></mesh>
      {ORBIT_WORDS.map((w, i) => { const a = (i / ORBIT_WORDS.length) * Math.PI * 2; return (<group key={w} position={[Math.cos(a) * 2.15, Math.sin(a * 2) * 0.35, Math.sin(a) * 2.15]}><mesh><sphereGeometry args={[0.09, 16, 16]} /><meshStandardMaterial color="#3B3F42" /></mesh><Html center distanceFactor={10} style={{ pointerEvents: 'none' }}><span style={{ fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: 1.6, color: '#3B3F42', whiteSpace: 'nowrap' }}>{w}</span></Html></group>) })}
    </group>
  )
}
export default function AboutCore({ active, low }: { active: boolean; low: boolean }) {
  return <Canvas frameloop={active ? 'always' : 'never'} dpr={[1, 1.75]} camera={{ position: [0, 0.6, 6.2], fov: 42 }} gl={{ antialias: true, alpha: true }} aria-hidden="true"><Suspense fallback={null}><Lights /><CameraRig intensity={0.3} /><Core /><ParticleField count={low ? 25 : 55} /></Suspense></Canvas>
}
