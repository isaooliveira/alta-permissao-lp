import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import { EventTag } from '@/components/EventTag'
import { WHATSAPP_GRUPO_EAP } from '@/lib/eventContent'
import { useEventStatus } from '@/hooks/useEventStatus'

const LOGO_SRC = `${import.meta.env.BASE_URL}logo-alta.svg`
const FOOTER_LOGO_SRC = `${import.meta.env.BASE_URL}logo-altas.svg`
const BG_SRC = `${import.meta.env.BASE_URL}${encodeURIComponent('Prancheta 1.webp')}`
const GRAIN_SRC = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`

function ObrigadoBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("${BG_SRC}")` }}
      />
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: GRAIN_SRC }} />
    </div>
  )
}

const STEPS_LIVE = [
  { title: 'Pagamento', detail: 'confirmado' },
  { title: 'Confirmar', detail: 'ingresso' },
  { title: 'Ao vivo', detail: '12 de set' },
] as const

const STEPS_POST = [
  { title: 'Pagamento', detail: 'confirmado' },
  { title: 'Acesso', detail: 'liberado' },
  { title: 'Começar', detail: 'agora' },
] as const

const CURRENT_STEP = 1

function WhatsAppMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-lime" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2C6.5 2 2.01 6.48 2.01 12.02c0 1.77.46 3.5 1.34 5.02L2 22l5.1-1.33A10 10 0 0 0 12.04 22C17.57 22 22 17.52 22 11.98 22 6.48 17.57 2 12.04 2Zm5.84 14.24c-.24.68-1.4 1.26-1.93 1.34-.49.07-1.1.1-1.78-.11-.41-.13-.94-.3-1.62-.6-2.85-1.23-4.7-4.1-4.84-4.29-.14-.19-1.15-1.53-1.15-2.92 0-1.39.73-2.07.99-2.36.24-.27.64-.39.86-.39h.62c.2 0 .47-.01.71.54.24.57.83 1.98.9 2.13.07.14.12.32.02.51-.1.19-.14.32-.28.49-.14.17-.29.38-.42.51-.14.14-.28.29-.12.56.16.27.7 1.16 1.5 1.88 1.04.93 1.91 1.22 2.18 1.36.27.14.43.12.59-.07.16-.19.68-.79.86-1.06.18-.27.36-.22.61-.13.24.1 1.54.73 1.8.86.27.14.44.2.51.32.07.11.07.65-.17 1.33Z" />
    </svg>
  )
}

function StepConnector({ active, reduceMotion }: { active: boolean; reduceMotion: boolean }) {
  if (!active) {
    return <div className="h-[2px] flex-1 bg-cream/15" />
  }

  if (reduceMotion) {
    return <div className="h-[2px] flex-1 bg-lime" />
  }

  return (
    <div className="relative h-[2px] flex-1 overflow-hidden bg-cream/20">
      <motion.div
        className="absolute inset-y-0 left-0 w-full origin-left bg-lime/35"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 w-[42%] rounded-full bg-lime shadow-[0_0_10px_rgba(209,255,3,0.7)]"
        initial={{ left: '-42%' }}
        animate={{ left: ['-42%', '100%'] }}
        transition={{
          duration: 1.45,
          ease: [0.45, 0, 0.55, 1],
          repeat: Infinity,
          repeatDelay: 0.35,
          delay: 0.7,
        }}
      />
    </div>
  )
}

function ConfirmStepper({ eventPast }: { eventPast: boolean }) {
  const reduceMotion = Boolean(useReducedMotion())
  const steps = eventPast ? STEPS_POST : STEPS_LIVE

  return (
    <div className="w-full" role="group" aria-label="Passos da inscrição">
      <div className="grid grid-cols-3">
        {steps.map((step, index) => (
          <div key={`here-${step.title}`} className="flex h-10 flex-col items-center justify-end">
            {index === CURRENT_STEP ? (
              <>
                <span className="whitespace-nowrap rounded-[4px] bg-lime px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-dark">
                  Você está aqui
                </span>
                <span
                  className="h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-lime"
                  aria-hidden="true"
                />
              </>
            ) : null}
          </div>
        ))}
      </div>

      <div className="relative mt-1.5">
        <div
          className="pointer-events-none absolute top-1/2 right-[16.67%] left-[16.67%] flex -translate-y-1/2"
          aria-hidden="true"
        >
          <StepConnector active reduceMotion={reduceMotion} />
          <StepConnector active={false} reduceMotion={reduceMotion} />
        </div>

        <ol className="grid grid-cols-3">
          {steps.map((step, index) => {
            const done = index < CURRENT_STEP
            const current = index === CURRENT_STEP

            return (
              <li
                key={step.title}
                className="flex flex-col items-center text-center"
                aria-current={current ? 'step' : undefined}
              >
                <span
                  className={`relative z-[1] flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold ${
                    done
                      ? 'bg-lime text-dark'
                      : current
                        ? 'bg-cream text-dark'
                        : 'border border-cream/25 bg-dark text-cream/40'
                  }`}
                >
                  {done ? <Check size={14} strokeWidth={3} aria-hidden="true" /> : index + 1}
                </span>
                <span className="sr-only">
                  {done ? 'Concluído' : current ? 'Você está aqui' : 'Próximo'}: {step.title} {step.detail}
                </span>
              </li>
            )
          })}
        </ol>
      </div>

      <div className="mt-2 grid grid-cols-3">
        {steps.map((step, index) => {
          const done = index < CURRENT_STEP
          const current = index === CURRENT_STEP

          return (
            <p
              key={`label-${step.title}`}
              className={`text-center text-[10px] font-bold uppercase leading-tight tracking-[0.12em] sm:text-[11px] ${
                current ? 'text-cream' : done ? 'text-cream/70' : 'text-cream/35'
              }`}
            >
              {step.title}
              <span className="mt-0.5 block font-semibold normal-case tracking-normal">{step.detail}</span>
            </p>
          )
        })}
      </div>
    </div>
  )
}

export function ObrigadoPage() {
  const { eventPast } = useEventStatus()

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden text-cream">
      <ObrigadoBackdrop />
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col items-center px-6 pb-16 pt-12 sm:px-10 sm:pt-16">
        <h1 className="text-center font-serif text-5xl italic leading-[0.95] sm:text-6xl">
          Quase lá.
        </h1>
        <p className="mt-5 max-w-md text-center text-lg leading-relaxed text-white">
          Parabéns, sua inscrição está quase confirmada.
        </p>
        <p className="mt-2 max-w-md text-center text-[22px] font-bold leading-snug text-white">
          Falta 1 passo para concluir a sua inscrição!
        </p>

        <div className="mt-10 w-full">
          <ConfirmStepper eventPast={eventPast} />
        </div>

        {WHATSAPP_GRUPO_EAP ? (
          <div className="mt-10 w-full rounded-[6px] border border-cream/15 bg-dark p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <WhatsAppMark />
              <h2 className="font-serif text-2xl italic leading-tight">Entre no grupo de WhatsApp</h2>
            </div>
            <p className="mt-4 text-base leading-relaxed text-cream/65">
              {eventPast
                ? 'É por lá que enviamos materiais e avisos do treinamento.'
                : 'É por lá que enviamos materiais pré-evento, atualizações e detalhes do Treinamento.'}
            </p>
            <a
              href={WHATSAPP_GRUPO_EAP}
              target="_blank"
              rel="noreferrer"
              className="btn-shimmer relative mt-6 inline-flex w-full items-center justify-center rounded-[6px] bg-lime px-8 py-4 text-[16px] font-bold uppercase tracking-wide text-dark hover:brightness-105 hover:shadow-[0_0_28px_rgba(209,255,3,0.45)] sm:text-lg"
            >
              <span className="relative z-[2]">Entrar no grupo</span>
            </a>
          </div>
        ) : (
          <p className="mt-10 max-w-md text-center text-sm leading-relaxed text-cream/55">
            O convite do grupo chega no e-mail da Hotmart. Se não aparecer em alguns minutos, olhe o spam.
          </p>
        )}

        <div className="mt-12 flex w-full flex-col items-center gap-4">
          <p className="text-center text-base text-white">
            {eventPast ? (
              <>
                <span className="font-bold">Lembre-se:</span> o acesso é imediato após a confirmação.
              </>
            ) : (
              <>
                <span className="font-bold">Lembre-se:</span> o treinamento acontece:
              </>
            )}
          </p>
          <EventTag className="mx-auto max-w-full" />
        </div>
      </div>

      <footer className="relative z-10 border-t border-cream/10 px-6 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center sm:flex-row sm:items-center sm:text-left">
          <img
            src={LOGO_SRC}
            alt="Alta Permissão, Missão Consciência"
            width={280}
            height={51}
            className="h-auto w-full max-w-[180px] object-contain sm:max-w-[200px]"
          />
          <img
            src={FOOTER_LOGO_SRC}
            alt="Grupo Alta"
            width={190}
            height={73}
            className="h-10 w-auto sm:h-12"
          />
          <p className="text-sm text-cream/40 sm:text-right">
            © {new Date().getFullYear()} Alta Co. | CNPJ: 66.525.966/0001-50
          </p>
        </div>
      </footer>
    </main>
  )
}

export function isObrigadoLocation() {
  if (typeof window === 'undefined') return false
  const path = window.location.pathname.replace(/\/$/, '')
  const hash = window.location.hash.replace(/^#/, '')
  const query = new URLSearchParams(window.location.search)
  return (
    path.endsWith('-obg') ||
    path.endsWith('/obg') ||
    path.endsWith('/obrigado') ||
    hash === 'obrigado' ||
    hash === 'obg' ||
    query.get('obg') === '1'
  )
}
