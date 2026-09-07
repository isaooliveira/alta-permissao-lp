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

function emailEq(email) {
  return `email=eq.${encodeURIComponent(String(email).trim().toLowerCase())}`
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

    const leads = await supabaseFetch(
      `alta_permissao_leads?${emailEq(email)}&source=eq.${LEAD_SOURCE}&select=id,status,created_at&order=created_at.desc`,
    )

    const purchase = {
      status: 'comprou',
      purchased_at: new Date().toISOString(),
      hotmart_txn_id: transactionId,
    }

    if (Array.isArray(leads) && leads.length > 0) {
      const target = leads.find((row) => row.status !== 'comprou') || leads[0]
      await supabaseFetch(`alta_permissao_leads?id=eq.${target.id}`, {
        method: 'PATCH',
        body: purchase,
      })
      console.log(`[webhook] compra: ${email} — txn ${transactionId} — lead ${target.id}`)
      return res.status(200).json({ ok: true, updated: 1, leadId: target.id })
    }

    const buyer = body?.data?.buyer || {}
    const inserted = await supabaseFetch('alta_permissao_leads', {
      method: 'POST',
      body: {
        name: String(buyer.name || email).trim() || email,
        phone: String(buyer.checkout_phone || buyer.phone || '').replace(/\D/g, '') || '00000000000',
        email,
        lot: 2,
        source: LEAD_SOURCE,
        ...purchase,
      },
    })
    console.log(`[webhook] compra sem lead prévio: ${email} — txn ${transactionId}`)
    return res.status(200).json({
      ok: true,
      inserted: Array.isArray(inserted) ? inserted.length : 1,
    })
  } catch (err) {
    console.error('[webhook] erro inesperado:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
