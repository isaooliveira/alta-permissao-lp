import { useEffect, useMemo, useState, type FormEvent } from 'react'

type Period = '7d' | '30d' | 'all'

interface UtmRow {
  source: string
  medium: string
  campaign: string
  content: string
  filled: number
  purchased: number
}

interface FunnelData {
  period: Period
  range: { startDate: string; endDate: string }
  visits: number
  users: number
  pageviews: number
  openedForm: number
  filled: number
  purchased: number
  abandoned: number
  utm: UtmRow[]
}

const STORAGE_KEY = 'eap_funil_secret'
const ENDPOINT = `${import.meta.env.BASE_URL}api/funil`

function pct(part: number, whole: number) {
  if (!whole) return '—'
  return `${((part / whole) * 100).toFixed(1)}%`
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export function FunilPage() {
  const [secret, setSecret] = useState('')
  const [draft, setDraft] = useState('')
  const [period, setPeriod] = useState<Period>('all')
  const [data, setData] = useState<FunnelData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) setSecret(stored)
  }, [])

  useEffect(() => {
    if (!secret) return
    let cancelled = false
    setLoading(true)
    setError('')
    fetch(`${ENDPOINT}?period=${period}`, {
      headers: { 'x-funil-secret': secret },
    })
      .then(async (res) => {
        const body = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(body.error || `Erro ${res.status}`)
        return body as FunnelData
      })
      .then((json) => {
        if (!cancelled) setData(json)
      })
      .catch((err: Error) => {
        if (cancelled) return
        setData(null)
        setError(err.message)
        if (err.message.includes('Unauthorized')) {
          sessionStorage.removeItem(STORAGE_KEY)
          setSecret('')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [secret, period])

  function unlock(e: FormEvent) {
    e.preventDefault()
    const value = draft.trim()
    if (!value) return
    sessionStorage.setItem(STORAGE_KEY, value)
    setSecret(value)
  }

  const steps = useMemo(() => {
    if (!data) return []
    return [
      { label: 'Visitas', hint: 'Sessões no /eap', value: data.visits },
      { label: 'Abriram o form', hint: 'Clicaram em garantir ingresso', value: data.openedForm },
      { label: 'Preencheram', hint: 'Chegaram no checkout Hotmart', value: data.filled },
      { label: 'Compraram', hint: 'Pagamento aprovado', value: data.purchased },
    ]
  }, [data])

  if (!secret) {
    return (
      <main className="flex min-h-svh items-center justify-center bg-dark px-6 text-cream">
        <form onSubmit={unlock} className="w-full max-w-sm">
          <p className="text-eyebrow text-lime">Efeito Alta Permissão</p>
          <h1 className="mt-4 font-serif text-4xl italic">Funil</h1>
          <p className="mt-3 text-sm leading-relaxed text-cream/55">
            Página interna. Digite a senha que você colocou na Vercel em FUNIL_SECRET.
          </p>
          <input
            type="password"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoComplete="current-password"
            className="mt-8 w-full border-b border-cream/25 bg-transparent py-3 text-lg outline-none placeholder:text-cream/30"
            placeholder="Senha"
          />
          {error && <p className="mt-3 text-sm text-red">{error}</p>}
          <button
            type="submit"
            className="mt-8 bg-lime px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-dark"
          >
            Entrar
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-svh bg-dark px-6 py-10 text-cream sm:px-10">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-eyebrow text-lime">Painel interno</p>
            <h1 className="mt-3 font-serif text-4xl italic sm:text-5xl">Funil EAP</h1>
            {data && (
              <p className="mt-2 text-sm text-cream/45">
                {formatDate(data.range.startDate)} — {formatDate(data.range.endDate)}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            {([
              ['7d', '7 dias'],
              ['30d', '30 dias'],
              ['all', 'Campanha'],
            ] as const).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPeriod(id)}
                className={`px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] ${
                  period === id ? 'bg-lime text-dark' : 'border border-cream/20 text-cream/70'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="mt-8 text-sm text-red">{error}</p>}
        {loading && !data && <p className="mt-8 text-sm text-cream/50">Carregando…</p>}

        {data && (
          <>
            <section className="mt-12 grid gap-px bg-cream/10 sm:grid-cols-4">
              {steps.map((step) => (
                <article key={step.label} className="bg-dark px-5 py-8">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream/40">
                    {step.label}
                  </p>
                  <p className="mt-4 font-serif text-5xl text-lime">{step.value}</p>
                  <p className="mt-3 text-sm text-cream/45">{step.hint}</p>
                </article>
              ))}
            </section>

            <section className="mt-10 grid gap-6 sm:grid-cols-3">
              <Rate label="Visita → form" value={pct(data.openedForm, data.visits)} />
              <Rate label="Form → checkout" value={pct(data.filled, data.openedForm)} />
              <Rate label="Checkout → compra" value={pct(data.purchased, data.filled)} />
            </section>

            <p className="mt-8 max-w-2xl text-sm leading-relaxed text-cream/40">
              Visitas e “abriu o form” vêm do Analytics e podem atrasar até o dia seguinte.
              Preencheram e compraram vêm do CRM em tempo quase real. Abandonaram o checkout:{' '}
              <span className="text-cream">{data.abandoned}</span>.
            </p>

            <section className="mt-14">
              <h2 className="font-serif text-2xl italic">Origem dos leads</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[40rem] text-left text-sm">
                  <thead className="text-[11px] uppercase tracking-[0.18em] text-cream/40">
                    <tr>
                      <th className="pb-3 font-medium">Source</th>
                      <th className="pb-3 font-medium">Medium</th>
                      <th className="pb-3 font-medium">Campaign</th>
                      <th className="pb-3 font-medium">Content</th>
                      <th className="pb-3 font-medium">Preencheram</th>
                      <th className="pb-3 font-medium">Compraram</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.utm.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-6 text-cream/40">
                          Nenhum lead ainda.
                        </td>
                      </tr>
                    )}
                    {data.utm.map((row) => (
                      <tr key={`${row.source}-${row.medium}-${row.campaign}-${row.content}`} className="border-t border-cream/10">
                        <td className="py-3">{row.source}</td>
                        <td className="py-3">{row.medium}</td>
                        <td className="py-3">{row.campaign}</td>
                        <td className="py-3">{row.content}</td>
                        <td className="py-3">{row.filled}</td>
                        <td className="py-3 text-lime">{row.purchased}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  )
}

function Rate({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-cream/10 px-5 py-6">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream/40">{label}</p>
      <p className="mt-3 font-serif text-3xl">{value}</p>
    </div>
  )
}
