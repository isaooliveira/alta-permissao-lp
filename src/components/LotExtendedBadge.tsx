interface LotExtendedBadgeProps {
  className?: string
  size?: 'sm' | 'md'
}

export function LotExtendedBadge({ className = '', size = 'md' }: LotExtendedBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 border border-lime/40 rounded-full font-semibold uppercase tracking-wide text-lime ${
        size === 'sm'
          ? 'px-1.5 py-px text-[9px]'
          : 'px-2 py-0.5 text-[10px]'
      } ${className}`}
    >
      Prorrogado
    </span>
  )
}
