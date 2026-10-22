import anime from 'animejs'
export function animateHeroLines(selector: string) {
  return anime({ targets: selector, opacity: [0, 1], translateY: [40, 0], filter: ['blur(10px)', 'blur(0px)'], duration: 900, delay: anime.stagger(110), easing: 'easeOutExpo' })
}
export const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }
