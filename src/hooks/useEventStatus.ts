import { useEffect, useState } from 'react'

/** Virada pós-evento: 13/jul/2026 00:00 BRT — logo após o dia 12 de julho. */
export const EVENT_POST_DATE = new Date('2026-07-13T00:00:00-03:00')

export function isEventPast(now = new Date()): boolean {
  return now.getTime() >= EVENT_POST_DATE.getTime()
}

export function useEventStatus() {
  const [eventPast, setEventPast] = useState(() => isEventPast())

  useEffect(() => {
    const tick = () => setEventPast(isEventPast())
    tick()
    const interval = setInterval(tick, 30_000)
    return () => clearInterval(interval)
  }, [])

  return { eventPast }
}
