import { Wifi, ShieldCheck } from 'lucide-react'
import { useLot } from '@/hooks/useLot'
import { useEventStatus } from '@/hooks/useEventStatus'
import { Button } from './Button'

interface LotCtaCardProps {
  onCtaClick: () => void
  className?: string
  variant?: 'default' | 'hero' | 'mobile'
}

export function LotCtaCard({ onCtaClick, className = '', variant = 'default' }: LotCtaCardProps) {
  const { currentLot } = useLot()
  const { eventPast } = useEventStatus()
  const isHero = variant === 'hero'
  const isMobile = variant === 'mobile'

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`w-full flex flex-col ${
          isMobile
            ? 'items-center gap-5 rounded-lg border border-cream/15 bg-dark p-6'
            : isHero
              ? 'items-start gap-4 border border-white/5 bg-dark/75 p-5 backdrop-blur-sm sm:gap-5 sm:p-6'
              : 'items-center gap-5 border border-cream/10 p-6 sm:p-8'
        }`}
      >
        {!eventPast && (
          <p
            className={`leading-snug ${
              isMobile
                ? 'text-center text-base'
                : isHero
                  ? 'text-left text-base sm:text-lg'
                  : 'text-center text-base sm:text-lg'
            }`}
          >
            {isMobile ? (
              <>
                <span className="text-white/90">{currentLot.label.toLowerCase()} apenas </span>
                <span className="font-black text-lime">{currentLot.priceFormatted}</span>
              </>
            ) : (
              <>
                <span className="font-black uppercase tracking-wide text-red">{currentLot.label}</span>{' '}
                <span className="text-white">apenas por</span>{' '}
                <span className="font-black text-white">{currentLot.priceFormatted}</span>
              </>
            )}
          </p>
        )}

        <Button
          size="lg"
          onClick={onCtaClick}
          showTicket
          className="w-full whitespace-nowrap"
        >
          Quero garantir meu ingresso
        </Button>

        <div
          className={`flex flex-wrap text-sm ${
            isMobile
              ? 'w-full items-center justify-center gap-x-8 gap-y-2 text-white/45'
              : isHero
                ? 'items-center justify-start gap-x-6 gap-y-2 text-cream-muted'
                : 'items-center justify-center gap-x-6 gap-y-2 text-cream-muted'
          }`}
        >
          {!eventPast && (
            <span className="flex items-center gap-1.5">
              {isMobile ? (
                <span aria-hidden="true">✓</span>
              ) : (
                <Wifi size={14} className="text-cream shrink-0" aria-hidden="true" />
              )}
              Online e Ao Vivo
            </span>
          )}
          <span className="flex items-center gap-1.5">
            {isMobile ? (
              <span aria-hidden="true">✓</span>
            ) : (
              <ShieldCheck size={14} className="text-cream shrink-0" aria-hidden="true" />
            )}
            Garantia de 7 dias
          </span>
        </div>
      </div>
    </div>
  )
}
