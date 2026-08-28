/** @param {import('@vercel/node').VercelRequest} req */
/** @param {import('@vercel/node').VercelResponse} res */

const PURCHASE_EVENTS = new Set(['PURCHASE_APPROVED', 'PURCHASE_COMPLETE'])
const LEAD_SOURCE = 'alta_permissao_jul_2026'

function parseBody(body) {
  if (!body) return {}
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return {}
    }
  }
  return body
}

function getHottok(req, body) {
  return (
    req.headers['x-hotmart-hottok'] ||
    req.headers['hottok'] ||
    (typeof body.hottok === 'string' ? body.hottok : undefined)
  )
}

async function supabaseFetch(path, { method = 'GET', body } = {}) {
  const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error('Supabase service role não configurado na Vercel')
  }

  const response = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  const text = await response.text()
  let json = null
  try {
    json = text ? JSON.parse(text) : null
  } catch {
    json = text
  }

  if (!response.ok) {
    const message = typeof json === 'object' && json?.message ? json.message : text
    throw new Error(message || `Supabase ${response.status}`)
  }

  return json
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = parseBody(req.body)
  const hottok = getHottok(req, body)

  if (!hottok || hottok !== process.env.HOTMART_WEBHOOK_SECRET) {
    console.warn('[webhook] hottok inválido')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  try {
    const event = body.event
    if (event && !PURCHASE_EVENTS.has(event)) {
      return res.status(200).json({ ok: true, skipped: true, event })
    }

    const email = String(body?.data?.buyer?.email || '').trim().toLowerCase()
    const transactionId = body?.data?.purchase?.transaction

    if (!email || !transactionId) {
      console.warn('[webhook] payload sem email ou transactionId')
      return res.status(200).json({ ok: true, skipped: true })
    }

    if (email === 'isaooliveira@gmail.com' || email === 'talitafabilopes@gmail.com') {
      return res.status(200).json({ ok: true, skipped: true, test: true })
    }

    const existing = await supabaseFetch(
      `alta_permissao_leads?hotmart_txn_id=eq.${encodeURIComponent(transactionId)}&select=id`,
    )

    if (Array.isArray(existing) && existing.length > 0) {
      return res.status(200).json({ ok: true, duplicate: true })
    }

    const updated = await supabaseFetch(
      `alta_permissao_leads?email=ilike.${encodeURIComponent(email)}&source=eq.${LEAD_SOURCE}`,
      {
        method: 'PATCH',
        body: {
          status: 'comprou',
          purchased_at: new Date().toISOString(),
          hotmart_txn_id: transactionId,
        },
      },
    )

    console.log(`[webhook] compra: ${email} — txn ${transactionId}`)
    return res.status(200).json({
      ok: true,
      updated: Array.isArray(updated) ? updated.length : 0,
    })
  } catch (err) {
    console.error('[webhook] erro inesperado:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
