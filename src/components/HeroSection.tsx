import { Play } from 'lucide-react'
import { LotCtaCard } from './LotCtaCard'
import { FadeIn } from './FadeIn'
import { EventTag } from './EventTag'

const LOGO_SRC = `${import.meta.env.BASE_URL}logo-alta.svg`
const HERO_IMAGE_SRC = `${import.meta.env.BASE_URL}${encodeURIComponent('Prancheta 1.webp')}`
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

function HeroHeadline({ className = '' }: { className?: string }) {
  return (
    <h1
      className={`text-[26px] sm:text-[28px] lg:text-[32px] font-normal leading-[1.2] tracking-tight text-white ${className}`}
    >
      Num mercado em que todo mundo fala de trauma, apego,
      <br className="hidden lg:inline" />
      {' '}crenças e sistema familiar,{' '}
      <span className="italic lg:whitespace-nowrap">repetir os mesmos conceitos</span>
      <br className="hidden lg:inline" />
      {' '}já não diferencia um profissional e pode
      <br className="hidden lg:inline" />
      {' '}
      <span className="font-bold text-red lg:whitespace-nowrap">
        deixar sua atuação com cara de amadora.
      </span>
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
    <p className={`text-white/75 text-[20px] sm:text-[22px] leading-relaxed ${className}`}>
      Desenvolva um olhar que te permita perceber{' '}
      <span className="font-semibold text-cream">o que outros profissionais deixam passar</span>,
      interpretar com mais critério, fazer perguntas melhores e sustentar uma atuação que não
      dependa de respostas prontas, tendências ou{' '}
      <span className="font-semibold text-cream">opiniões disfarçadas de verdade</span>.
    </p>
  )
}

function HeroMobilePhoto() {
  return (
    <div className="relative w-full overflow-hidden aspect-[4/5] max-h-[min(68vh,560px)] sm:aspect-square sm:max-h-[min(62vh,520px)]">
      <img
        src={HERO_MOBILE_IMAGE_SRC}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_26%]"
      />
      <div
        className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-dark via-dark/95 to-transparent sm:h-40"
        aria-hidden="true"
      />
    </div>
  )
}

function HeroPromiseContent({
  onCtaClick,
  layout,
}: {
  onCtaClick: () => void
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
        <HeroLogo className={isMobile ? 'max-w-[260px] mx-auto' : 'max-w-[240px] lg:max-w-[280px] lg:w-[280px]'} />
        <EventTag className={isMobile ? 'mx-auto max-w-full' : ''} />
      </div>

      <HeroHeadline className={isMobile ? 'text-center mt-2' : ''} />
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
}: {
  onCtaClick: () => void
}) {
  return (
    <>
      {/* Mobile: conteúdo sobreposto à base da foto */}
      <div className="relative overflow-hidden lg:hidden">
        <HeroMobilePhoto />
        <div className="relative z-10 -mt-36 bg-gradient-to-b from-transparent from-0% via-dark/90 via-12% to-dark px-5 pb-24 pt-2 text-center sm:-mt-40 sm:px-6">
          <div className="flex flex-col items-center gap-5">
            <HeroPromiseContent onCtaClick={onCtaClick} layout="mobile" />
          </div>
        </div>
      </div>

      {/* Desktop: imagem de fundo com conteúdo à esquerda, no mesmo eixo do header */}
      <div className="relative hidden w-full overflow-hidden pb-24 lg:block lg:aspect-[2040/1080]">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-right bg-center"
          style={{ backgroundImage: `url("${HERO_IMAGE_SRC}")` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-dark from-0% via-dark/85 via-[42%] to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 h-full px-4 pt-10">
          <div className="mx-auto flex h-full min-h-[460px] max-w-6xl items-start">
            <div className="flex w-full max-w-xl flex-col items-start gap-5 pt-0 pb-12 lg:max-w-[min(100%,45rem)]">
              <HeroPromiseContent onCtaClick={onCtaClick} layout="desktop" />
            </div>
          </div>
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

function HeroCenteredLayout({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <FadeIn delay={0} className="relative z-10 w-full">
      <HeroPromiseBlock onCtaClick={onCtaClick} />
    </FadeIn>
  )
}

function HeroWithVideoLayout({ onCtaClick }: { onCtaClick: () => void }) {
  return (
    <div className="relative z-10 w-full container-narrow lg:max-w-6xl">
      <div className="flex flex-col items-center text-center gap-5 lg:hidden">
        <FadeIn delay={0} className="w-full flex flex-col items-center gap-3">
          <HeroLogo />
          <EventTag />
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
            <EventTag />
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
  return (
    <section className="relative w-full overflow-hidden lg:pt-0">
      <HeroGrainOverlay />

      {HERO_VIDEO_ENABLED ? (
        <HeroWithVideoLayout onCtaClick={onCtaClick} />
      ) : (
        <HeroCenteredLayout onCtaClick={onCtaClick} />
      )}
    </section>
  )
}
