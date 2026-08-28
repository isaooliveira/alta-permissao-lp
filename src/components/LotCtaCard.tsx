import { useLot, POST_EVENT_COMPARE, QUIZ_VIP_COMPARE } from '@/hooks/useLot'
import { useEventStatus } from '@/hooks/useEventStatus'
import { ctaLabel } from '@/lib/eventContent'
import { Button } from './Button'
import { LotExtendedAlert } from './LotExtendedBadge'

interface LotCtaCardProps {
  onCtaClick: () => void
  className?: string
  variant?: 'default' | 'hero' | 'mobile'
}

export function LotCtaCard({ onCtaClick, className = '', variant = 'default' }: LotCtaCardProps) {
  const { currentLot, urgency, quizOffer } = useLot()
  const { eventPast } = useEventStatus()
  const isHero = variant === 'hero'
  const isMobile = variant === 'mobile'

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`flex w-full flex-col items-center gap-5 ${
          isMobile
            ? 'rounded-lg border border-cream/15 bg-dark p-6'
            : isHero
              ? 'rounded-lg border border-white/5 bg-dark/75 p-5 backdrop-blur-sm sm:p-6 short-lg:gap-3 short-lg:p-4'
              : 'border border-cream/10 p-6 sm:p-8'
        }`}
      >
        {eventPast ? (
          <p className="text-center text-base leading-snug">
            <span className="text-white/90">De </span>
            <s className="font-black tracking-wide text-white/45">{`R$${POST_EVENT_COMPARE}`}</s>
            <span className="text-white/90"> por </span>
            <span className="font-black text-lime">{currentLot.priceFormatted}</span>
          </p>
        ) : (
          <p className="text-center text-base leading-snug">
            {quizOffer ? (
              <>
                <span className="font-black uppercase tracking-wide text-lime">Ingresso VIP</span>
                <span className="text-white/90"> · De </span>
                <s className="font-black tracking-wide text-white/45">{`R$${QUIZ_VIP_COMPARE}`}</s>
                <span className="text-white/90"> por </span>
                <span className="font-black text-lime">{currentLot.tickets.vip.priceFormatted}</span>
              </>
            ) : (
              <>
                <span className="font-black uppercase tracking-wide text-red">{currentLot.label}</span>{' '}
                <span className="text-white/90">a partir de</span>{' '}
                <span className="font-black text-lime">{currentLot.tickets.basic.priceFormatted}</span>
              </>
            )}
          </p>
        )}

        {!eventPast && urgency === 'extended' && <LotExtendedAlert variant="hero" />}

        <Button
          size="md"
          onClick={onCtaClick}
          showTicket={!eventPast}
          className="w-full"
        >
          {ctaLabel(eventPast, quizOffer)}
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-sm text-white/45">
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span aria-hidden="true">✓</span>
            {eventPast ? 'Acesso imediato' : 'Online e Ao Vivo'}
          </span>
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <span aria-hidden="true">✓</span>
            Garantia de 7 dias
          </span>
        </div>
      </div>
    </div>
  )
}
