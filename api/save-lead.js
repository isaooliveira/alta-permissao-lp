/** @param {import('@vercel/node').VercelRequest} req */
/** @param {import('@vercel/node').VercelResponse} res */

function cleanUtm(value) {
  if (typeof value !== 'string') return null
  const trimmed = value.trim().slice(0, 200)
  return trimmed || null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY

  if (!url || !key) {
    return res.status(500).json({ error: 'Supabase não configurado na Vercel' })
  }

  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      return res.status(400).json({ error: 'JSON inválido' })
    }
  }

  const { name, phone, email, lot, utm_source, utm_medium, utm_campaign, utm_content, utm_term } =
    body ?? {}

  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    return res.status(400).json({ error: 'Nome inválido' })
  }
  if (!phone || typeof phone !== 'string' || String(phone).replace(/\D/g, '').length < 10) {
    return res.status(400).json({ error: 'Telefone inválido' })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido' })
  }
  if (![1, 2, 3].includes(Number(lot))) {
    return res.status(400).json({ error: 'Lote inválido' })
  }

  const payload = {
    name: name.trim(),
    phone: String(phone).replace(/\D/g, ''),
    email: email.trim().toLowerCase(),
    lot: Number(lot),
    source: 'alta_permissao_jul_2026',
    status: 'checkout_iniciado',
    utm_source: cleanUtm(utm_source),
    utm_medium: cleanUtm(utm_medium),
    utm_campaign: cleanUtm(utm_campaign),
    utm_content: cleanUtm(utm_content),
    utm_term: cleanUtm(utm_term),
  }

  let response = await insertLead(url, key, payload)

  if (!response.ok) {
    const detail = await response.text()
    if (detail.includes('utm_')) {
      const withoutUtm = { ...payload }
      delete withoutUtm.utm_source
      delete withoutUtm.utm_medium
      delete withoutUtm.utm_campaign
      delete withoutUtm.utm_content
      delete withoutUtm.utm_term
      response = await insertLead(url, key, withoutUtm)
    }
    if (!response.ok) {
      const retryDetail = detail.includes('utm_') ? await response.text() : detail
      console.error('[save-lead]', response.status, retryDetail)
      return res.status(500).json({ error: 'Erro ao salvar no Supabase' })
    }
  }

  return res.status(200).json({ ok: true })
}

async function insertLead(url, key, payload) {
  return fetch(`${url}/rest/v1/alta_permissao_leads`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(payload),
  })
}
