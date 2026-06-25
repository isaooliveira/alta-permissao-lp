import { FadeIn } from './FadeIn'
import talitaPhoto from '@/assets/foto-quem-sou-final.webp'

export function MentorSection() {
  return (
    <section className="section-padding bg-dark">
      <div className="mx-auto w-full max-w-4xl px-5">
        <div className="flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-center lg:gap-12 lg:text-left">
          <FadeIn delay={0.1} direction="right" className="w-full shrink-0 lg:w-auto">
            <img
              src={talitaPhoto}
              alt="Talita Lopes, fundadora da Escola Missão Consciência"
              width={480}
              height={640}
              className="mx-auto aspect-[3/4] w-full max-w-[420px] object-cover rounded-md lg:mx-0 lg:w-[420px] xl:w-[480px]"
            />
          </FadeIn>

          <FadeIn delay={0.2} className="w-full max-w-xl lg:max-w-md xl:max-w-lg">
            <h2 className="text-section text-white mb-2">Talita Lopes</h2>
            <p className="text-cream text-base font-semibold mb-6">
              Fundadora da Escola Missão Consciência®
            </p>

            <div className="space-y-4 text-cream-muted text-lead">
              <p>
                Especialista em Mentalidade de Alta Permissão com mais de{' '}
                <strong className="text-cream">10 anos de experiência terapêutica</strong> e
                mais de <strong className="text-cream">150 mil mulheres</strong> impactadas
                pelo seu trabalho.
              </p>
              <p>
                Não entrega apenas teoria. Traz as chaves práticas para você assumir o
                controle do seu sistema interno e parar de operar no modo automático.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
