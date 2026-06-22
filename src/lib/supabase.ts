import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

export interface Lead {
  name: string
  phone: string
  email: string
  lot: number
}

async function saveLeadViaApi(lead: Lead): Promise<void> {
  const res = await fetch('/api/save-lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error ?? `Erro ao salvar lead (${res.status})`)
  }
}

async function saveLeadDirect(lead: Lead): Promise<void> {
  if (!supabase) {
    throw new Error('Supabase não configurado')
  }

  const { error } = await supabase.from('alta_permissao_leads').insert([
    {
      ...lead,
      source: 'alta_permissao_jul_2026',
      status: 'checkout_iniciado',
    },
  ])

  if (error) throw error
}

export async function saveLead(lead: Lead): Promise<void> {
  if (supabase) {
    try {
      await saveLeadDirect(lead)
      return
    } catch (err) {
      console.warn('[saveLead] insert direto falhou, tentando API…', err)
    }
  }

  await saveLeadViaApi(lead)
}
