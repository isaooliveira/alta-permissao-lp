const STORAGE_KEY = 'eap_utm'

export interface Utm {
  source?: string
  medium?: string
  campaign?: string
  content?: string
  term?: string
}

const KEYS = ['source', 'medium', 'campaign', 'content', 'term'] as const

function clean(value: string | null): string | undefined {
  if (!value) return undefined
  const trimmed = value.trim().slice(0, 200)
  return trimmed || undefined
}

function fromSearch(search: string): Utm {
  const params = new URLSearchParams(search)
  const utm: Utm = {}
  for (const key of KEYS) {
    const value = clean(params.get(`utm_${key}`))
    if (value) utm[key] = value
  }
  return utm
}

function hasUtm(utm: Utm): boolean {
  return KEYS.some((key) => Boolean(utm[key]))
}

function readStored(): Utm {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as Utm
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeStored(utm: Utm) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(utm))
  } catch {
    // private mode / blocked storage
  }
}

/** First non-direct click in this browser: URL UTMs win, otherwise keep the stored ones. */
export function captureUtm(): Utm {
  if (typeof window === 'undefined') return {}
  const fromUrl = fromSearch(window.location.search)
  const utm = hasUtm(fromUrl) ? fromUrl : readStored()
  if (hasUtm(utm)) writeStored(utm)
  return utm
}

export function getUtm(): Utm {
  if (typeof window === 'undefined') return {}
  const fromUrl = fromSearch(window.location.search)
  if (hasUtm(fromUrl)) return fromUrl
  return readStored()
}

export function utmEventParams(utm = getUtm()): Record<string, string> {
  const params: Record<string, string> = {}
  if (utm.source) params.utm_source = utm.source
  if (utm.medium) params.utm_medium = utm.medium
  if (utm.campaign) params.utm_campaign = utm.campaign
  if (utm.content) params.utm_content = utm.content
  if (utm.term) params.utm_term = utm.term
  return params
}

export function utmLeadFields(utm = getUtm()) {
  return {
    utm_source: utm.source ?? null,
    utm_medium: utm.medium ?? null,
    utm_campaign: utm.campaign ?? null,
    utm_content: utm.content ?? null,
    utm_term: utm.term ?? null,
  }
}

export function withHotmartTracking(checkoutUrl: string, utm = getUtm()): string {
  const url = new URL(checkoutUrl)
  const params = utmEventParams(utm)
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value)
  }
  const src = [utm.source, utm.medium, utm.content || utm.campaign]
    .filter(Boolean)
    .join('-')
    .slice(0, 255)
  if (src) url.searchParams.set('src', src)
  return url.toString()
}
