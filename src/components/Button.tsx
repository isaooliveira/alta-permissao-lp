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
          'btn-shimmer relative inline-flex min-w-0 max-w-full items-center justify-center rounded-[6px] font-bold uppercase tracking-wide transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed',
          {
            'bg-lime text-dark hover:brightness-105 hover:shadow-[0_0_28px_rgba(209,255,3,0.45)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-dark':
              variant === 'primary',
            'border-2 border-cream text-cream hover:bg-cream hover:text-dark':
              variant === 'outline',
            'text-cream hover:text-cream/80': variant === 'ghost',
          },
          {
            'px-3 py-2 text-xs sm:px-4 sm:text-sm': size === 'sm',
            'px-5 py-3.5 text-[16px] sm:px-6': size === 'md',
            'px-5 py-3.5 text-[16px] sm:px-8 sm:py-4 sm:text-lg': size === 'lg',
            'px-5 py-3.5 text-[16px] sm:px-10 sm:py-4 sm:text-lg': size === 'xl',
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
          <span className={cn('relative z-[2] inline-flex min-w-0 items-center justify-center', showTicket ? 'gap-2 sm:gap-3' : 'gap-2')}>
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
