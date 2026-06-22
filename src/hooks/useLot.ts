import { useState, useEffect } from 'react'
import { isEventPast } from './useEventStatus'

export interface Lot {
  number: 1 | 2 | 3
  price: number
  priceFormatted: string
  label: string
  endDate: Date | null
  hotmartUrl: string
}

/** Encerra à meia-noite após 28/jun (29/jun 00:00 BRT) */
const LOT_1_END = new Date('2026-06-29T00:00:00-03:00')
/** Encerra à meia-noite após 05/jul (06/jul 00:00 BRT) */
const LOT_2_END = new Date('2026-07-06T00:00:00-03:00')
/** Encerra no início do evento (11/jul 09:00 BRT) */
const LOT_3_END = new Date('2026-07-11T09:00:00-03:00')

const HOTMART_CHECKOUTS = {
  1: 'https://pay.hotmart.com/B106392371C?off=6jfj0uyq&checkoutMode=10',
  2: 'https://pay.hotmart.com/B106392371C?off=2113341a&checkoutMode=10',
  3: 'https://pay.hotmart.com/B106392371C?off=hyxj460l&checkoutMode=10',
} as const

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
    price: 197,
    priceFormatted: 'R$ 197,00',
    label: '2º LOTE',
    endDate: LOT_2_END,
    hotmartUrl: HOTMART_CHECKOUTS[2],
  },
  {
    number: 3,
    price: 297,
    priceFormatted: 'R$ 297,00',
    label: '3º LOTE',
    endDate: LOT_3_END,
    hotmartUrl: HOTMART_CHECKOUTS[3],
  },
]

/** Preço padrão pós-evento (3º lote). */
export const POST_EVENT_LOT = LOTS[2]

function getCurrentLot(): Lot {
  if (isEventPast()) return POST_EVENT_LOT

  const now = new Date()
  if (now < LOT_1_END) return LOTS[0]
  if (now < LOT_2_END) return LOTS[1]
  return LOTS[2]
}

export function useLot() {
  const [currentLot, setCurrentLot] = useState<Lot>(getCurrentLot)

  useEffect(() => {
    const tick = () => {
      const lot = getCurrentLot()
      setCurrentLot((prev) => (prev.number !== lot.number ? lot : prev))
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  return { currentLot, lots: LOTS }
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
