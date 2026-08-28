import { useState } from 'react'
import { ShieldCheck, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { useEventStatus } from '@/hooks/useEventStatus'

const faqsLive = [
  {
    q: 'O treinamento oferece certificação oficial?',
    a: 'Sim. Ao concluir o treinamento, você recebe um certificado de conclusão do Efeito Alta Permissão, emitido pela Escola Missão Consciência, referente à formação introdutória no Método APS.',
  },
  {
    q: 'Essa certificação me habilita a aplicar o Método APS profissionalmente?',
    a: 'Não. O Efeito Alta Permissão é uma formação introdutória. Ele apresenta fundamentos, critérios de leitura e princípios do Método APS, mas não substitui a formação profissional nem as etapas avançadas de certificação da metodologia.',
  },
  {
    q: 'O treinamento vai ficar gravado?',
    a: 'A gravação é opcional. Você pode adicionar o acesso na hora da compra do ingresso, pela Hotmart.',
  },
  {
    q: 'Preciso ser psicóloga ou psicanalista?',
    a: 'Não. O treinamento é indicado para profissionais que trabalham com pessoas, como terapeutas, mentoras, líderes, professoras, facilitadoras e profissionais de desenvolvimento humano.',
  },
  {
    q: 'Vou receber técnicas prontas para usar com clientes?',
    a: 'Você vai aprender critérios, perguntas e formas de organizar informações que ajudam a compreender melhor uma situação. A proposta não é entregar respostas universais para aplicar em qualquer pessoa.',
  },
]

const faqsPostEvent = [
  faqsLive[0],
  faqsLive[1],
  {
    q: 'Quando eu recebo o acesso?',
    a: 'Imediatamente após a confirmação do pagamento. Você recebe o acesso no e-mail da compra.',
  },
  faqsLive[3],
  faqsLive[4],
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-cream/10 transition-colors duration-200 hover:bg-white/[0.05]">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer group"
      >
        <span className="text-white font-bold text-base leading-snug transition-colors duration-150 group-hover:text-cream/80">{q}</span>
        <ChevronDown
          size={18}
          className={`flex-shrink-0 transition-all duration-200 ${open ? 'rotate-180 text-cream' : 'text-cream-muted'}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-cream-muted text-lead pb-5 pr-8">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function GuaranteeSection() {
  return (
    <section className="section-padding pt-0">
      <div className="mx-auto w-full max-w-3xl">
        <FadeIn>
          <div className="border-l-4 border-cream border-r border-t border-b border-cream/10 p-8 sm:p-12 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            <div className="flex-shrink-0">
              <ShieldCheck size={56} className="text-cream" />
            </div>
            <div>
              <h2 className="text-section text-white mb-4">
                Garantia de 7 dias
              </h2>
              <p className="text-cream-muted text-lead">
                Se você participar do Efeito Alta Permissão e sentir que não saiu do treinamento com
                mais clareza para observar situações, fazer perguntas e diferenciar fatos,
                interpretações e hipóteses,{' '}
                <strong className="text-cream">devolvemos 100% do seu investimento.</strong>
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

export function GuaranteeAndFAQ() {
  const { eventPast } = useEventStatus()
  const faqs = eventPast ? faqsPostEvent : faqsLive
  return (
    <section className="section-padding bg-dark">
      <div className="mx-auto w-full max-w-3xl">
        <FadeIn>
          <h2 className="text-section text-white text-center mb-12">
            Ainda está com <span className="font-semibold">dúvidas</span>?
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="border-t border-cream/10">
            {faqs.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
