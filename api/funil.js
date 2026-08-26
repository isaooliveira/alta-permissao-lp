/** @param {import('@vercel/node').VercelRequest} req */
/** @param {import('@vercel/node').VercelResponse} res */

import crypto from 'crypto'

const LEAD_SOURCE = 'alta_permissao_jul_2026'
const PROPERTY_ID = process.env.GA_PROPERTY_ID || '414824091'

function periodRange(period) {
  const today = new Date()
  const endDate = today.toISOString().slice(0, 10)
  if (period === '7d') {
    const start = new Date(today)
    start.setDate(start.getDate() - 6)
    return { startDate: start.toISOString().slice(0, 10), endDate }
  }
  if (period === '30d') {
    const start = new Date(today)
    start.setDate(start.getDate() - 29)
    return { startDate: start.toISOString().slice(0, 10), endDate }
  }
  return { startDate: '2026-08-01', endDate }
}

function unauthorized(res) {
  return res.status(401).json({ error: 'Unauthorized' })
}

function getSecret(req) {
  const header = req.headers['x-funil-secret']
  if (typeof header === 'string' && header) return header
  const query = req.query?.secret
  if (typeof query === 'string' && query) return query
  return ''
}

function parseServiceAccount() {
  const raw = process.env.GA_SERVICE_ACCOUNT_JSON
  if (!raw) throw new Error('GA_SERVICE_ACCOUNT_JSON ausente')
  return JSON.parse(raw)
}

function base64url(value) {
  return Buffer.from(value).toString('base64url')
}

function googleJwt(email, privateKey) {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = base64url(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/analytics.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  )
  const unsigned = `${header}.${payload}`
  const signer = crypto.createSign('RSA-SHA256')
  signer.update(unsigned)
  const signature = signer.sign(privateKey, 'base64url')
  return `${unsigned}.${signature}`
}

async function googleAccessToken() {
  const account = parseServiceAccount()
  const assertion = googleJwt(account.client_email, account.private_key)
  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  })
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  const json = await response.json()
  if (!response.ok || !json.access_token) {
    throw new Error(json.error_description || json.error || 'Falha ao autenticar no Google')
  }
  return json.access_token
}

async function runReport(accessToken, report) {
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    },
  )
  const json = await response.json()
  if (!response.ok) {
    throw new Error(json.error?.message || `GA4 ${response.status}`)
  }
  return json
}

function metricValue(report, name) {
  const index = (report.metricHeaders || []).findIndex((h) => h.name === name)
  if (index < 0) return 0
  const row = report.rows?.[0]
  if (!row) return 0
  return Number(row.metricValues[index]?.value || 0)
}

function eventCounts(report) {
  const counts = { begin_checkout: 0, generate_lead: 0 }
  for (const row of report.rows || []) {
    const name = row.dimensionValues?.[0]?.value
    const value = Number(row.metricValues?.[0]?.value || 0)
    if (name === 'begin_checkout' || name === 'generate_lead') counts[name] = value
  }
  return counts
}

async function supabaseFetch(path, extraHeaders = {}) {
  const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Supabase service role não configurado')

  const response = await fetch(`${url}/rest/v1/${path}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      ...extraHeaders,
    },
  })
  if (!response.ok) {
    throw new Error(await response.text())
  }
  return response
}

async function supabasePeople(startDate) {
  const base = `alta_permissao_leads?source=eq.${LEAD_SOURCE}&created_at=gte.${startDate}T00:00:00-03:00`
  let rows
  try {
    const response = await supabaseFetch(
      `${base}&select=email,status,utm_source,utm_medium,utm_campaign,utm_content,visit_count,created_at&order=created_at.asc`,
    )
    rows = await response.json()
  } catch {
    const response = await supabaseFetch(
      `${base}&select=email,status,utm_source,utm_medium,utm_campaign,utm_content,created_at&order=created_at.asc`,
    )
    rows = await response.json()
  }

  const people = new Map()

  for (const row of rows) {
    const email = String(row.email || '').trim().toLowerCase()
    if (!email) continue

    const utm = {
      source: row.utm_source || '(sem utm)',
      medium: row.utm_medium || '—',
      campaign: row.utm_campaign || '—',
      content: row.utm_content || '—',
    }
    const bought = row.status === 'comprou'
    const visits = Number(row.visit_count) > 0 ? Number(row.visit_count) : 0
    const prev = people.get(email)

    if (!prev) {
      people.set(email, { purchased: bought, visitCount: visits, ...utm })
      continue
    }

    prev.purchased = prev.purchased || bought
    prev.visitCount = Math.max(prev.visitCount, visits)
    if (row.utm_source) Object.assign(prev, utm)
  }

  const map = new Map()
  const purchaseVisits = { 1: 0, 2: 0, 3: 0, 4: 0, unknown: 0 }

  for (const person of people.values()) {
    const key = [person.source, person.medium, person.campaign, person.content].join(' | ')
    const current = map.get(key) || {
      source: person.source,
      medium: person.medium,
      campaign: person.campaign,
      content: person.content,
      filled: 0,
      purchased: 0,
    }
    current.filled += 1
    if (person.purchased) current.purchased += 1
    map.set(key, current)

    if (!person.purchased) continue
    if (!person.visitCount) purchaseVisits.unknown += 1
    else if (person.visitCount >= 4) purchaseVisits[4] += 1
    else purchaseVisits[person.visitCount] += 1
  }

  return {
    utm: [...map.values()].sort((a, b) => b.purchased - a.purchased || b.filled - a.filled),
    purchaseVisits,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const expected = process.env.FUNIL_SECRET
  if (!expected) {
    return res.status(503).json({ error: 'FUNIL_SECRET não configurado na Vercel' })
  }
  if (getSecret(req) !== expected) return unauthorized(res)

  const period = typeof req.query?.period === 'string' ? req.query.period : 'all'
  const range = periodRange(period)

  try {
    const { utm: utmRows, purchaseVisits } = await supabasePeople(range.startDate)
    const filled = utmRows.reduce((n, row) => n + row.filled, 0)
    const purchased = utmRows.reduce((n, row) => n + row.purchased, 0)

    let ga = { sessions: 0, users: 0, pageviews: 0, begin_checkout: 0, generate_lead: 0 }
    let gaError = ''

    try {
      const token = await googleAccessToken()
      const pageFilter = {
        filter: {
          fieldName: 'pagePath',
          stringFilter: { matchType: 'CONTAINS', value: '/eap' },
        },
      }
      const [traffic, events] = await Promise.all([
        runReport(token, {
          dateRanges: [range],
          metrics: [
            { name: 'sessions' },
            { name: 'activeUsers' },
            { name: 'screenPageViews' },
          ],
          dimensionFilter: pageFilter,
        }),
        runReport(token, {
          dateRanges: [range],
          dimensions: [{ name: 'eventName' }],
          metrics: [{ name: 'eventCount' }],
          dimensionFilter: {
            andGroup: {
              expressions: [
                {
                  filter: {
                    fieldName: 'eventName',
                    inListFilter: { values: ['begin_checkout', 'generate_lead'] },
                  },
                },
                pageFilter,
              ],
            },
          },
        }),
      ])
      ga = {
        sessions: metricValue(traffic, 'sessions'),
        users: metricValue(traffic, 'activeUsers'),
        pageviews: metricValue(traffic, 'screenPageViews'),
        ...eventCounts(events),
      }
    } catch (err) {
      gaError = err instanceof Error ? err.message : 'Falha ao ler o Analytics'
      console.error('[funil] GA', err)
    }

    return res.status(200).json({
      period,
      range,
      visits: ga.sessions,
      users: ga.users,
      pageviews: ga.pageviews,
      openedForm: ga.begin_checkout,
      filled,
      purchased,
      abandoned: Math.max(filled - purchased, 0),
      utm: utmRows,
      purchaseVisits,
      gaError,
    })
  } catch (err) {
    console.error('[funil]', err)
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Erro ao montar o funil' })
  }
}
