import { Wifi, ShieldCheck } from 'lucide-react'
import { useLot } from '@/hooks/useLot'
import { useEventStatus } from '@/hooks/useEventStatus'
import { Button } from './Button'

interface LotCtaCardProps {
  onCtaClick: () => void
  className?: string
}

export function LotCtaCard({ onCtaClick, className = '' }: LotCtaCardProps) {
  const { currentLot } = useLot()
  const { eventPast } = useEventStatus()

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full border border-cream/10 p-6 sm:p-8 flex flex-col items-center gap-5">
        {!eventPast && (
          <p className="text-center text-base sm:text-lg leading-snug">
            <span className="font-black uppercase tracking-wide text-red">{currentLot.label}</span>{' '}
            <span className="text-white">apenas por</span>{' '}
            <span className="font-black text-white">{currentLot.priceFormatted}</span>
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

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-cream-muted text-sm">
          {!eventPast && (
            <span className="flex items-center gap-1.5">
              <Wifi size={14} className="text-cream shrink-0" aria-hidden="true" />
              Online e Ao Vivo
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-cream shrink-0" aria-hidden="true" />
            Garantia de 7 dias
          </span>
        </div>
      </div>
    </div>
  )
}
