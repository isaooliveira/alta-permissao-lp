import { useState, useEffect } from 'react'
import { isEventPast } from './useEventStatus'

export type TicketKind = 'vip' | 'basic'

export interface Ticket {
  kind: TicketKind
  name: string
  price: number
  priceFormatted: string
  hotmartUrl: string
}

export interface Lot {
  number: 1 | 2
  price: number
  priceFormatted: string
  label: string
  endDate: Date | null
  hotmartUrl: string
  tickets: Record<TicketKind, Ticket>
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

/** Básico: checkout com order bump. VIP: checkout sem order bump. */
const HOTMART_CHECKOUTS = {
  1: {
    basic: 'https://pay.hotmart.com/J107328514K?off=0xl6k1bh&checkoutMode=10',
    vip: 'https://pay.hotmart.com/J107328514K?off=oahnio0t&checkoutMode=10',
  },
  2: {
    basic: 'https://pay.hotmart.com/J107328514K?off=k2ndc1ab&checkoutMode=10',
    vip: 'https://pay.hotmart.com/J107328514K?off=rnlwed07&checkoutMode=10',
  },
} as const

/** Oferta do quiz — só vale quem chega pelo botão do resultado (`#quiz-127`). */
const QUIZ_OFFER_CODES = ['quiz-127', 'quiz-67']
const QUIZ_OFFER_KEY = 'eap_quiz_offer'
const QUIZ_OFFER_VALUE = 'vip127'
const QUIZ_VIP_PRICE = 127
export const QUIZ_VIP_COMPARE = 197
/** Âncora do acesso imediato (pós-12/set): De R$197 por R$127. */
export const POST_EVENT_COMPARE = 197
export const QUIZ_HOTMART =
  'https://pay.hotmart.com/J107328514K?off=3hb3u72h&checkoutMode=10'

function formatBrl(price: number) {
  return `R$ ${price},00`
}

function makeTicket(
  kind: TicketKind,
  name: string,
  price: number,
  hotmartUrl: string,
): Ticket {
  return { kind, name, price, priceFormatted: formatBrl(price), hotmartUrl }
}

function isQuizOfferUrl() {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  const hash = window.location.hash.replace(/^#/, '')
  const path = window.location.pathname.replace(/\/$/, '')
  return (
    QUIZ_OFFER_CODES.includes(hash) ||
    QUIZ_OFFER_CODES.includes(params.get('s') || '') ||
    QUIZ_OFFER_CODES.includes(params.get('utm_content') || '') ||
    QUIZ_OFFER_CODES.some((code) => path.endsWith(`/${code}`))
  )
}

export function hasQuizOffer() {
  if (typeof window === 'undefined') return false
  if (!isQuizOfferUrl()) return false
  try {
    sessionStorage.setItem(QUIZ_OFFER_KEY, QUIZ_OFFER_VALUE)
  } catch {
    /* private mode */
  }
  return true
}

const LOTS: Lot[] = [
  {
    number: 1,
    price: 47,
    priceFormatted: formatBrl(47),
    label: '1º LOTE',
    endDate: LOT_1_END,
    hotmartUrl: HOTMART_CHECKOUTS[1].basic,
    tickets: {
      vip: makeTicket('vip', 'Ingresso VIP', 147, HOTMART_CHECKOUTS[1].vip),
      basic: makeTicket('basic', 'Ingresso Básico', 47, HOTMART_CHECKOUTS[1].basic),
    },
  },
  {
    number: 2,
    price: 97,
    priceFormatted: formatBrl(97),
    label: '2º LOTE',
    endDate: LOT_2_END,
    hotmartUrl: HOTMART_CHECKOUTS[2].basic,
    tickets: {
      vip: makeTicket('vip', 'Ingresso VIP', 197, HOTMART_CHECKOUTS[2].vip),
      basic: makeTicket('basic', 'Ingresso Básico', 97, HOTMART_CHECKOUTS[2].basic),
    },
  },
]

/** Checkout de acesso imediato após o dia 12/set. */
export const POST_EVENT_LOT: Lot = {
  number: 2,
  price: 127,
  priceFormatted: formatBrl(127),
  label: 'ACESSO IMEDIATO',
  endDate: null,
  hotmartUrl: 'https://pay.hotmart.com/G107328971N?off=v3x36p1y',
  tickets: {
    vip: makeTicket('vip', 'Acesso imediato', 127, 'https://pay.hotmart.com/G107328971N?off=v3x36p1y'),
    basic: makeTicket('basic', 'Acesso imediato', 127, 'https://pay.hotmart.com/G107328971N?off=v3x36p1y'),
  },
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
  const vip = makeTicket('vip', 'Ingresso VIP', QUIZ_VIP_PRICE, QUIZ_HOTMART)
  return {
    ...lot,
    price: QUIZ_VIP_PRICE,
    priceFormatted: formatBrl(QUIZ_VIP_PRICE),
    label: 'OFERTA QUIZ',
    endDate: null,
    hotmartUrl: QUIZ_HOTMART,
    tickets: { vip, basic: vip },
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
        prev.label !== lot.label ||
        prev.hotmartUrl !== lot.hotmartUrl ||
        prev.tickets.vip.price !== lot.tickets.vip.price ||
        prev.tickets.vip.hotmartUrl !== lot.tickets.vip.hotmartUrl ||
        prev.tickets.basic.hotmartUrl !== lot.tickets.basic.hotmartUrl
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
