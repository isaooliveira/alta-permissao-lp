import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

function getSupabase() {
  const url = process.env.VITE_SUPABASE_URL ?? process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY
  if (!url || !key) return null
  return createClient(url, key)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const supabase = getSupabase()
  if (!supabase) {
    console.error('[save-lead] Supabase não configurado (faltam variáveis de ambiente)')
    return res.status(500).json({ error: 'Server not configured' })
  }

  const { name, phone, email, lot } = req.body ?? {}

  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    return res.status(400).json({ error: 'Nome inválido' })
  }
  if (!phone || typeof phone !== 'string' || phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ error: 'Telefone inválido' })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'E-mail inválido' })
  }
  if (![1, 2, 3].includes(Number(lot))) {
    return res.status(400).json({ error: 'Lote inválido' })
  }

  const { error } = await supabase.from('alta_permissao_leads').insert([
    {
      name: name.trim(),
      phone: phone.replace(/\D/g, ''),
      email: email.trim().toLowerCase(),
      lot: Number(lot),
      source: 'alta_permissao_jul_2026',
      status: 'checkout_iniciado',
    },
  ])

  if (error) {
    console.error('[save-lead]', error.message)
    return res.status(500).json({ error: error.message })
  }

  return res.status(200).json({ ok: true })
}
