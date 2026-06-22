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

export async function saveLead(lead: Lead): Promise<void> {
  if (!supabase) return // sem credenciais em dev local — não bloqueia
  const { error } = await supabase.from('alta_permissao_leads').insert([
    {
      ...lead,
      source: 'alta_permissao_jul_2026',
      status: 'checkout_iniciado',
    },
  ])
  if (error) throw error
}
