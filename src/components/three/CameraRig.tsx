import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
export function CameraRig({ intensity = 0.35 }: { intensity?: number }) {
  const { camera, pointer } = useThree()
  const target = useRef(new THREE.Vector3())
  useFrame((_, delta) => {
    target.current.set(pointer.x * intensity, pointer.y * intensity * 0.6, camera.position.z)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.current.x, 2.2, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.current.y, 2.2, delta)
    camera.lookAt(0, 0, 0)
  })
  return null
}
export function Lights() {
  return (<>
    <ambientLight intensity={0.75} />
    <hemisphereLight args={['#EBF5DD', '#7A957E', 0.5]} />
    <directionalLight position={[5, 6, 5]} intensity={1.0} color="#ffffff" />
    <pointLight position={[-5, -2, 3]} intensity={6} color="#C8401B" />
    <pointLight position={[5, 2, -2]} intensity={5} color="#9AB395" />
  </>)
}
