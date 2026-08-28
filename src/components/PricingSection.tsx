import { Award, Check, Star, X } from 'lucide-react'
import { useReducedMotion } from 'framer-motion'
import { useLot, POST_EVENT_COMPARE, POST_EVENT_LOT, QUIZ_VIP_COMPARE, type Ticket, type TicketKind } from '@/hooks/useLot'
import { useEventStatus } from '@/hooks/useEventStatus'
import { INVESTMENT_SECTION_ID } from '@/lib/scroll'
import { PRICING_FEATURES_POST_EVENT, TICKET_FEATURES } from '@/lib/eventContent'
import { FadeIn } from './FadeIn'
import { Button } from './Button'
import { LotCountdown } from './LotCountdown'
import { LotExtendedAlert } from './LotExtendedBadge'
import { SectionEyebrow } from './SectionEyebrow'

const MOCK_SRC = `${import.meta.env.BASE_URL}${encodeURIComponent('mock web.webp')}`

const PAY_METHODS_SRC = `${import.meta.env.BASE_URL}${encodeURIComponent('svg - pay.svg')}`

interface PricingSectionProps {
  onCtaClick: (kind?: TicketKind) => void
}

function LotPricePair({
  currentLabel,
  currentPrice,
  upcomingPrice,
  accent,
}: {
  currentLabel: string
  currentPrice: number
  upcomingPrice: number
  accent: 'lime' | 'cream'
}) {
  const isLime = accent === 'lime'

  return (
    <div className="mb-4 grid grid-cols-2 gap-2">
      <div
        className={`rounded-md px-3 py-3 ${
          isLime
            ? 'border border-lime/40 bg-lime/[0.07]'
            : 'border border-cream/30 bg-cream/[0.06]'
        }`}
      >
        <p
          className={`text-[10px] font-black uppercase tracking-widest ${
            isLime ? 'text-lime' : 'text-cream'
          }`}
        >
          {currentLabel}
        </p>
        <p
          className={`mt-1.5 font-black tabular-nums leading-none tracking-tight ${
            isLime ? 'text-[1.75rem] text-lime sm:text-[2rem]' : 'text-[1.75rem] text-cream sm:text-[2rem]'
          }`}
        >
          R${currentPrice}
        </p>
        <p
          className={`mt-2 text-[10px] font-semibold leading-snug ${
            isLime ? 'text-lime/75' : 'text-cream/70'
          }`}
        >
          Oferta por tempo limitado.
        </p>
      </div>

      <div className="rounded-md border border-cream/10 bg-white/[0.02] px-3 py-3">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/35">
          Lote sem desconto
        </p>
        <p className="mt-1.5 text-[1.75rem] font-black tabular-nums leading-none tracking-tight text-white/30 sm:text-[2rem]">
          R${upcomingPrice}
        </p>
        <p className="mt-2 text-[10px] font-semibold text-white/30">Em breve</p>
      </div>
    </div>
  )
}

function TicketCard({
  ticket,
  lotLabel,
  featured,
  onCtaClick,
}: {
  ticket: Ticket
  lotLabel: string
  featured: boolean
  onCtaClick: () => void
}) {
  const { urgency, currentLot, quizOffer, lots } = useLot()
  const reduceMotion = useReducedMotion()
  const isVip = ticket.kind === 'vip'
  const nextLot = lots.find((lot) => lot.number > currentLot.number)
  const upcomingPrice = quizOffer && isVip
    ? QUIZ_VIP_COMPARE
    : nextLot?.tickets[ticket.kind].price
  const showCompare =
    typeof upcomingPrice === 'number' && upcomingPrice > ticket.price

  return (
    <div
      className={
        featured
          ? `group relative h-full min-h-[320px] rounded-md bg-gradient-to-b from-[#988D49]/60 to-[#988D49]/20 p-px opacity-100 transition-all duration-300 ease-out hover:-translate-y-1 hover:from-[#988D49]/95 hover:to-[#988D49]/45 hover:shadow-[0_14px_36px_rgba(152,141,73,0.28)] ${
              reduceMotion ? '' : 'pricing-vip-glow'
            }`
          : 'relative flex h-full min-h-[320px] flex-col rounded-md border border-cream/10 bg-dark/60 p-5 transition-all duration-300 sm:p-6'
      }
    >
      {featured && (
        <div className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-lime px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wide text-dark shadow-[0_6px_20px_rgba(209,255,3,0.4)]">
            <Star size={12} strokeWidth={2.5} fill="currentColor" aria-hidden="true" />
            Melhor escolha
          </span>
        </div>
      )}

      <div
        className={
          featured
            ? 'flex h-full min-h-[318px] flex-col rounded-[5px] bg-dark p-5 transition-colors duration-300 group-hover:bg-[#252520] sm:p-6'
            : 'flex h-full flex-col'
        }
      >
        <div className="mb-4 flex items-start justify-between gap-2">
          <p className={`text-sm font-bold uppercase tracking-wide ${isVip ? 'text-lime' : 'text-cream'}`}>
            {ticket.name}
          </p>
          {isVip ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-lime/50 bg-lime/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-lime">
              Completo
            </span>
          ) : null}
        </div>

        {showCompare && upcomingPrice != null ? (
          <LotPricePair
            currentLabel={lotLabel}
            currentPrice={ticket.price}
            upcomingPrice={upcomingPrice}
            accent={isVip ? 'lime' : 'cream'}
          />
        ) : (
          <div className="mb-4 flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wide text-cream-muted">{lotLabel}</span>
            <span className="mt-1 text-base font-normal leading-none text-white sm:text-lg">
              {quizOffer && isVip ? (
                <>
                  De <s className="text-white/45">R${QUIZ_VIP_COMPARE}</s> por
                </>
              ) : (
                'por apenas'
              )}
            </span>
            <span
              className={`mt-1 font-normal leading-none tracking-tight tabular-nums ${
                isVip ? 'text-[3.25rem] text-lime sm:text-6xl' : 'text-[2.75rem] text-cream sm:text-5xl'
              }`}
            >
              R${ticket.price}
            </span>
          </div>
        )}

        <div className="mb-4 space-y-2 border-t border-cream/10 pt-4">
          {TICKET_FEATURES.map((feature) => {
            const included = isVip ? feature.vip : feature.basic
            return (
              <div key={feature.text} className="flex items-start gap-2">
                {included ? (
                  <Check size={14} className="mt-0.5 flex-shrink-0 text-lime" />
                ) : (
                  <X size={14} className="mt-0.5 flex-shrink-0 text-cream/30" />
                )}
                <span
                  className={
                    included
                      ? 'text-base text-cream-muted'
                      : 'text-base text-cream/35 line-through decoration-cream/40'
                  }
                >
                  {feature.text}
                </span>
              </div>
            )
          })}
        </div>

        <Button size="md" onClick={onCtaClick} showTicket className="mt-auto w-full">
          Garantir {ticket.name}
        </Button>
        <img
          src={PAY_METHODS_SRC}
          alt="Formas de pagamento"
          width={1310}
          height={132}
          className="mx-auto mt-3 h-auto w-[72%] max-w-[188px] opacity-40"
        />
        {featured && urgency === 'countdown' && (
          <div className="mt-4">
            <LotCountdown endDate={currentLot.endDate} variant="card" />
          </div>
        )}
        {featured && urgency === 'extended' && (
          <div className="mt-4">
            <LotExtendedAlert variant="badge" />
          </div>
        )}
      </div>
    </div>
  )
}

function PostEventCard({ onCtaClick }: { onCtaClick: () => void }) {
  const lot = POST_EVENT_LOT
  return (
    <div className="group relative min-h-[320px] rounded-md bg-gradient-to-b from-[#988D49]/60 to-[#988D49]/20 p-px">
      <div className="flex h-full min-h-[318px] flex-col rounded-[5px] bg-dark p-5 sm:p-6">
        <div className="mb-4 flex flex-col">
          <span className="text-base font-normal leading-none text-white sm:text-lg">
            De <s className="text-white/45">R${POST_EVENT_COMPARE}</s> por
          </span>
          <span
            className="mt-1 font-normal leading-none tracking-tight tabular-nums text-lime"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)' }}
          >
            {lot.priceFormatted}
          </span>
        </div>
        <div className="mb-4 space-y-2 border-t border-cream/10 pt-4">
          {PRICING_FEATURES_POST_EVENT.map((f) => (
            <div key={f} className="flex items-center gap-2">
              <Check size={14} className="flex-shrink-0 text-cream" />
              <span className="text-base text-cream-muted">{f}</span>
            </div>
          ))}
        </div>
        <Button size="md" onClick={onCtaClick} className="w-full">
          Começar agora
        </Button>
        <img
          src={PAY_METHODS_SRC}
          alt="Formas de pagamento"
          width={1310}
          height={132}
          className="mx-auto mt-3 h-auto w-[72%] max-w-[188px] opacity-40"
        />
      </div>
    </div>
  )
}

export function PricingSection({ onCtaClick }: PricingSectionProps) {
  const { currentLot, quizOffer } = useLot()
  const { eventPast } = useEventStatus()
  const tickets: Ticket[] =
    quizOffer && !eventPast
      ? [currentLot.tickets.vip]
      : [currentLot.tickets.vip, currentLot.tickets.basic]

  return (
    <section id={INVESTMENT_SECTION_ID} className="section-padding scroll-mt-28">
      <div className="container-wide">
        <FadeIn>
          <div className="mb-4 flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px w-10 bg-cream/20 sm:w-14" aria-hidden="true" />
            <SectionEyebrow className="mb-0">Investimento</SectionEyebrow>
            <span className="h-px w-10 bg-cream/20 sm:w-14" aria-hidden="true" />
          </div>
          <h2 className="text-section mb-4 text-center text-white">
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
            <p className="text-lead mx-auto mb-8 max-w-2xl text-center text-cream-muted">
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
          <div className="relative mx-auto mb-6 w-full max-w-[500px] sm:mb-8">
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 z-0 h-[80%] w-[120%] max-w-[580px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(236,215,184,0.26)_0%,rgba(236,215,184,0.12)_32%,rgba(236,215,184,0.05)_58%,transparent_85%)] blur-[52px]"
              aria-hidden="true"
            />
            <img
              src={MOCK_SRC}
              alt="Ilustração dos lotes de investimento"
              width={500}
              height={300}
              className="relative z-10 h-auto w-full object-contain"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="mx-auto mb-8 flex max-w-xl items-center gap-5 border-l-4 border-lime bg-cream/[0.06] px-6 py-5 sm:mb-10">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-lime">
              <Award size={20} className="text-dark" strokeWidth={2} aria-hidden="true" />
            </div>
            <p className="text-sm font-black uppercase tracking-wide text-cream sm:text-base">
              Certificado de conclusão do treinamento
            </p>
          </div>
        </FadeIn>

        {eventPast ? (
          <FadeIn delay={0.1} className="mx-auto h-full max-w-md">
            <PostEventCard onCtaClick={() => onCtaClick()} />
          </FadeIn>
        ) : (
          <div className={`mx-auto grid items-stretch gap-4 ${
            quizOffer ? 'max-w-md grid-cols-1' : 'max-w-4xl grid-cols-1 sm:grid-cols-2'
          }`}>
            {tickets.map((ticket, i) => (
              <FadeIn key={ticket.kind} delay={i * 0.1} className="h-full">
                <TicketCard
                  ticket={ticket}
                  lotLabel={currentLot.label}
                  featured={ticket.kind === 'vip'}
                  onCtaClick={() => onCtaClick(ticket.kind)}
                />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
