import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { utmFriendlyLabel } from '@/lib/utm'

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
  measured?: {
    visits: number
    users: number
    openedForm: number
    generateLead: number
  }
  utm: UtmRow[]
  purchaseVisits?: { 1: number; 2: number; 3: number; 4: number; unknown: number }
  gaError?: string
}

const STORAGE_KEY = 'eap_funil_secret'
const ENDPOINT = `${import.meta.env.BASE_URL}api/funil`
const SMALL_SAMPLE = 15

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

function pct(part: number, whole: number) {
  if (!whole) return '—'
  return `${((part / whole) * 100).toFixed(1)}%`
}

function fmtPct(ratio: number) {
  return `${(ratio * 100).toFixed(1)}%`
}

/** Intervalo de 95% (Wilson). Honesto com amostra pequena — não deixa 0/2 parecer certeza. */
function wilson(k: number, n: number, z = 1.96) {
  if (n <= 0) return null
  const p = k / n
  const z2 = z * z
  const denom = 1 + z2 / n
  const center = p + z2 / (2 * n)
  const err = z * Math.sqrt((p * (1 - p) + z2 / (4 * n)) / n)
  return {
    low: clamp((center - err) / denom, 0, 1),
    high: clamp((center + err) / denom, 0, 1),
  }
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

function captureRate(measured: number, actual: number) {
  if (actual <= 0) return null
  if (measured <= 0) return 0
  return clamp(measured / actual, 0, 1)
}

export function FunilPage() {
  const [secret, setSecret] = useState('')
  const [draft, setDraft] = useState('')
  const [period, setPeriod] = useState<Period>('all')
  const [data, setData] = useState<FunnelData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [reloadTick, setReloadTick] = useState(0)

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
      cache: 'no-store',
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
  }, [secret, period, reloadTick])

  function unlock(e: FormEvent) {
    e.preventDefault()
    const value = draft.trim()
    if (!value) return
    sessionStorage.setItem(STORAGE_KEY, value)
    setSecret(value)
  }

  const reading = useMemo(() => {
    if (!data) return null
    const measured = data.measured ?? {
      visits: data.visits,
      users: data.users,
      openedForm: data.openedForm,
      generateLead: 0,
    }
    const gaCapture = captureRate(measured.generateLead, data.filled)
    const recoveredOpens = Math.max(data.filled - measured.openedForm, 0)
    const recoveredVisits = Math.max(data.openedForm - measured.visits, 0)
    const close = wilson(data.purchased, data.filled)
    const visitLead = wilson(data.filled, data.visits)
    const openFill = wilson(data.filled, data.openedForm)

    let visitLeadLow = visitLead?.low ?? null
    let visitLeadHigh = visitLead?.high ?? null
    if (gaCapture && gaCapture < 1 && measured.visits > 0) {
      const correctedVisits = measured.visits / gaCapture
      visitLeadLow = clamp(data.filled / correctedVisits, 0, 1)
      visitLeadHigh = clamp(data.filled / Math.max(data.visits, data.filled), 0, 1)
      if (visitLeadLow > visitLeadHigh) {
        const swap = visitLeadLow
        visitLeadLow = visitLeadHigh
        visitLeadHigh = swap
      }
    }

    return {
      measured,
      gaCapture,
      recoveredOpens,
      recoveredVisits,
      close,
      visitLead,
      openFill,
      visitLeadLow,
      visitLeadHigh,
      smallSample: data.filled < SMALL_SAMPLE,
      gaLagging: recoveredOpens > 0 || (gaCapture !== null && gaCapture < 1),
    }
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

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setReloadTick((n) => n + 1)}
            className="border border-cream/20 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cream/70"
          >
            Atualizar
          </button>
          {loading && <p className="text-sm text-cream/50">Carregando…</p>}
        </div>

        {error && <p className="mt-6 text-sm text-red">{error}</p>}
        {data?.gaError && (
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-red">
            Analytics ainda não conectou: {data.gaError} Leads e compras abaixo já vêm do CRM.
          </p>
        )}

        {data && reading && (
          <>
            {reading.smallSample && (
              <p className="mt-8 max-w-2xl border border-cream/15 px-5 py-4 text-sm leading-relaxed text-cream/70">
                Amostra pequena ({data.filled} {data.filled === 1 ? 'lead' : 'leads'}). Dá para ver o
                movimento, não para cravar criativo ou preço. Use a faixa, não o percentual sozinho.
              </p>
            )}

            {reading.gaLagging && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-cream/45">
                O Analytics perdeu parte dos cliques
                {reading.gaCapture !== null
                  ? ` (viu ${reading.measured.generateLead} de ${data.filled} envios)`
                  : ''}
                . Quem preencheu o form entra no funil mesmo assim — por isso a taxa nunca passa de
                100%.
              </p>
            )}

            <section className="mt-12">
              <h2 className="font-serif text-2xl italic">Para decidir</h2>
              <p className="mt-2 max-w-2xl text-sm text-cream/45">
                CRM: e-mail único. Compra só conta com o webhook da Hotmart. Esta é a régua confiável.
              </p>
              <div className="mt-8 grid gap-px bg-cream/10 sm:grid-cols-3">
                <Stat
                  label="Preencheram"
                  value={data.filled}
                  hint="E-mails únicos que foram para o checkout"
                />
                <Stat
                  label="Compraram"
                  value={data.purchased}
                  hint="Pagamento aprovado"
                />
                <Stat
                  label="Abandonaram"
                  value={data.abandoned}
                  hint="Preencheram e não pagaram"
                />
              </div>
              <div className="mt-6">
                <Rate
                  label="Lead → compra"
                  value={pct(data.purchased, data.filled)}
                  fraction={`${data.purchased} de ${data.filled}`}
                  range={reading.close ? `${fmtPct(reading.close.low)} – ${fmtPct(reading.close.high)}` : null}
                  trust="alta"
                  note="Faixa de 95%. Enquanto a amostra for pequena, ela fica larga de propósito."
                />
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-serif text-2xl italic">Tráfego</h2>
              <p className="mt-2 max-w-2xl text-sm text-cream/45">
                Analytics pode atrasar ou perder bloqueador. O funil completa o que o CRM já prova:
                quem preencheu, abriu o form; quem abriu o form, visitou.
              </p>
              <div className="mt-8 grid gap-px bg-cream/10 sm:grid-cols-4">
                <Stat
                  label="Visitas"
                  value={data.visits}
                  hint={
                    reading.recoveredVisits
                      ? `${reading.measured.visits} no GA · +${reading.recoveredVisits} pelo CRM`
                      : 'Sessões no /eap'
                  }
                />
                <Stat
                  label="Abriram o form"
                  value={data.openedForm}
                  hint={
                    reading.recoveredOpens
                      ? `${reading.measured.openedForm} no GA · +${reading.recoveredOpens} pelo CRM`
                      : 'Abriram o modal de ingresso'
                  }
                />
                <Stat label="Preencheram" value={data.filled} hint="Mesmo número do CRM" />
                <Stat label="Compraram" value={data.purchased} hint="Mesmo número do CRM" />
              </div>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <Rate
                  label="Visita → lead"
                  value={pct(data.filled, data.visits)}
                  fraction={`${data.filled} de ${data.visits}`}
                  range={
                    reading.visitLeadLow !== null && reading.visitLeadHigh !== null
                      ? `${fmtPct(reading.visitLeadLow)} – ${fmtPct(reading.visitLeadHigh)}`
                      : reading.visitLead
                        ? `${fmtPct(reading.visitLead.low)} – ${fmtPct(reading.visitLead.high)}`
                        : null
                  }
                  trust="média"
                  note="Pode estar um pouco alta se o GA perdeu visita. A faixa já desconta isso quando dá."
                />
                <Rate
                  label="Form → lead"
                  value={pct(data.filled, data.openedForm)}
                  fraction={`${data.filled} de ${data.openedForm}`}
                  range={
                    reading.openFill
                      ? `${fmtPct(reading.openFill.low)} – ${fmtPct(reading.openFill.high)}`
                      : null
                  }
                  trust="média"
                  note="De quem abriu o form, quantos enviaram. Nunca passa de 100%."
                />
              </div>
            </section>

            <section className="mt-14">
              <h2 className="font-serif text-2xl italic">Visitas até a compra</h2>
              <p className="mt-2 max-w-2xl text-sm text-cream/45">
                Só quem pagou. Recarregar a página na mesma meia hora não conta visita nova.
              </p>
              <div className="mt-8 grid gap-px bg-cream/10 sm:grid-cols-4">
                {[
                  { label: '1ª visita', value: data.purchaseVisits?.[1] ?? 0 },
                  { label: '2ª visita', value: data.purchaseVisits?.[2] ?? 0 },
                  { label: '3ª visita', value: data.purchaseVisits?.[3] ?? 0 },
                  { label: '4ª ou mais', value: data.purchaseVisits?.[4] ?? 0 },
                ].map((item) => (
                  <article key={item.label} className="bg-dark px-5 py-8">
                    <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream/40">
                      {item.label}
                    </p>
                    <p className="mt-4 font-serif text-5xl text-lime">{item.value}</p>
                    <p className="mt-3 text-sm text-cream/45">
                      {pct(item.value, data.purchased - (data.purchaseVisits?.unknown ?? 0))}
                    </p>
                  </article>
                ))}
              </div>
              {(data.purchaseVisits?.unknown ?? 0) > 0 && (
                <p className="mt-4 text-sm text-cream/40">
                  {data.purchaseVisits?.unknown} compra(s) sem contador (lead de antes dessa medição).
                </p>
              )}
            </section>

            <section className="mt-14">
              <h2 className="font-serif text-2xl italic">Origem dos leads</h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[20rem] text-left text-sm">
                  <thead className="text-[11px] uppercase tracking-[0.18em] text-cream/40">
                    <tr>
                      <th className="pb-3 font-medium">Origem</th>
                      <th className="pb-3 font-medium">Pessoas</th>
                      <th className="pb-3 font-medium">Compraram</th>
                      <th className="pb-3 font-medium">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.utm.length === 0 && (
                      <tr>
                        <td colSpan={4} className="py-6 text-cream/40">
                          Nenhum lead ainda.
                        </td>
                      </tr>
                    )}
                    {data.utm.map((row) => (
                      <tr
                        key={`${row.source}-${row.medium}-${row.campaign}-${row.content}`}
                        className="border-t border-cream/10"
                      >
                        <td className="py-3">{utmFriendlyLabel(row)}</td>
                        <td className="py-3">{row.filled}</td>
                        <td className="py-3 text-lime">{row.purchased}</td>
                        <td className="py-3 text-cream/60">{pct(row.purchased, row.filled)}</td>
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

function Stat({ label, value, hint }: { label: string; value: number; hint: string }) {
  return (
    <article className="bg-dark px-5 py-8">
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-cream/40">{label}</p>
      <p className="mt-4 font-serif text-5xl text-lime">{value}</p>
      <p className="mt-3 text-sm text-cream/45">{hint}</p>
    </article>
  )
}

function Rate({
  label,
  value,
  fraction,
  range,
  trust,
  note,
}: {
  label: string
  value: string
  fraction: string
  range: string | null
  trust: 'alta' | 'média'
  note: string
}) {
  return (
    <div className="border border-cream/10 px-5 py-6">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cream/40">{label}</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cream/35">
          {trust === 'alta' ? 'Régua CRM' : 'Com ajuste de GA'}
        </p>
      </div>
      <p className="mt-3 font-serif text-3xl">{value}</p>
      <p className="mt-2 text-sm text-cream/55">{fraction}</p>
      {range && (
        <p className="mt-3 text-sm text-cream/80">
          Faixa para decidir: <span className="text-cream">{range}</span>
        </p>
      )}
      <p className="mt-3 text-sm leading-relaxed text-cream/40">{note}</p>
    </div>
  )
}
