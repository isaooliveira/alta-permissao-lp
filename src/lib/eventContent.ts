export const MARQUEE_ITEMS_LIVE = [
  { text: 'ALTA PERMISSÃO', icon: 'diamond' as const },
  { text: 'TREINAMENTO INTRODUTÓRIO', icon: 'zap' as const },
  { text: 'ALTA PERMISSÃO', icon: 'diamond' as const },
  { text: '12 DE SETEMBRO', icon: 'zap' as const },
  { text: 'ALTA PERMISSÃO', icon: 'diamond' as const },
  { text: 'AO VIVO', icon: 'zap' as const },
]

export const MARQUEE_ITEMS_POST_EVENT = [
  { text: 'ALTA PERMISSÃO', icon: 'diamond' as const },
  { text: 'ACESSO IMEDIATO', icon: 'zap' as const },
  { text: 'ALTA PERMISSÃO', icon: 'diamond' as const },
  { text: 'TREINAMENTO INTRODUTÓRIO', icon: 'zap' as const },
]

export const CTA_LIVE = 'Garantir Meu ingresso'
export const CTA_POST_EVENT = 'Começar agora'

export function ctaLabel(eventPast: boolean, quizOffer = false) {
  if (eventPast) return CTA_POST_EVENT
  if (quizOffer) return 'Garantir Ingresso VIP'
  return CTA_LIVE
}

export const PRICING_FEATURES_LIVE = [
  '7 horas de imersão ao vivo no Zoom',
  'Certificado',
  'Material Extra',
] as const

export const PRICING_FEATURES_POST_EVENT = [
  'Acesso Imediato',
  'Material Complementar',
  'Certificado incluso',
] as const

export const TICKET_FEATURES = [
  { text: '7 horas de imersão ao vivo no Zoom', vip: true, basic: true },
  { text: 'Certificado', vip: true, basic: true },
  { text: 'Material Extra', vip: true, basic: false },
  { text: 'Gravação do Treinamento', vip: true, basic: false },
  {
    text: 'Chance de participar do sorteio de 1 vaga para Escola da Nova Linhagem',
    vip: true,
    basic: false,
  },
] as const

/** Grupo de WhatsApp — Efeito Alta Permissão 2ª Ed. */
export const WHATSAPP_GRUPO_EAP =
  (import.meta.env.VITE_WHATSAPP_GRUPO_URL as string | undefined) ||
  'https://chat.whatsapp.com/EZWobbSUyGX9sLbRvgaJkL'
