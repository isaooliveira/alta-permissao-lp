import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useLot, POST_EVENT_COMPARE, QUIZ_VIP_COMPARE } from '@/hooks/useLot'
import { useEventStatus } from '@/hooks/useEventStatus'
import { Button } from './Button'
import { LotCountdown } from './LotCountdown'
import { LotExtendedAlert } from './LotExtendedBadge'
import { ctaLabel } from '@/lib/eventContent'

interface StickyHeaderProps {
  onCtaClick: () => void
}

function HeaderLotPrice({ className = '' }: { className?: string }) {
  const { currentLot, urgency, quizOffer } = useLot()

  if (urgency === 'countdown') {
    return (
      <LotCountdown
        endDate={currentLot.endDate}
        variant="compact"
        className={className}
      />
    )
  }

  if (urgency === 'extended') {
    return <LotExtendedAlert variant="header" className={className} />
  }

  if (quizOffer) {
    return (
      <span className={`shrink-0 tabular-nums tracking-wide text-sm sm:text-base ${className}`}>
        <span className="mr-1.5 text-[10px] font-black uppercase tracking-widest text-lime">VIP</span>
        <s className="font-black text-white/40">{`R$${QUIZ_VIP_COMPARE}`}</s>
        {' '}
        <span className="font-black text-lime">{currentLot.tickets.vip.priceFormatted}</span>
      </span>
    )
  }

  return (
    <span className={`shrink-0 font-black tabular-nums tracking-wide text-lime text-sm sm:text-base ${className}`}>
      {currentLot.tickets.basic.priceFormatted}
    </span>
  )
}

export function StickyHeader({ onCtaClick }: StickyHeaderProps) {
  const { currentLot, quizOffer } = useLot()
  const { eventPast } = useEventStatus()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        top: reduceMotion ? 0 : visible ? 0 : -80,
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 z-50 bg-dark/95 border-b border-cream/8 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md ${
        visible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      aria-hidden={!visible}
    >
      <div className="px-3 py-2 lg:hidden">
        {eventPast ? (
          <div className="flex min-w-0 items-center justify-between gap-2">
            <span className="shrink-0 tabular-nums tracking-wide text-sm">
              <s className="font-black text-white/40">{`R$${POST_EVENT_COMPARE}`}</s>
              {' '}
              <span className="font-black text-lime">{currentLot.priceFormatted}</span>
            </span>
            <Button
              size="sm"
              onClick={onCtaClick}
              className="shrink-0 whitespace-nowrap text-[10px] px-2 py-1.5 tracking-normal"
            >
              {ctaLabel(true)}
            </Button>
          </div>
        ) : (
          <div className="flex min-w-0 items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-red border border-red/50 px-2 py-0.5">
                {currentLot.label}
              </span>
              <HeaderLotPrice className="min-w-0 shrink" />
            </div>
            <Button
              size="sm"
              onClick={onCtaClick}
              className="shrink-0 whitespace-nowrap text-[10px] px-2 py-1.5 tracking-normal"
            >
              {ctaLabel(false, quizOffer)}
            </Button>
          </div>
        )}
      </div>

      <div className="hidden px-4 py-2.5 lg:block">
        {eventPast ? (
          <div className="container-narrow mx-auto flex items-center justify-between gap-3 lg:max-w-6xl">
            <span className="shrink-0 tabular-nums tracking-wide text-sm sm:text-base">
              <s className="font-black text-white/40">{`R$${POST_EVENT_COMPARE}`}</s>
              {' '}
              <span className="font-black text-lime">{currentLot.priceFormatted}</span>
            </span>
            <Button
              size="sm"
              onClick={onCtaClick}
              className="whitespace-nowrap text-xs px-3 py-1.5 tracking-wide sm:text-sm sm:px-4 sm:py-2"
            >
              {ctaLabel(true)}
            </Button>
          </div>
        ) : (
          <div className="container-narrow lg:max-w-6xl mx-auto flex items-center justify-between gap-3 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:flex-none">
              <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-red border border-red/50 px-2 py-0.5">
                {currentLot.label}
              </span>
              <HeaderLotPrice className="min-w-0 shrink-0" />
            </div>

            <div className="shrink-0 lg:justify-self-end">
              <Button
                size="sm"
                onClick={onCtaClick}
                className="whitespace-nowrap text-xs px-3 py-1.5 tracking-wide sm:text-sm sm:px-4 sm:py-2"
              >
                {ctaLabel(false, quizOffer)}
              </Button>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  )
}
