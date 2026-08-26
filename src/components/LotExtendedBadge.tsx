import { motion, useReducedMotion } from 'framer-motion'

interface LotExtendedAlertProps {
  className?: string
  variant?: 'header' | 'hero' | 'badge'
}

function AlertDot({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2'

  return (
    <span className={`relative inline-flex ${dim} shrink-0`} aria-hidden="true">
      <span className={`lot-alert-ping absolute inset-0 rounded-full bg-lime ${dim}`} />
      <span className={`relative rounded-full bg-lime ${dim}`} />
    </span>
  )
}

export function LotExtendedAlert({
  className = '',
  variant = 'badge',
}: LotExtendedAlertProps) {
  const reduceMotion = useReducedMotion()

  if (variant === 'hero') {
    return (
      <motion.div
        role="status"
        className={`lot-alert-glow flex w-full items-center justify-center gap-2 rounded-md border border-lime/40 bg-lime/10 px-3 py-2.5 ${className}`}
        animate={reduceMotion ? undefined : { opacity: [1, 0.82, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AlertDot />
        <span className="text-[11px] font-black uppercase tracking-[0.16em] text-lime sm:text-xs">
          Prorrogado
        </span>
      </motion.div>
    )
  }

  if (variant === 'header') {
    return (
      <span
        role="status"
        className={`lot-alert-glow inline-flex items-center gap-1.5 rounded-full border border-lime/40 bg-lime/10 px-2 py-0.5 ${className}`}
      >
        <AlertDot size="sm" />
        <span className="text-[10px] font-black uppercase tracking-wide text-lime sm:text-xs">
          Prorrogado
        </span>
      </span>
    )
  }

  return (
    <span
      role="status"
      className={`lot-alert-glow inline-flex items-center gap-1.5 rounded-full border border-lime/50 bg-lime/10 px-2 py-0.5 ${className}`}
    >
      <AlertDot size="sm" />
      <span className="text-[10px] font-semibold uppercase tracking-wide text-lime">
        Prorrogado
      </span>
    </span>
  )
}
