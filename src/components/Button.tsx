import { cn } from '@/lib/utils'
import { ArrowRight, Ticket } from 'lucide-react'
import { type ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  showArrow?: boolean
  showTicket?: boolean
}

const iconSizes = {
  sm: 16,
  md: 18,
  lg: 20,
  xl: 22,
} as const

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading,
      showArrow,
      showTicket,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'btn-shimmer relative inline-flex items-center justify-center rounded-[6px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed',
          {
            'bg-lime text-dark hover:brightness-105 hover:shadow-[0_0_28px_rgba(209,255,3,0.45)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-dark':
              variant === 'primary',
            'border-2 border-cream text-cream hover:bg-cream hover:text-dark':
              variant === 'outline',
            'text-cream hover:text-cream/80': variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
            'px-6 py-4 text-base sm:px-10 sm:py-4 sm:text-lg': size === 'xl',
          },
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="relative z-[2] flex items-center gap-2">
            <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
            Aguarde...
          </span>
        ) : (
          <span className={cn('relative z-[2] inline-flex items-center', showTicket ? 'gap-3' : 'gap-2')}>
            {showTicket && (
              <Ticket
                size={iconSizes[size]}
                strokeWidth={2.25}
                className="flex-shrink-0"
                aria-hidden="true"
              />
            )}
            {children}
            {showArrow && (
              <ArrowRight size={iconSizes[size]} className="flex-shrink-0" aria-hidden="true" />
            )}
          </span>
        )}
      </button>
    )
  },
)
Button.displayName = 'Button'

export { Button }
