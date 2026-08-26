import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const reduceMotion = useReducedMotion()
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 40,
    mass: 0.3,
  })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] origin-left bg-lime"
      style={{ scaleX: reduceMotion ? scrollYProgress : smoothed }}
      aria-hidden="true"
    />
  )
}
