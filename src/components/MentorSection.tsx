import { CountUp } from './CountUp'
import { FadeIn } from './FadeIn'
import { SectionEyebrow } from './SectionEyebrow'

const TALITA_PHOTO_SRC = `${import.meta.env.BASE_URL}quem-sou-eu.webp`

export function MentorSection() {
  return (
    <section className="section-padding bg-dark">
      <div className="mx-auto w-full max-w-4xl px-5 lg:max-w-5xl">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-stretch lg:justify-center lg:gap-12 lg:text-left">
          <FadeIn delay={0.1} direction="right" className="w-full shrink-0 lg:flex lg:w-[46%] lg:max-w-[520px] lg:self-stretch">
            <img
              src={TALITA_PHOTO_SRC}
              alt="Talita Lopes, fundadora da Escola Missão Consciência"
              width={2034}
              height={2049}
              className="mx-auto h-auto w-full max-w-[420px] rounded-md object-cover object-center lg:mx-0 lg:h-full lg:max-w-none lg:w-full"
            />
          </FadeIn>

          <FadeIn delay={0.2} className="flex w-full max-w-xl flex-col justify-between lg:max-w-md xl:max-w-lg">
            <SectionEyebrow className="mb-3 lg:text-left">
              Conheça sua mentora
            </SectionEyebrow>
            <h2 className="text-section text-white mb-6">Talita Lopes</h2>

            <div className="space-y-4 text-cream-muted text-lead">
              <p>
                Talita Lopes é psicanalista, fundadora da Escola Missão Consciência® e criadora do
                Método APS (Alta Permissão Sistêmica).
              </p>
              <p>
                Nos últimos 10 anos, dedicou seu trabalho a investigar uma pergunta: por que pessoas
                inteligentes, capazes e preparadas continuam voltando para o mesmo lugar?
              </p>
              <p>
                A resposta deu origem ao Método APS, uma abordagem que investiga os contratos de
                lealdade e os significados que organizam, de forma inconsciente, a maneira como uma
                pessoa vive, ama, prospera e sustenta o que conquista.
              </p>
              <p>
                Mais de <CountUp to={140} suffix=" mil mulheres" /> já tiveram contato com esse
                trabalho.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
