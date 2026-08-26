import { CountUp } from './CountUp'
import { FadeIn } from './FadeIn'
import { SectionEyebrow } from './SectionEyebrow'

const TALITA_PHOTO_SRC = `${import.meta.env.BASE_URL}quem-sou-eu.webp`

export function MentorSection() {
  return (
    <section className="section-padding bg-dark">
      <div className="mx-auto w-full max-w-6xl">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-stretch lg:gap-6 lg:text-left">
          <FadeIn delay={0.1} direction="right" className="w-full lg:w-[48%] lg:shrink-0 lg:self-stretch">
            <img
              src={TALITA_PHOTO_SRC}
              alt="Talita Lopes, fundadora da Escola Missão Consciência"
              width={2034}
              height={2049}
              className="mx-auto h-auto w-full rounded-md object-cover object-center lg:mx-0 lg:h-full"
            />
          </FadeIn>

          <FadeIn delay={0.2} className="flex w-full flex-col justify-center lg:flex-1">
            <SectionEyebrow className="mb-2 lg:text-left">
              Conheça sua mentora
            </SectionEyebrow>
            <h2 className="text-section mb-4 text-white">Talita Lopes</h2>

            <div className="space-y-3 text-cream-muted text-lead">
              <p>
                Talita Lopes é psicanalista, fundadora da Escola Missão Consciência® e criadora do
                criadora do Método APS — Alta Permissão Sistêmica.
              </p>
              <p>
                Nos últimos 10 anos, dedicou seu trabalho a investigar uma pergunta: Por que pessoas
                inteligentes, capazes e preparadas continuam repetindo padrões que elas mesmas já
                entenderam racionalmente?
              </p>
              <p>
                Foi dessa investigação que nasceu o Método APS, uma abordagem criada para compreender
                não só o que uma pessoa faz, mas os significados, relações e hipóteses que precisam
                ser considerados antes de transformar um comportamento em uma conclusão.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-4 border-t border-cream/10 pt-6 sm:gap-8">
              <div>
                <p className="font-serif text-3xl italic leading-none text-lime sm:text-4xl">
                  <CountUp to={5} prefix="+" suffix=" mil" />
                </p>
                <p className="mt-1.5 text-sm leading-snug text-cream-muted">
                  alunas já passaram por treinamentos do Método APS
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl italic leading-none text-lime sm:text-4xl">
                  <CountUp to={140} prefix="+" suffix=" mil" />
                </p>
                <p className="mt-1.5 text-sm leading-snug text-cream-muted">
                  pessoas impactadas pela Missão Consciência®
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
