import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionEyebrowProps {
  children: ReactNode
  className?: string
  variant?: 'dark' | 'light'
}

export function SectionEyebrow({
  children,
  className,
  variant = 'dark',
}: SectionEyebrowProps) {
  return (
    <p
      className={cn(
        'text-eyebrow text-center',
        variant === 'light' ? 'text-dark/45' : 'text-cream-muted',
        className,
      )}
    >
      {children}
    </p>
  )
}
