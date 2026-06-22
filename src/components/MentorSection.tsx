import { FadeIn } from './FadeIn'
import talitaPhoto from '@/assets/foto-quem-sou-final.webp'

export function MentorSection() {
  return (
    <section className="section-padding bg-dark">
      <div className="container-narrow">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 items-start">
          <FadeIn delay={0.1} direction="right" className="flex-shrink-0">
            <img
              src={talitaPhoto}
              alt="Talita Lopes, fundadora da Escola Missão Consciência"
              width={208}
              height={277}
              className="w-full sm:w-52 aspect-[3/4] object-cover rounded-md"
            />
          </FadeIn>

          <FadeIn delay={0.2} className="flex-1">
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
