import { useState, useEffect } from 'react'
import { isEventPast } from './useEventStatus'

export interface Lot {
  number: 1 | 2
  price: number
  priceFormatted: string
  label: string
  endDate: Date | null
  hotmartUrl: string
}

export type LotUrgency = 'soon' | 'extended' | 'countdown'

const FORTY_EIGHT_HOURS_MS = 48 * 60 * 60 * 1000

/** 1º lote: até 06/set 23:59 BRT (vira 07/set 00:00). */
const LOT_1_END = new Date('2026-09-07T00:00:00-03:00')
/** 2º lote: até o início do evento (12/set 10:00 BRT). */
const LOT_2_END = new Date('2026-09-12T10:00:00-03:00')

/** Depois do dia 02/set — a partir de 03/set 00:00 BRT. */
const LOT_1_EXTENDED_AT = new Date('2026-09-03T00:00:00-03:00')
/** Dia 05/set depois de 23:59 BRT — a partir de 06/set 00:00. */
const LOT_1_COUNTDOWN_AT = new Date('2026-09-06T00:00:00-03:00')

const HOTMART_CHECKOUTS = {
  1: 'https://pay.hotmart.com/J107328514K?off=0xl6k1bh&checkoutMode=10',
  2: 'https://pay.hotmart.com/J107328514K?off=k2ndc1ab&checkoutMode=10',
} as const

/** Oferta do quiz — só vale na sessão que chegou com #quiz-67. */
const QUIZ_OFFER_KEY = 'eap_quiz_offer'
const QUIZ_HOTMART =
  'https://pay.hotmart.com/J107328514K?off=3hb3u72h&checkoutMode=10'

function captureQuizOffer() {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const hash = window.location.hash.replace(/^#/, '')
  const fromUrl =
    hash === 'quiz-67' ||
    hash === 'quiz-ig' ||
    params.get('s') === 'quiz-67' ||
    params.get('s') === 'quiz-ig' ||
    params.get('utm_content') === 'quiz-67' ||
    params.get('utm_content') === 'quiz-ig'
  if (fromUrl) {
    try {
      sessionStorage.setItem(QUIZ_OFFER_KEY, '67')
    } catch {
      /* private mode */
    }
  }
}

function hasQuizOffer() {
  if (typeof window === 'undefined') return false
  captureQuizOffer()
  try {
    return sessionStorage.getItem(QUIZ_OFFER_KEY) === '67'
  } catch {
    return false
  }
}

const LOTS: Lot[] = [
  {
    number: 1,
    price: 97,
    priceFormatted: 'R$ 97,00',
    label: '1º LOTE',
    endDate: LOT_1_END,
    hotmartUrl: HOTMART_CHECKOUTS[1],
  },
  {
    number: 2,
    price: 147,
    priceFormatted: 'R$ 147,00',
    label: '2º LOTE',
    endDate: LOT_2_END,
    hotmartUrl: HOTMART_CHECKOUTS[2],
  },
]

/** Checkout de acesso imediato após o dia 12/set. */
export const POST_EVENT_LOT: Lot = {
  number: 2,
  price: 127,
  priceFormatted: 'R$ 127,00',
  label: 'ACESSO IMEDIATO',
  endDate: null,
  hotmartUrl: 'https://pay.hotmart.com/G107328971N?off=v3x36p1y',
}

function getCurrentLot(now = new Date()): Lot {
  if (isEventPast(now)) return POST_EVENT_LOT
  if (now < LOT_1_END) return LOTS[0]
  return LOTS[1]
}

function readPreviewUrgency(): LotUrgency | null {
  if (typeof window === 'undefined') return null
  const value = new URLSearchParams(window.location.search).get('lote')
  if (value === 'prorrogado') return 'extended'
  if (value === 'contador') return 'countdown'
  return null
}

/**
 * Datas avaliadas em runtime (Date.now), não no build — vale depois do deploy.
 *
 * 1º lote:
 * - até 02/set: "o lote vira em breve"
 * - a partir de 03/set: "1º Lote foi Prorrogado"
 * - a partir de 06/set 00:00 (05/set depois de 23:59): contador
 * 2º lote: menção até faltar 48h; depois, contador.
 *
 * Preview local: ?lote=prorrogado | ?lote=contador
 */
export function getLotUrgency(now = new Date(), lot = getCurrentLot(now)): LotUrgency {
  const preview = readPreviewUrgency()
  if (preview) return preview

  if (isEventPast(now) || !lot.endDate) return 'soon'

  const msLeft = lot.endDate.getTime() - now.getTime()
  if (msLeft <= 0) return 'soon'

  if (lot.number === 1) {
    if (now.getTime() >= LOT_1_COUNTDOWN_AT.getTime()) return 'countdown'
    if (now.getTime() >= LOT_1_EXTENDED_AT.getTime()) return 'extended'
    return 'soon'
  }

  return msLeft <= FORTY_EIGHT_HOURS_MS ? 'countdown' : 'soon'
}

function withQuizOffer(lot: Lot): Lot {
  if (isEventPast() || !hasQuizOffer()) return lot
  return {
    ...lot,
    price: 67,
    priceFormatted: 'R$ 67,00',
    endDate: null,
    hotmartUrl: QUIZ_HOTMART,
  }
}

export function useLot() {
  const [currentLot, setCurrentLot] = useState<Lot>(() => withQuizOffer(getCurrentLot()))
  const [urgency, setUrgency] = useState<LotUrgency>(() =>
    hasQuizOffer() ? 'soon' : getLotUrgency(),
  )
  const [quizOffer, setQuizOffer] = useState(() => hasQuizOffer())

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const publicLot = getCurrentLot(now)
      const lot = withQuizOffer(publicLot)
      const offer = hasQuizOffer()
      const nextUrgency = offer ? 'soon' : getLotUrgency(now, publicLot)
      setQuizOffer(offer)
      setCurrentLot((prev) =>
        prev.number !== lot.number ||
        prev.price !== lot.price ||
        prev.hotmartUrl !== lot.hotmartUrl
          ? lot
          : prev,
      )
      setUrgency((prev) => (prev !== nextUrgency ? nextUrgency : prev))
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return { currentLot, lots: LOTS, urgency, quizOffer }
}

export function useCountdown(endDate: Date | null) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    expired: boolean
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false })

  useEffect(() => {
    if (!endDate) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true })
      return
    }

    function calc() {
      const diff = endDate!.getTime() - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: true })
        return
      }
      const days = Math.floor(diff / 86400000)
      const hours = Math.floor((diff % 86400000) / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setTimeLeft({ days, hours, minutes, seconds, expired: false })
    }

    calc()
    const interval = setInterval(calc, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  return timeLeft
}
