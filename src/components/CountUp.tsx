import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView, useMotionValue, useReducedMotion } from 'framer-motion'

interface CountUpProps {
  to: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUp({ to, prefix = '', suffix = '', className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduceMotion = useReducedMotion()
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(reduceMotion ? to : 0)

  useEffect(() => {
    if (reduceMotion || !inView) return
    const controls = animate(motionValue, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, to, reduceMotion, motionValue])

  return (
    <motion.span
      ref={ref}
      className={`inline-block tabular-nums ${className}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
      animate={inView || reduceMotion ? { opacity: 1, scale: 1 } : undefined}
      transition={{ type: 'spring', stiffness: 260, damping: 13, delay: 0.05 }}
    >
      {prefix}
      {display}
      {suffix}
    </motion.span>
  )
}
