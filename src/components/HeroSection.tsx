import { Play } from 'lucide-react'
import { LotCtaCard } from './LotCtaCard'
import { FadeIn } from './FadeIn'
import { EventTag } from './EventTag'
import { useEventStatus } from '@/hooks/useEventStatus'
import logoImg from '@/assets/logo-efeitoaltapermissao.svg'

/** Troque para `true` quando o vídeo estiver pronto para restaurar o layout em duas colunas. */
const HERO_VIDEO_ENABLED = false

interface HeroSectionProps {
  onCtaClick: () => void
}

function HeroLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src={logoImg}
      alt="Alta Permissão, Missão Consciência"
      width={215}
      height={61}
      className={`w-[215px] h-[61px] object-contain shrink-0 ${className}`}
    />
  )
}

function HeroHeadline({ className = '' }: { className?: string }) {
  return (
    <h1 className={`text-[28px] sm:text-[32px] font-normal leading-[1.15] tracking-tight text-white ${className}`}>
      Em 1 dia, você aprenderá por que pessoas inteligentes, conscientes e cheias de potencial
      continuam{' '}
      <span className="font-semibold text-red">criando</span>{' '}
      <span className="font-semibold text-red">limites</span> no{' '}
      <span className="font-semibold text-cream">dinheiro</span>, nos{' '}
      <span className="font-semibold text-cream">relacionamentos</span>, na{' '}
      <span className="font-semibold text-cream">autoestima</span> e na forma como{' '}
      <span className="font-semibold text-cream">enxergam a si mesmas.</span>
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
      Uma introdução prática à{' '}
      <strong className="text-cream">Alta Permissão Sistêmica</strong>, para aplicar na vida
      pessoal, nas relações, no trabalho e em qualquer atuação que envolva desenvolvimento
      humano.
    </p>
  )
}

function HeroCtaBlock({ onCtaClick }: { onCtaClick: () => void }) {
  return <LotCtaCard onCtaClick={onCtaClick} />
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
    <div className="relative z-10 w-full container-narrow">
      <div className="flex flex-col items-center text-center gap-5">
        <FadeIn delay={0} className="w-full flex flex-col items-center gap-3">
          <HeroLogo />
          {!eventPast && <EventTag />}
        </FadeIn>

        <FadeIn delay={0.1} className="w-full">
          <HeroHeadline />
        </FadeIn>

        <FadeIn delay={0.2} className="w-full">
          <HeroIntro />
        </FadeIn>

        <FadeIn delay={0.35} className="w-full">
          <HeroCtaBlock onCtaClick={onCtaClick} />
        </FadeIn>
      </div>
    </div>
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
    <section className="relative flex flex-col items-center justify-center px-4 pt-20 pb-12 overflow-hidden">
      <HeroGrainOverlay />

      {HERO_VIDEO_ENABLED ? (
        <HeroWithVideoLayout onCtaClick={onCtaClick} eventPast={eventPast} />
      ) : (
        <HeroCenteredLayout onCtaClick={onCtaClick} eventPast={eventPast} />
      )}
    </section>
  )
}
