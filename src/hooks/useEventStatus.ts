import { useEffect, useState } from 'react'

/** Virada pós-evento: 13/set/2026 00:00 BRT — logo após o dia 12 de setembro. */
export const EVENT_POST_DATE = new Date('2026-09-13T00:00:00-03:00')

function readPreview(): boolean | null {
  if (typeof window === 'undefined') return null
  const hash = window.location.hash.replace(/^#/, '')
  if (hash === 'evento-passado') return true
  if (hash === 'evento-ao-vivo') return false
  const value = new URLSearchParams(window.location.search).get('evento')
  if (value === 'passado') return true
  if (value === 'ao-vivo') return false
  return null
}

export function isEventPast(now = new Date()): boolean {
  const preview = readPreview()
  if (preview !== null) return preview
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
