const STORAGE_KEY = 'eap_visits'
const SESSION_MS = 30 * 60 * 1000

interface VisitState {
  count: number
  lastAt: number
}

function readState(): VisitState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as VisitState
    if (!parsed || typeof parsed.count !== 'number') return null
    return parsed
  } catch {
    return null
  }
}

function writeState(state: VisitState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // private mode
  }
}

/** New session after 30 minutes away. Refresh in the same visit does not add 1. */
export function trackVisit(): number {
  if (typeof window === 'undefined') return 1
  const now = Date.now()
  const prev = readState()
  if (!prev) {
    writeState({ count: 1, lastAt: now })
    return 1
  }
  const next: VisitState =
    now - prev.lastAt > SESSION_MS
      ? { count: prev.count + 1, lastAt: now }
      : { count: prev.count, lastAt: now }
  writeState(next)
  return next.count
}

export function getVisitCount(): number {
  if (typeof window === 'undefined') return 1
  return readState()?.count || 1
}
