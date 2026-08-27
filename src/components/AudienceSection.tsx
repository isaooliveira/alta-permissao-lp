import { motion, useReducedMotion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { SectionEyebrow } from './SectionEyebrow'

const AUDIENCE_CARDS = [
  'Ser reconhecida como uma profissional que sabe o que está fazendo',
  'Não quer correr o risco de parecer profunda enquanto apenas repete explicações prontas',
  'Sabe que aquilo que você diz, interpreta ou conduz pode mudar a forma como alguém passa a enxergar a própria vida.',
  'Não se sente confortável em tratar uma hipótese como verdade só porque ela parece fazer sentido',
  'Quer ter autoridade sem precisar ocupar o lugar de quem “saca tudo” sobre todo mundo',
  'Se importa com a responsabilidade de influenciar decisões, relações e interpretações de quem confia em você',
  'Quer que a qualidade do seu trabalho apareça na forma como você percebe, interpreta, pergunta e conduz.',
  'Não quer ser mais uma profissional reproduzindo certezas que nunca aprendeu a questionar',
]

function PenUnderline() {
  const reduceMotion = useReducedMotion()

  return (
    <svg
      viewBox="0 0 100 14"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-2.5 left-0 h-3 w-full text-red"
      aria-hidden="true"
    >
      <motion.path
        d="M1,9 C6,4 11,12 17,7 C24,1 30,13 38,6 C46,0 53,12 61,5 C69,-1 76,10 84,4 C90,1 95,7 99,3"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0.5 }}
        whileInView={reduceMotion ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.85, delay: 0.55, ease: 'easeInOut' }}
      />
    </svg>
  )
}

function AudienceSummaryCard() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[140%] w-[110%] -translate-x-1/2 -translate-y-1/2 blur-[70px]"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(152,141,73,0.35) 0%, rgba(152,141,73,0.12) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <div
        className={`relative z-10 rounded-md bg-gradient-to-b from-[#988D49]/70 to-[#988D49]/30 p-px ${
          reduceMotion ? '' : 'audience-highlight-glow'
        }`}
      >
        <div className="rounded-[5px] bg-cream px-6 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12">
          <p className="mx-auto max-w-4xl text-center text-[1.15rem] leading-relaxed text-dark sm:text-[1.3rem] lg:text-[1.4rem]">
            Não importa se você trabalha com conversa, corpo, práticas integrativas, técnicas
            energéticas ou combina diferentes recursos,{' '}
            <span className="font-bold">o objetivo é o mesmo</span>:{' '}
            <span className="font-serif text-[1.2em] italic leading-snug">
              entender melhor o que aparece no atendimento{' '}
              <span className="relative inline-block">
                <mark className="relative inline-block overflow-hidden bg-lime px-1.5 py-0.5 font-serif italic text-dark">
                  sem confundir percepção com conclusão
                  {!reduceMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-y-0 left-0 z-10 w-1/4 -skew-x-12 bg-white/70"
                      initial={{ x: '-250%' }}
                      whileInView={{ x: '500%' }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.9, delay: 0.4, ease: 'easeInOut' }}
                    />
                  )}
                </mark>
                <PenUnderline />
              </span>
              .
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export function AudienceSection() {
  return (
    <section className="section-padding bg-dark">
      <div className="mx-auto w-full max-w-6xl">
        <FadeIn>
          <div className="mb-4 flex items-center justify-center gap-3 sm:gap-4">
            <span className="h-px w-10 bg-cream/20 sm:w-14" aria-hidden="true" />
            <SectionEyebrow className="mb-0">Para quem é</SectionEyebrow>
            <span className="h-px w-10 bg-cream/20 sm:w-14" aria-hidden="true" />
          </div>
          <h2 className="text-section mb-10 text-center text-white sm:mb-12">
            Este treinamento é para você que quer
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 items-stretch gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {AUDIENCE_CARDS.map((title, i) => (
            <FadeIn key={title} delay={0.06 + i * 0.04} className="h-full">
              <article className="group h-full rounded-md bg-gradient-to-b from-[#988D49]/60 to-[#988D49]/20 p-px transition-all duration-300 ease-out hover:-translate-y-1 hover:from-[#988D49]/95 hover:to-[#988D49]/45 hover:shadow-[0_14px_36px_rgba(152,141,73,0.28)]">
                <div className="flex h-full flex-col rounded-[5px] bg-dark px-5 py-5 transition-colors duration-300 group-hover:bg-[#252520] sm:px-5 sm:py-6">
                  <span className="mb-4 font-bold tabular-nums tracking-[0.2em] text-lime text-xs">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-[1.05rem] font-bold leading-snug text-cream transition-colors duration-300 group-hover:text-white sm:text-[1.1rem]">
                    {title}
                  </h3>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-5 sm:mt-6">
          <AudienceSummaryCard />
        </FadeIn>
      </div>
    </section>
  )
}
