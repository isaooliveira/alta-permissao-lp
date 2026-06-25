import { Play } from 'lucide-react'
import { LotCtaCard } from './LotCtaCard'
import { FadeIn } from './FadeIn'
import { EventTag } from './EventTag'
import { useEventStatus } from '@/hooks/useEventStatus'

const LOGO_SRC = `${import.meta.env.BASE_URL}logo-alta.svg`
const HERO_IMAGE_SRC = `${import.meta.env.BASE_URL}bg--webp.webp`
const HERO_MOBILE_IMAGE_SRC = `${import.meta.env.BASE_URL}bg-mobile.webp`

/** Troque para `true` quando o vídeo estiver pronto para restaurar o layout em duas colunas. */
const HERO_VIDEO_ENABLED = false

interface HeroSectionProps {
  onCtaClick: () => void
}

function HeroLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Alta Permissão, Missão Consciência"
      width={280}
      height={51}
      className={`w-full max-w-[280px] h-auto object-contain shrink-0 ${className}`}
    />
  )
}

function HeroHeadline({ className = '', mobile = false }: { className?: string; mobile?: boolean }) {
  if (mobile) {
    return (
      <h1
        className={`text-[26px] font-normal leading-[1.2] tracking-tight text-white ${className}`}
      >
        Como criar um{' '}
        <span className="font-semibold text-cream">estado interno tão forte</span> que a realidade
        responde aos seus comandos e{' '}
        <span className="font-semibold text-cream">materializa o seu futuro</span>
      </h1>
    )
  }

  return (
    <h1 className={`text-[26px] sm:text-[30px] lg:text-[32px] font-normal leading-[1.15] tracking-tight text-white ${className}`}>
      Como criar um{' '}
      <span className="font-semibold text-cream">estado interno</span> tão{' '}
      <span className="font-semibold text-cream">forte</span> que a{' '}
      <span className="font-semibold text-cream">realidade</span> responde aos seus comandos e{' '}
      <span className="font-semibold text-cream">materializa o seu futuro</span>
    </h1>
  )
}

function HeroVideo() {
  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-[1080/1440] bg-dark border border-cream/10 flex items-center justify-center group cursor-pointer hover:border-cream/25 transition-colors">
      <div className="flex flex-col items-center gap-3">
        <div className="w-14 h-14 rounded-full border border-cream/25 bg-cream/0 flex items-center justify-center group-hover:border-cream group-hover:text-cream group-hover:bg-cream/10 group-hover:scale-105 transition-all duration-300 text-cream/30">
          <Play size={20} fill="currentColor" />
        </div>
        <span className="text-cream/25 text-xs uppercase tracking-widest">
          Assista antes de decidir
        </span>
      </div>
    </div>
  )
}

function HeroIntro({ className = '' }: { className?: string }) {
  return (
    <p className={`text-white/75 text-base sm:text-lg leading-relaxed ${className}`}>
      Um treinamento de 1 dia com o método prático para alinhar seus pensamentos e
      comportamentos automáticos, fazendo o seu potencial infinito trabalhar 100% a favor do
      seu crescimento pessoal, profissional e financeiro.
    </p>
  )
}

function HeroMobilePhoto() {
  return (
    <div className="relative w-full overflow-hidden aspect-square max-h-[min(62vh,520px)]">
      <img
        src={HERO_MOBILE_IMAGE_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-dark via-dark/95 to-transparent"
        aria-hidden="true"
      />
    </div>
  )
}

function HeroPromiseContent({
  onCtaClick,
  eventPast,
  layout,
}: {
  onCtaClick: () => void
  eventPast: boolean
  layout: 'mobile' | 'desktop'
}) {
  const isMobile = layout === 'mobile'

  return (
    <>
      <div
        className={`flex w-full flex-col ${
          isMobile ? 'items-center gap-4' : 'items-start gap-3'
        }`}
      >
        <HeroLogo className={isMobile ? 'max-w-[260px] mx-auto' : 'max-w-[240px] sm:max-w-[280px]'} />
        {!eventPast && <EventTag className={isMobile ? 'mx-auto' : ''} />}
      </div>

      <HeroHeadline mobile={isMobile} className={isMobile ? 'text-center mt-2' : ''} />
      <HeroIntro className={isMobile ? 'text-center text-white/70' : ''} />

      <div className={`w-full max-w-md ${isMobile ? 'mx-auto mt-6' : 'mt-8'}`}>
        <LotCtaCard
          onCtaClick={onCtaClick}
          variant={isMobile ? 'mobile' : 'hero'}
        />
      </div>
    </>
  )
}

function HeroPromiseBlock({
  onCtaClick,
  eventPast,
}: {
  onCtaClick: () => void
  eventPast: boolean
}) {
  return (
    <>
      {/* Mobile: foto no topo, promessa embaixo centralizada */}
      <div className="flex flex-col lg:hidden">
        <HeroMobilePhoto />
        <div className="flex flex-col items-center gap-5 bg-dark px-5 pt-8 pb-24 text-center sm:px-6">
          <HeroPromiseContent onCtaClick={onCtaClick} eventPast={eventPast} layout="mobile" />
        </div>
      </div>

      {/* Desktop: imagem de fundo com conteúdo à esquerda */}
      <div className="relative hidden w-full overflow-hidden pb-24 lg:block lg:aspect-[2040/1080]">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-right bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE_SRC})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-dark from-0% via-dark/85 via-[42%] to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full min-h-[460px] flex-col items-start justify-center gap-5 px-12 py-12 pt-28 xl:max-w-[48%] xl:px-16">
          <HeroPromiseContent onCtaClick={onCtaClick} eventPast={eventPast} layout="desktop" />
        </div>
      </div>
    </>
  )
}

function HeroGrainOverlay() {
  return (
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
      }}
    />
  )
}

function HeroCenteredLayout({ onCtaClick, eventPast }: { onCtaClick: () => void; eventPast: boolean }) {
  return (
    <FadeIn delay={0} className="relative z-10 w-full">
      <HeroPromiseBlock onCtaClick={onCtaClick} eventPast={eventPast} />
    </FadeIn>
  )
}

function HeroWithVideoLayout({ onCtaClick, eventPast }: { onCtaClick: () => void; eventPast: boolean }) {
  return (
    <div className="relative z-10 w-full container-narrow lg:max-w-6xl">
      <div className="flex flex-col items-center text-center gap-5 lg:hidden">
        <FadeIn delay={0} className="w-full flex flex-col items-center gap-3">
          <HeroLogo />
          {!eventPast && <EventTag />}
        </FadeIn>

        <FadeIn delay={0.1} className="w-full">
          <HeroHeadline />
        </FadeIn>

        <FadeIn delay={0.2} className="w-full max-w-lg">
          <HeroIntro />
        </FadeIn>

        <FadeIn delay={0.35} className="w-full">
          <HeroVideo />
        </FadeIn>

        <FadeIn delay={0.45} className="w-full">
          <LotCtaCard onCtaClick={onCtaClick} />
        </FadeIn>
      </div>

      <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
        <div className="flex flex-col items-start text-left gap-5">
          <FadeIn delay={0} className="w-full flex items-center justify-between gap-4">
            <HeroLogo />
            {!eventPast && <EventTag />}
          </FadeIn>

          <FadeIn delay={0.15} className="w-full mt-5">
            <HeroHeadline />
          </FadeIn>

          <FadeIn delay={0.2} className="w-full">
            <HeroIntro />
          </FadeIn>

          <FadeIn delay={0.3} className="w-full flex flex-col items-start gap-4 pt-2">
            <LotCtaCard onCtaClick={onCtaClick} />
          </FadeIn>
        </div>

        <FadeIn delay={0.1} className="w-full px-9">
          <HeroVideo />
        </FadeIn>
      </div>
    </div>
  )
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const { eventPast } = useEventStatus()

  return (
    <section className="relative w-full overflow-hidden lg:pt-0">
      <HeroGrainOverlay />

      {HERO_VIDEO_ENABLED ? (
        <HeroWithVideoLayout onCtaClick={onCtaClick} eventPast={eventPast} />
      ) : (
        <HeroCenteredLayout onCtaClick={onCtaClick} eventPast={eventPast} />
      )}
    </section>
  )
}
