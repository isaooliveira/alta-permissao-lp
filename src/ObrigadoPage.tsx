import { WHATSAPP_GRUPO_EAP } from '@/lib/eventContent'

const LOGO_SRC = `${import.meta.env.BASE_URL}logo-alta.svg`
const FOOTER_LOGO_SRC = `${import.meta.env.BASE_URL}logo-altas.svg`

export function ObrigadoPage() {
  return (
    <main className="flex min-h-svh flex-col bg-dark text-cream">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-16 sm:px-10">
        <img
          src={LOGO_SRC}
          alt="Alta Permissão, Missão Consciência"
          width={280}
          height={51}
          className="h-auto w-full max-w-[240px] object-contain"
        />

        <p className="mt-14 text-eyebrow text-lime">Ingresso confirmado</p>
        <h1 className="mt-5 max-w-xl text-center font-serif text-4xl italic leading-tight sm:text-6xl">
          Você está dentro.
        </h1>
        <p className="mt-6 max-w-md text-center text-lg leading-relaxed text-cream/70">
          O pagamento foi aprovado. O próximo passo é entrar no grupo de WhatsApp — é por lá que
          entram aviso de horário, link do Zoom e o que precisa no dia 12 de setembro.
        </p>

        {WHATSAPP_GRUPO_EAP ? (
          <a
            href={WHATSAPP_GRUPO_EAP}
            target="_blank"
            rel="noreferrer"
            className="btn-shimmer relative mt-10 inline-flex min-w-0 max-w-full items-center justify-center rounded-[6px] bg-lime px-8 py-4 text-[16px] font-bold uppercase tracking-wide text-dark hover:brightness-105 hover:shadow-[0_0_28px_rgba(209,255,3,0.45)] sm:min-w-[22rem] sm:px-10 sm:text-lg"
          >
            <span className="relative z-[2]">Entrar no grupo de WhatsApp</span>
          </a>
        ) : (
          <p className="mt-10 max-w-md text-center text-sm leading-relaxed text-cream/55">
            O convite do grupo chega no e-mail da Hotmart. Se não aparecer em alguns minutos, olhe o spam.
          </p>
        )}

        <ul className="mt-14 max-w-md space-y-3 text-sm leading-relaxed text-cream/50">
          <li>12 de setembro · ao vivo no Zoom</li>
          <li>O acesso da sala entra no e-mail cadastrado na compra</li>
          <li>Guarde o comprovante da Hotmart</li>
        </ul>
      </div>

      <footer className="border-t border-cream/10 px-6 py-10 sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <img
            src={FOOTER_LOGO_SRC}
            alt="Grupo Alta"
            width={190}
            height={73}
            className="h-10 w-auto sm:h-12"
          />
          <p className="text-sm text-cream/40">
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
