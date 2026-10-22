export const pageTransition = {
  initial: { opacity: 0, scale: 0.98, filter: 'blur(10px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, scale: 0.99, filter: 'blur(6px)', transition: { duration: 0.35 } },
}
export const sectionReveal = {
  hidden: { opacity: 0, y: 48 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
}
