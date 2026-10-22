export const serviceItem = {
  inactive: { opacity: 0.45, x: 0, scale: 0.98 },
  active: { opacity: 1, x: 12, scale: 1, transition: { duration: 0.45, ease: 'easeOut' as const } },
}
export function serviceProgressToIndex(progress: number, count: number) {
  return Math.min(count - 1, Math.max(0, Math.floor(progress * count)))
}
