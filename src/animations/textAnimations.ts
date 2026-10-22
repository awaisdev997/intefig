export const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  show: (i: number = 0) => ({ opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] as const } }),
}
export const staggerContainer = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
