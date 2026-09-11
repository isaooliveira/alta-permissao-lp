import { motion, useReducedMotion } from 'framer-motion'

interface LotExtendedAlertProps {
  className?: string
  variant?: 'header' | 'hero' | 'badge'
}

function AlertDot({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'h-1.5 w-1.5' : 'h-2 w-2'

  return (
    <span className={`relative inline-flex ${dim} shrink-0`} aria-hidden="true">
      <span className={`lot-alert-ping absolute inset-0 rounded-full bg-red ${dim}`} />
      <span className={`relative rounded-full bg-red ${dim}`} />
    </span>
  )
}

function ExtendedLabel({ className = '' }: { className?: string }) {
  return (
    <span className={className}>
      Prorrogado por tempo <span className="text-red">limitado</span>
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
        className={`lot-alert-glow flex w-full items-center justify-center gap-2 rounded-md border border-red/50 bg-red/15 px-3 py-2.5 ${className}`}
        animate={reduceMotion ? undefined : { opacity: [1, 0.82, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <AlertDot />
        <ExtendedLabel className="text-center text-[11px] font-black uppercase tracking-[0.12em] text-white sm:text-xs" />
      </motion.div>
    )
  }

  if (variant === 'header') {
    return (
      <span
        role="status"
        className={`lot-alert-glow inline-flex max-w-full items-center gap-1.5 rounded-full border border-red/50 bg-red/15 px-2 py-0.5 ${className}`}
      >
        <AlertDot size="sm" />
        <ExtendedLabel className="text-[9px] font-black uppercase leading-tight tracking-wide text-white sm:text-[10px]" />
      </span>
    )
  }

  return (
    <span
      role="status"
      className={`lot-alert-glow inline-flex items-center gap-1.5 rounded-full border border-red/55 bg-red/15 px-2.5 py-1 ${className}`}
    >
      <AlertDot size="sm" />
      <ExtendedLabel className="text-[10px] font-black uppercase tracking-wide text-white" />
    </span>
  )
}
