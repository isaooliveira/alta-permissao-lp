import { FadeIn } from './FadeIn'
import { SectionEyebrow } from './SectionEyebrow'

const AUDIENCE_CARDS = [
  'Ser reconhecida como uma profissional que sabe o que está fazendo',
  'Não quer correr o risco de parecer profunda enquanto apenas repete explicações prontas',
  'Sabe que aquilo que você diz pode mudar a forma como alguém passa a enxergar a própria vida',
  'Não se sente confortável em tratar uma hipótese como verdade só porque ela parece fazer sentido',
  'Quer ter autoridade sem precisar ocupar o lugar de quem “saca tudo” sobre todo mundo',
  'Se importa com a responsabilidade de influenciar decisões, relações e interpretações de quem confia em você',
  'Quer que a qualidade do seu trabalho apareça na forma como você pensa, pergunta e conduz',
  'Não quer ser mais uma profissional reproduzindo certezas que nunca aprendeu a questionar',
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
      </div>
    </section>
  )
}
