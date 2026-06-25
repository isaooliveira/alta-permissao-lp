import { Play } from 'lucide-react'
import { LotCtaCard } from './LotCtaCard'
import { FadeIn } from './FadeIn'
import { EventTag } from './EventTag'
import { useEventStatus } from '@/hooks/useEventStatus'

const LOGO_SRC = `${import.meta.env.BASE_URL}logo-alta.svg`
const HERO_IMAGE_SRC = `${import.meta.env.BASE_URL}bg--webp.webp`

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
    <h1 className={`text-[28px] sm:text-[32px] font-normal leading-[1.15] tracking-tight text-white ${className}`}>
      Como criar um{' '}
      <span className="font-semibold">estado interno tão forte</span> que a{' '}
      <span className="font-semibold">realidade responde aos seus comandos</span> e{' '}
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

function HeroIntro() {
  return (
    <p className="text-cream-muted text-lead">
      Um treinamento de 1 dia com o método prático para alinhar seus pensamentos e
      comportamentos automáticos, fazendo o seu potencial infinito trabalhar 100% a favor do
      seu crescimento pessoal, profissional e financeiro.
    </p>
  )
}

function HeroCtaBlock({ onCtaClick }: { onCtaClick: () => void }) {
  return <LotCtaCard onCtaClick={onCtaClick} />
}

function HeroVisual({ variant }: { variant: 'mobile' | 'desktop' }) {
  if (variant === 'mobile') {
    return (
      <div className="relative w-full aspect-[16/10] max-h-[min(42vh,360px)] min-h-[220px] overflow-hidden">
        <img
          src={HERO_IMAGE_SRC}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-dark/10 via-dark/35 to-dark"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-dark via-dark/90 to-transparent"
          aria-hidden="true"
        />
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-sm">
      <img
        src={HERO_IMAGE_SRC}
        alt=""
        className="w-full h-auto object-contain"
      />
    </div>
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
    <>
      {/* Mobile: imagem no topo com esmaecimento */}
      <FadeIn delay={0} className="lg:hidden relative z-10 w-full">
        <HeroVisual variant="mobile" />
      </FadeIn>

      <div className="relative z-10 w-full container-narrow px-4 lg:px-0">
        <div className="flex flex-col items-start text-left gap-5 lg:items-center lg:text-center">
          <FadeIn delay={0} className="w-full flex flex-col items-start gap-3 lg:items-center">
            <HeroLogo className="lg:mx-auto" />
            {!eventPast && <EventTag />}
          </FadeIn>

          <FadeIn delay={0.08} className="hidden lg:block w-full">
            <HeroVisual variant="desktop" />
          </FadeIn>

          <FadeIn delay={0.1} className="w-full">
            <HeroHeadline />
          </FadeIn>

          <FadeIn delay={0.2} className="w-full max-w-2xl lg:mx-auto">
            <HeroIntro />
          </FadeIn>

          <FadeIn delay={0.35} className="w-full lg:max-w-lg lg:mx-auto">
            <HeroCtaBlock onCtaClick={onCtaClick} />
          </FadeIn>
        </div>
      </div>
    </>
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
          <HeroCtaBlock onCtaClick={onCtaClick} />
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
            <HeroCtaBlock onCtaClick={onCtaClick} />
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
    <section className="relative flex flex-col items-center justify-center px-0 lg:px-4 pt-16 lg:pt-20 pb-12 overflow-hidden">
      <HeroGrainOverlay />

      {HERO_VIDEO_ENABLED ? (
        <HeroWithVideoLayout onCtaClick={onCtaClick} eventPast={eventPast} />
      ) : (
        <HeroCenteredLayout onCtaClick={onCtaClick} eventPast={eventPast} />
      )}
    </section>
  )
}
