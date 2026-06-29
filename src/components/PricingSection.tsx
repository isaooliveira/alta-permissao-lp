import { Check } from 'lucide-react'
import { useLot, POST_EVENT_LOT } from '@/hooks/useLot'
import { useEventStatus } from '@/hooks/useEventStatus'
import { INVESTMENT_SECTION_ID } from '@/lib/scroll'
import { PRICING_FEATURES_LIVE, PRICING_FEATURES_POST_EVENT } from '@/lib/eventContent'
import { FadeIn } from './FadeIn'
import { Button } from './Button'
import { LotCountdown } from './LotCountdown'
import { LotExtendedBadge } from './LotExtendedBadge'
import { SectionEyebrow } from './SectionEyebrow'
import type { Lot } from '@/hooks/useLot'
import mockImg from '@/assets/mock.webp'

interface PricingSectionProps {
  onCtaClick: () => void
}

function LotCard({
  lot,
  isActive,
  isPast,
  onCtaClick,
  eventPast,
}: {
  lot: Lot
  isActive: boolean
  isPast: boolean
  onCtaClick: () => void
  eventPast: boolean
}) {
  if (isPast) {
    return (
      <div
        className="relative rounded-md border border-cream/5 bg-dark/40 opacity-35 flex items-center justify-center min-h-[72px] sm:min-h-[88px] p-4 transition-all duration-300 self-start w-full"
        aria-label={`${lot.label} encerrado`}
      >
        <p className="text-cream/25 text-xs font-semibold uppercase tracking-widest">
          Encerrado
        </p>
      </div>
    )
  }

  const features = eventPast ? PRICING_FEATURES_POST_EVENT : PRICING_FEATURES_LIVE

  const cardContent = (
    <>
      {!eventPast && (
        <div className="flex items-start justify-between gap-2 mb-4">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-cream-muted">
              {lot.label}
            </span>
            {lot.extended && <LotExtendedBadge />}
          </div>
          {isActive && (
            <span className="inline-flex items-center gap-1.5 border border-cream/40 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cream shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-cream" aria-hidden="true" />
              Ativo
            </span>
          )}
        </div>
      )}

      <p
        className={`font-semibold leading-none tabular-nums mb-4 ${
          isActive ? 'text-cream' : 'text-cream/30'
        }`}
        style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
      >
        {lot.priceFormatted}
      </p>

      {isActive ? (
        <>
          <div className="border-t border-cream/10 pt-4 space-y-2 mb-4">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <Check size={14} className="text-cream flex-shrink-0" />
                <span className="text-cream-muted text-base">{f}</span>
              </div>
            ))}
          </div>
          <Button
            size="md"
            onClick={onCtaClick}
            className="w-full"
          >
            {eventPast ? 'Começar agora' : 'Garantir meu ingresso'}
          </Button>
          {!eventPast && (
            <div className="mt-4 pt-4 border-t border-cream/10">
              <LotCountdown endDate={lot.endDate} variant="card" />
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center py-3 sm:py-4 sm:min-h-[100px]">
          <p className="text-cream/25 text-xs uppercase tracking-widest text-center px-2">
            Disponível em breve
          </p>
        </div>
      )}
    </>
  )

  if (isActive) {
    return (
      <div className="relative rounded-md p-px bg-gradient-to-b from-[#988D49]/60 to-[#988D49]/20 opacity-100 scale-100 min-h-[320px] h-full transition-all duration-300">
        <div className="rounded-[5px] bg-dark p-5 sm:p-6 flex flex-col h-full min-h-[318px]">
          {cardContent}
        </div>
      </div>
    )
  }

  return (
    <div
      className="relative rounded-md border border-cream/10 bg-dark/60 p-5 sm:p-6 flex flex-col opacity-45 scale-[0.97] min-h-[160px] sm:min-h-[320px] sm:h-full transition-all duration-300"
    >
      {cardContent}
    </div>
  )
}

export function PricingSection({ onCtaClick }: PricingSectionProps) {
  const { currentLot, lots } = useLot()
  const { eventPast } = useEventStatus()

  return (
    <section id={INVESTMENT_SECTION_ID} className="section-padding scroll-mt-28">
      <div className="container-wide">
        <FadeIn>
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            <span className="h-px w-10 sm:w-14 bg-cream/20" aria-hidden="true" />
            <SectionEyebrow className="mb-0">Investimento</SectionEyebrow>
            <span className="h-px w-10 sm:w-14 bg-cream/20" aria-hidden="true" />
          </div>
          <h2 className="text-section text-white text-center mb-4">
            {eventPast ? (
              <>
                Garanta seu <span className="font-semibold">acesso</span>
              </>
            ) : (
              <>
                Quanto antes,{' '}
                <span className="font-semibold">melhor oportunidade</span>
              </>
            )}
          </h2>
          <p className="text-cream-muted text-center mb-8 text-lead max-w-xl mx-auto">
            {eventPast
              ? 'Treinamento introdutório com acesso imediato ao conteúdo completo.'
              : 'O investimento sobe conforme a data do evento se aproxima.'}
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="relative mx-auto mb-6 sm:mb-8 w-full max-w-[500px]">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[80%] w-[120%] max-w-[580px] blur-[52px] bg-[radial-gradient(ellipse_at_center,rgba(236,215,184,0.26)_0%,rgba(236,215,184,0.12)_32%,rgba(236,215,184,0.05)_58%,transparent_85%)]"
              aria-hidden="true"
            />
            <img
              src={mockImg}
              alt="Ilustração dos lotes de investimento"
              width={500}
              height={300}
              className="relative z-10 w-full h-auto object-contain"
            />
          </div>
        </FadeIn>

        {eventPast ? (
          <FadeIn delay={0.1} className="max-w-md mx-auto h-full">
            <LotCard
              lot={POST_EVENT_LOT}
              isActive
              isPast={false}
              onCtaClick={onCtaClick}
              eventPast
            />
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch">
            {lots.map((lot: Lot, i: number) => {
              const isActive = lot.number === currentLot.number
              const isPast = lot.number < currentLot.number
              return (
                <FadeIn key={lot.number} delay={i * 0.1} className="h-full">
                  <LotCard
                    lot={lot}
                    isActive={isActive}
                    isPast={isPast}
                    onCtaClick={onCtaClick}
                    eventPast={false}
                  />
                </FadeIn>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
