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

const SHORT_LINKS: Record<string, Utm> = {
  'wa-avisos': { source: 'whatsapp', medium: 'grupo', campaign: 'eap-set-2026', content: 'grupo-avisos' },
  'wa-alunas': { source: 'whatsapp', medium: 'grupo', campaign: 'eap-set-2026', content: 'grupo-alunas' },
  'wa-lista': { source: 'whatsapp', medium: 'reativacao', campaign: 'eap-set-2026', content: 'lista-fria' },
  'ig-stories': { source: 'instagram', medium: 'organico', campaign: 'eap-set-2026', content: 'stories' },
  'ig-feed': { source: 'instagram', medium: 'organico', campaign: 'eap-set-2026', content: 'feed' },
  bio: { source: 'instagram', medium: 'organico', campaign: 'eap-set-2026', content: 'bio' },
  'quiz-ig': { source: 'instagram', medium: 'organico', campaign: 'eap-set-2026', content: 'quiz-ig' },
  'quiz-67': { source: 'instagram', medium: 'organico', campaign: 'eap-set-2026', content: 'quiz-67' },
  'quiz-wa': { source: 'whatsapp', medium: 'organico', campaign: 'eap-set-2026', content: 'quiz-wa' },
}

const ORIGIN_LABELS: Record<string, string> = {
  'grupo-avisos': 'WhatsApp Avisos',
  'grupo-alunas': 'WhatsApp Alunas',
  'lista-fria': 'WhatsApp Lista',
  stories: 'IG Stories',
  feed: 'IG Feed',
  bio: 'IG Bio',
  'quiz-ig': 'Quiz Instagram',
  'quiz-67': 'Quiz R$67',
  'quiz-wa': 'Quiz WhatsApp',
}

export function utmFriendlyLabel(row: {
  source?: string
  medium?: string
  content?: string
}): string {
  const content = row.content?.trim()
  if (content && ORIGIN_LABELS[content]) return ORIGIN_LABELS[content]
  if (!row.source || row.source === '(sem utm)') return 'Sem UTM'
  return [row.source, row.medium].filter((part) => part && part !== '—').join(' · ')
}

function shortFromWindow(): Utm {
  if (typeof window === 'undefined') return {}
  const fromQuery = new URLSearchParams(window.location.search).get('s')
  if (fromQuery && SHORT_LINKS[fromQuery]) return { ...SHORT_LINKS[fromQuery] }
  const fromHash = window.location.hash.replace(/^#/, '')
  if (fromHash && SHORT_LINKS[fromHash]) return { ...SHORT_LINKS[fromHash] }
  return {}
}

function fromSearch(search: string): Utm {
  const short = shortFromWindow()
  if (hasUtm(short)) return short
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

/** Primeiro clique com UTM neste navegador. Visita nova não sobrescreve a origem. */
export function captureUtm(): Utm {
  if (typeof window === 'undefined') return {}
  const stored = readStored()
  if (hasUtm(stored)) return stored
  const fromUrl = fromSearch(window.location.search)
  if (hasUtm(fromUrl)) writeStored(fromUrl)
  return hasUtm(fromUrl) ? fromUrl : {}
}

export function getUtm(): Utm {
  if (typeof window === 'undefined') return {}
  const stored = readStored()
  if (hasUtm(stored)) return stored
  return fromSearch(window.location.search)
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
