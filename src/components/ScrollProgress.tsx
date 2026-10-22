import { motion, useScroll, useSpring } from 'framer-motion'
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 })
  return <motion.div className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-accent" style={{ scaleX }} aria-hidden="true" />
}
