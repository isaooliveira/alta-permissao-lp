import { FadeIn } from './FadeIn'

const MATURITY_CARDS = [
  {
    title: 'Enxergar além do óbvio',
    body: 'Perceber nuances no comportamento que a maioria deixa passar.',
  },
  {
    title: 'Filtrar com critério',
    body: 'Separar o que é fato real do que é apenas tendência teórica ou opinião.',
  },
  {
    title: 'Perguntar com estratégia',
    body: 'Dominar a condução dos casos e abandonar de vez as respostas prontas e superficiais.',
  },
]

export function MaturitySection() {
  return (
    <section className="section-padding bg-dark">
      <div className="mx-auto w-full max-w-6xl">
        <FadeIn>
          <h2 className="mx-auto max-w-4xl text-center text-[1.45rem] font-normal leading-[1.3] tracking-tight text-white sm:text-[1.85rem] lg:text-[2.15rem] lg:leading-[1.25]">
            Para profissionais que já atendem e buscam o{' '}
            <span className="font-bold text-lime">topo da maturidade</span> na atuação com o
            comportamento humano.
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className="mx-auto mt-6 max-w-3xl text-center text-[1.05rem] leading-relaxed text-white/70 sm:mt-8 sm:text-lg lg:text-xl">
            No Efeito Alta Permissão você vai:
          </p>
        </FadeIn>

        <div className="relative mt-10 sm:mt-12">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[108%] -translate-x-1/2 -translate-y-1/2 blur-[70px]"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(152,141,73,0.35) 0%, rgba(152,141,73,0.12) 45%, transparent 75%)',
            }}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 items-stretch gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
            {MATURITY_CARDS.map((card, i) => (
              <FadeIn key={card.title} delay={0.1 + i * 0.08} className="h-full">
                <article className="group h-full rounded-md bg-gradient-to-b from-[#988D49]/70 to-[#988D49]/30 p-px transition-all duration-300 ease-out hover:-translate-y-1 hover:from-[#988D49]/95 hover:to-[#988D49]/45 hover:shadow-[0_14px_36px_rgba(152,141,73,0.28)]">
                  <div className="flex h-full flex-col rounded-[5px] bg-dark px-5 py-6 transition-colors duration-300 group-hover:bg-[#252520] sm:px-6 sm:py-7">
                    <span className="mb-4 font-bold tabular-nums tracking-[0.2em] text-lime text-xs">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-[1.15rem] font-bold leading-snug text-cream transition-colors duration-300 group-hover:text-white sm:text-[1.25rem]">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-base leading-snug text-cream/70 sm:text-[1.05rem]">
                      {card.body}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
