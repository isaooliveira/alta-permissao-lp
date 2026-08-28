import { Award, Check, Lock } from 'lucide-react'
import { useLot, POST_EVENT_LOT } from '@/hooks/useLot'
import { useEventStatus } from '@/hooks/useEventStatus'
import { INVESTMENT_SECTION_ID } from '@/lib/scroll'
import { PRICING_FEATURES_LIVE, PRICING_FEATURES_POST_EVENT } from '@/lib/eventContent'
import { FadeIn } from './FadeIn'
import { Button } from './Button'
import { LotCountdown } from './LotCountdown'
import { LotExtendedAlert } from './LotExtendedBadge'
import { SectionEyebrow } from './SectionEyebrow'
import type { Lot } from '@/hooks/useLot'

const MOCK_SRC = `${import.meta.env.BASE_URL}${encodeURIComponent('mock web.webp')}`

const PAY_METHODS_SRC = `${import.meta.env.BASE_URL}${encodeURIComponent('svg - pay.svg')}`

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
  const { urgency, quizOffer } = useLot()
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
          </div>
          {isActive && urgency === 'extended' && (
            <LotExtendedAlert variant="badge" className="shrink-0" />
          )}
          {isActive && urgency !== 'extended' && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/50 bg-lime/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-lime shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-lime" aria-hidden="true" />
              Ativo
            </span>
          )}
        </div>
      )}

      {eventPast ? (
        <p
          className="mb-4 font-semibold leading-none tabular-nums text-cream"
          style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
        >
          {lot.priceFormatted}
        </p>
      ) : (
        <div className="mb-4 flex flex-col">
          <span
            className={`font-normal leading-none ${
              isActive ? 'text-base text-white sm:text-lg' : 'text-sm text-cream/30'
            }`}
          >
            {isActive && quizOffer ? (
              <>
                De <s className="text-white/45">R${lot.price}</s> por apenas
              </>
            ) : (
              'por apenas'
            )}
          </span>
          <span
            className={`mt-1 font-normal leading-none tracking-tight tabular-nums ${
              isActive ? 'text-[3.25rem] text-lime sm:text-6xl' : 'text-3xl text-cream/30 sm:text-4xl'
            }`}
          >
            R${isActive && quizOffer ? 67 : lot.price}
          </span>
        </div>
      )}

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
            showTicket={!eventPast}
            className="w-full"
          >
            {eventPast ? 'Começar agora' : 'Garantir Meu ingresso'}
          </Button>
          <img
            src={PAY_METHODS_SRC}
            alt="Formas de pagamento"
            width={1310}
            height={132}
            className="mx-auto mt-3 h-auto w-[72%] max-w-[188px] opacity-40"
          />
          {!eventPast && urgency === 'countdown' && (
            <div className="mt-4">
              <LotCountdown endDate={lot.endDate} variant="card" />
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center py-3 sm:py-4 sm:min-h-[100px]">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-cream/10 px-3 py-1.5 text-cream/30 text-[11px] uppercase tracking-widest text-center">
            <Lock size={11} strokeWidth={2.5} aria-hidden="true" />
            Disponível em breve
          </p>
        </div>
      )}
    </>
  )

  if (isActive) {
    return (
      <div className="group relative rounded-md p-px bg-gradient-to-b from-[#988D49]/60 to-[#988D49]/20 opacity-100 scale-100 min-h-[320px] h-full transition-all duration-300 ease-out hover:-translate-y-1 hover:from-[#988D49]/95 hover:to-[#988D49]/45 hover:shadow-[0_14px_36px_rgba(152,141,73,0.28)]">
        <div className="rounded-[5px] bg-dark p-5 sm:p-6 flex flex-col h-full min-h-[318px] transition-colors duration-300 group-hover:bg-[#252520]">
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
                Garanta seu ingresso
                <br />
                ao Treinamento Efeito Alta Permissão
              </>
            )}
          </h2>
          {eventPast ? (
            <p className="text-cream-muted text-center mb-8 text-lead max-w-2xl mx-auto">
              Treinamento introdutório com acesso imediato ao conteúdo completo.
            </p>
          ) : (
            <p className="mx-auto mb-8 max-w-2xl text-center text-xl leading-relaxed text-white sm:max-w-3xl sm:text-[1.35rem] lg:max-w-4xl">
              Se você não quer depender de respostas prontas, pura intuição ou da sensação de que
              precisa “sacar” uma pessoa para conduzir bem, esse treinamento é o seu próximo passo.
            </p>
          )}
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="relative mx-auto mb-6 sm:mb-8 w-full max-w-[500px]">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 h-[80%] w-[120%] max-w-[580px] blur-[52px] bg-[radial-gradient(ellipse_at_center,rgba(236,215,184,0.26)_0%,rgba(236,215,184,0.12)_32%,rgba(236,215,184,0.05)_58%,transparent_85%)]"
              aria-hidden="true"
            />
            <img
              src={MOCK_SRC}
              alt="Ilustração dos lotes de investimento"
              width={500}
              height={300}
              className="relative z-10 w-full h-auto object-contain"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mx-auto mb-8 sm:mb-10 flex max-w-xl items-center gap-5 border-l-4 border-lime bg-cream/[0.06] px-6 py-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-lime">
              <Award size={20} className="text-dark" strokeWidth={2} aria-hidden="true" />
            </div>
            <p className="text-sm font-black uppercase tracking-wide text-cream sm:text-base">
              Certificado de conclusão do treinamento
            </p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch max-w-3xl mx-auto">
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
