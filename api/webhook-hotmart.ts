import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const hottok = req.headers['hottok'] as string | undefined
  if (!hottok || hottok !== process.env.HOTMART_WEBHOOK_SECRET) {
    console.warn('[webhook] hottok inválido')
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const body = req.body

  try {
    const email: string | undefined = body?.data?.buyer?.email
    const transactionId: string | undefined = body?.data?.purchase?.transaction

    if (!email || !transactionId) {
      console.warn('[webhook] payload sem email ou transactionId', body)
      return res.status(200).json({ ok: true, skipped: true })
    }

    // Idempotência: mesma transação não é processada duas vezes
    const { data: existing } = await supabase
      .from('alta_permissao_leads')
      .select('id')
      .eq('hotmart_txn_id', transactionId)
      .maybeSingle()

    if (existing) {
      return res.status(200).json({ ok: true, duplicate: true })
    }

    // Atualizar status para 'comprou'
    const { error } = await supabase
      .from('alta_permissao_leads')
      .update({
        status: 'comprou',
        purchased_at: new Date().toISOString(),
        hotmart_txn_id: transactionId,
      })
      .ilike('email', email)
      .eq('source', 'alta_permissao_jul_2026')

    if (error) {
      console.error('[webhook] erro ao atualizar lead:', error.message)
      return res.status(500).json({ error: 'DB error' })
    }

    console.log(`[webhook] compra: ${email} — txn ${transactionId}`)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[webhook] erro inesperado:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
