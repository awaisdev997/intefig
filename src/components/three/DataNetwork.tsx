import { Line } from '@react-three/drei'
import { NODE_DATA } from './FloatingNodes'
export function DataNetwork() {
  const pts = NODE_DATA.map(n => [n.pos[0], n.pos[1], n.pos[2]] as [number, number, number])
  const curves: [number, number, number][][] = []
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i], b = pts[i + 1]
    const mid: [number, number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 0.55, (a[2] + b[2]) / 2]
    const seg: [number, number, number][] = []
    for (let t = 0; t <= 20; t++) { const u = t / 20; seg.push([(1-u)*(1-u)*a[0]+2*(1-u)*u*mid[0]+u*u*b[0], (1-u)*(1-u)*a[1]+2*(1-u)*u*mid[1]+u*u*b[1], (1-u)*(1-u)*a[2]+2*(1-u)*u*mid[2]+u*u*b[2]]) }
    curves.push(seg)
  }
  return (<>{curves.map((c, i) => <Line key={i} points={c} color="#C8401B" lineWidth={1} transparent opacity={0.26} />)}</>)
}
