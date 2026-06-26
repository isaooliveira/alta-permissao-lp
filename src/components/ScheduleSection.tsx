import { Video } from 'lucide-react'
import { FadeIn } from './FadeIn'
import { Button } from './Button'
import { EventTag } from './EventTag'
import { SectionEyebrow } from './SectionEyebrow'
import { MarqueeBanner } from './MarqueeBanner'
import bgBanner from '@/assets/bg-banner.webp'

interface ScheduleSectionProps {
  onCtaClick: () => void
}

const schedule = [
  {
    time: '10:00',
    title: 'Abertura com muito conteúdo desde o início',
    description: 'Sem aquecimento. Entramos direto no que importa.',
  },
  {
    time: '13:00',
    title: 'Pausa para almoço',
    description: 'Um respiro para processar e voltar com mais clareza.',
  },
  {
    time: '17:00',
    title: 'Encerramento com perguntas e respostas',
    description: 'Espaço aberto para tirar o que ficou.',
  },
]

function TimelineMarker({ step }: { step: 0 | 1 | 2 }) {
  return (
    <div className={`schedule-timeline-marker schedule-timeline-marker-${step}`}>
      <div className="w-2 h-2 rounded-full bg-cream" aria-hidden="true" />
    </div>
  )
}

function TimelineConnector({ step }: { step: 0 | 1 }) {
  return (
    <div
      className={`schedule-timeline-line schedule-timeline-line-${step} w-px flex-1 min-h-[2.5rem] my-2 bg-cream/10`}
      aria-hidden="true"
    />
  )
}

export function ScheduleSection({ onCtaClick }: ScheduleSectionProps) {
  return (
    <section className="relative overflow-hidden bg-dark">
      <div className="relative z-20">
        <MarqueeBanner />
      </div>

      <div className="relative py-20 px-5 lg:min-h-[720px]">
      {/* Foto: fundo fixo da seção inteira — independente do conteúdo */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <img
          src={bgBanner}
          alt=""
          className="h-full w-full object-cover object-[70%_center] lg:h-[115%] lg:w-[115%] lg:max-w-none lg:object-[96%_38%] lg:translate-x-[100px] lg:-translate-y-[4%]"
        />
        <div className="absolute inset-0 bg-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/20 lg:bg-[linear-gradient(to_right,rgba(32,32,32,0.95)_0%,rgba(32,32,32,0.75)_34%,rgba(32,32,32,0.5)_58%,rgba(32,32,32,0.25)_75%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 lg:h-64 bg-gradient-to-t from-dark from-0% via-dark/70 via-45% to-transparent to-100%" />
      </div>

      {/* Conteúdo: só este bloco fica à esquerda */}
      <div className="relative z-10 container-wide">
        <div className="w-full max-w-md lg:max-w-lg">
          <FadeIn>
            <SectionEyebrow className="mb-4 text-left">Como vai funcionar</SectionEyebrow>
            <h2 className="text-section text-white text-left mb-6">
              <span className="font-semibold">Programação</span> do dia
            </h2>
            <div className="mb-14 flex justify-start">
              <EventTag />
            </div>
          </FadeIn>

          <div className="relative">
            <div className="space-y-0">
              {schedule.map((item, i) => (
                <FadeIn key={item.time} delay={i * 0.15}>
                  <div className="flex gap-6 relative">
                    <div className="flex-shrink-0 w-[4.4rem] flex flex-col items-center">
                      <TimelineMarker step={i as 0 | 1 | 2} />
                      {i < schedule.length - 1 && (
                        <TimelineConnector step={i as 0 | 1} />
                      )}
                    </div>
                    <div className={`flex-1 min-w-0 ${i < schedule.length - 1 ? 'pb-10' : 'pb-2'}`}>
                      <span className="text-cream font-semibold text-2xl leading-none block mb-1">
                        {item.time}
                      </span>
                      <p className="text-white font-semibold text-base leading-tight">{item.title}</p>
                      <p className="text-cream-muted text-base mt-1">{item.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.5}>
            <div className="mt-14 border border-cream/10 bg-dark/50 backdrop-blur-sm p-6 flex items-center gap-4">
              <Video size={20} className="text-cream flex-shrink-0" />
              <p className="text-cream font-semibold text-base">
                Conteúdo 100% online ao vivo |{' '}
                <span className="text-cream-muted font-normal">com replay disponível</span>
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.6} className="mt-10 flex justify-start">
            <Button size="lg" onClick={onCtaClick} showTicket className="whitespace-nowrap">
              Quero garantir meu ingresso
            </Button>
          </FadeIn>
        </div>
      </div>
      </div>
    </section>
  )
}
