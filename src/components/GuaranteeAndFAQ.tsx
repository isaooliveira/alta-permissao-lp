import { useState } from 'react'
import { ShieldCheck, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeIn } from './FadeIn'

const faqs = [
  {
    q: 'O treinamento oferece certificação oficial?',
    a: 'Sim! Ao concluir o treinamento ao vivo, você recebe a Certificação Introdutória em Alta Permissão Sistêmica. Esse é o documento oficial que valida que você passou pelo treinamento direto da fonte e domina os fundamentos da minha metodologia.',
  },
  {
    q: 'O que significa ser uma "Certificação Introdutória"?',
    a: 'Significa que esta é a sua porta de entrada oficial no método. Você vai dominar a base, os conceitos essenciais e a estrutura prática da Alta Permissão Sistêmica. É o primeiro grande passo para quem quer aplicar a metodologia na própria vida ou começar a levar esse olhar para os seus clientes.',
  },
  {
    q: 'O treinamento vai ficar gravado?',
    a: 'Sim. O conteúdo pode ser adquirido à parte ao finalizar a compra do seu ingresso na Hotmart.',
  },
  {
    q: 'Preciso ser psicóloga, psicanalista ou médico?',
    a: 'Não! O treinamento foi estruturado para qualquer profissional que atende, desenvolve pessoas e lidera independentemente do seu nível de experiência ou tempo de carreira.',
  },
  {
    q: 'Como funciona a garantia de 7 dias?',
    a: 'Se você participar e sentir que esse conhecimento não ampliou sua forma de compreender a si mesma, as pessoas e os padrões que influenciam decisões e comportamentos, devolvemos 100% do seu investimento. Sem burocracia.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-cream/10">
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
      <div className="container-narrow">
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
                Se você participar e sentir que esse conhecimento não ampliou sua forma de
                compreender a si mesma, as pessoas e os padrões que influenciam decisões e
                comportamentos,{' '}
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
  return (
    <section className="section-padding bg-dark">
      <div className="container-narrow">
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
