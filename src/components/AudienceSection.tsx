import { Eye, MessageCircleQuestion, Scale, type LucideIcon } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { SectionEyebrow } from './SectionEyebrow'

const AUDIENCE_CARDS: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: 'Elevar a qualidade dos seus atendimentos',
    body: 'Compreender melhor o que está acontecendo em cada situação, fazendo perguntas mais precisas e deixando de depender de explicações prontas para entender um comportamento.',
    icon: MessageCircleQuestion,
  },
  {
    title: 'Mais segurança na sua atuação profissional',
    body: 'Principalmente quando existem várias explicações possíveis para o mesmo problema e você precisa separar fatos, relatos, interpretações e hipóteses antes de chegar a uma conclusão.',
    icon: Scale,
  },
  {
    title: 'Amadurecer o seu olhar sobre comportamento humano',
    body: 'Oferecer atendimentos, orientações e conteúdos com mais clareza, responsabilidade e profundidade, sem transformar opiniões ou teorias em verdades sobre a vida de alguém.',
    icon: Eye,
  },
]

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

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-5">
          {AUDIENCE_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <FadeIn key={card.title} delay={0.08 + i * 0.08} className="h-full">
                <article className="group h-full rounded-md bg-gradient-to-b from-[#988D49]/60 to-[#988D49]/20 p-px transition-all duration-300 ease-out hover:-translate-y-1 hover:from-[#988D49]/95 hover:to-[#988D49]/45 hover:shadow-[0_14px_36px_rgba(152,141,73,0.28)]">
                  <div className="flex h-full flex-col rounded-[5px] bg-dark px-5 py-6 transition-colors duration-300 group-hover:bg-[#252520] sm:px-6 sm:py-8">
                    <span className="mb-5 font-bold tabular-nums tracking-[0.2em] text-lime text-xs">
                      0{i + 1}
                    </span>
                    <Icon
                      size={24}
                      className="mb-4 shrink-0 text-cream transition-all duration-300 group-hover:scale-110 group-hover:text-[#F8F0DF]"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                    <h3 className="mb-3 text-[22px] font-bold leading-snug text-cream transition-colors duration-300 group-hover:text-white">
                      {card.title}
                    </h3>
                    <p className="text-base leading-relaxed text-cream/75 transition-colors duration-300 group-hover:text-cream/90">
                      {card.body}
                    </p>
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
