import {
  X,
  Check,
  ArrowDown,
  Quote,
} from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { FadeIn } from './FadeIn'
import { Button } from './Button'
import { SectionEyebrow } from './SectionEyebrow'
import sonhosImg from '@/assets/sonhos.webp'

interface SectionProps {
  onCtaClick?: () => void
}

function ScrollArrowCue() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
      <div className="flex h-[4.5rem] w-10 items-center justify-center rounded-full bg-dark shadow-[0_10px_28px_rgba(32,32,32,0.28)] sm:h-[5.25rem] sm:w-11">
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 6, 0], opacity: [1, 0.4, 1] }}
          transition={
            reduceMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <ArrowDown size={22} className="text-cream" strokeWidth={1.5} aria-hidden="true" />
        </motion.div>
      </div>
    </div>
  )
}

const ABSURD_CLAIMS = [
  {
    highlight: 'Gordura na barriga é uma proteção',
    rest: 'que o corpo cria porque você não se sente segura.',
  },
  {
    highlight: 'Homossexualidade é excesso de mãe',
    rest: 'e falta de masculino.',
  },
  {
    highlight: 'Problemas no útero significam rejeição',
    rest: 'da própria feminilidade.',
  },
]

/* ─── Bloco 2: mercado de interpretações ─── */
export function ProblemSection() {
  return (
    <section className="relative">
      <div className="bg-white px-5 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:px-12 lg:pb-28 lg:pt-16">
        <FadeIn>
          <h2 className="mx-auto max-w-3xl text-center text-[1.45rem] font-normal leading-[1.3] tracking-tight text-dark sm:text-[1.85rem] lg:max-w-4xl lg:text-[2.15rem] lg:leading-[1.25]">
            O que acontece quando um mercado inteiro de desenvolvimento humano começa a dizer{' '}
            <span className="font-bold text-red">absurdos</span> como:
          </h2>
        </FadeIn>

        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 items-stretch gap-3 sm:mt-10 sm:gap-4 lg:mt-12 lg:grid-cols-3 lg:gap-5">
          {ABSURD_CLAIMS.map((claim, i) => (
            <FadeIn key={claim.highlight} delay={0.08 + i * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-md border border-red/45 bg-dark px-5 py-5 text-left sm:px-6 sm:py-6">
                <span className="mb-4 flex h-7 w-7 items-center justify-center rounded-full bg-red sm:h-8 sm:w-8">
                  <X size={13} className="text-white" strokeWidth={2.75} aria-hidden="true" />
                </span>
                <p className="text-[1.15rem] font-bold leading-snug text-cream sm:text-[1.25rem]">
                  {claim.highlight}
                </p>
                <p className="mt-2 text-base leading-snug text-cream/70 sm:text-[1.05rem]">
                  {claim.rest}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>

      <div className="relative bg-cream px-5 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <ScrollArrowCue />

        <div className="mx-auto max-w-3xl space-y-6 text-center text-dark sm:space-y-8">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-dark/50">
              Isso tudo tem algo em comum
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="text-[1.45rem] font-normal leading-[1.3] tracking-tight sm:text-[1.85rem] lg:text-[2.15rem] lg:leading-[1.25]">
              Interpretações soltas sobre comportamento, corpo e história humana sendo ensinadas{' '}
              <span className="font-bold">como se fossem fatos.</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto max-w-2xl text-[1.05rem] leading-relaxed text-dark/75 sm:text-xl lg:text-[1.35rem] lg:leading-[1.45]">
              Quando essas ideias são repetidas o suficiente, passam a parecer{' '}
              <span className="font-bold text-red">verdades absolutas.</span>
            </p>
          </FadeIn>
        </div>

        <FadeIn delay={0.24}>
          <article className="mx-auto mt-12 max-w-3xl rounded-2xl border border-red/35 bg-dark px-6 py-8 text-center sm:mt-16 sm:px-10 sm:py-12 lg:mt-20 lg:max-w-4xl lg:px-16 lg:py-14">
            <p className="text-[1.25rem] font-bold leading-snug tracking-tight text-cream sm:text-[1.5rem] lg:text-[1.75rem]">
              Trauma, apego, narcisismo, crenças, família.
            </p>
            <p className="mt-3 text-base leading-relaxed text-cream/70 sm:text-lg lg:text-xl">
              Existem várias formas de explicar um mesmo comportamento.
            </p>
            <p className="mt-8 text-base leading-relaxed text-cream/75 sm:text-lg lg:text-xl">
              O problema não é existir mais de uma interpretação.
            </p>
            <p className="mt-3 text-[1.15rem] font-bold leading-snug text-cream sm:text-[1.35rem] lg:text-[1.55rem]">
              É escolher uma delas e usá-la como{' '}
              <span className="text-cream">resposta para todo mundo.</span>
            </p>
            <p className="mt-8 font-serif text-[1.85rem] italic leading-snug text-red sm:text-[2.25rem] lg:text-[2.6rem]">
              É aí que começa o amadorismo.
            </p>
          </article>
        </FadeIn>
      </div>
    </section>
  )
}

const SELF_DIAGNOSIS_PHRASES = [
  'Vi na internet que tenho TDAH.',
  'Eu tenho apego ansioso.',
  'Eu tenho trauma de abandono.',
  'Meu ex é narcisista.',
  'Eu me autossaboto porque tenho um bloqueio.',
]

const PROBLEM_IMG_DESKTOP = `${import.meta.env.BASE_URL}${encodeURIComponent('Group 19202.webp')}`
const PROBLEM_IMG_MOBILE = `${import.meta.env.BASE_URL}${encodeURIComponent('Group 19201.webp')}`

function ProblemAmplificationCopy() {
  return (
    <>
      <FadeIn>
        <h2 className="text-[1.45rem] font-normal leading-[1.28] tracking-tight text-white sm:text-[1.85rem] lg:text-[2.15rem] lg:leading-[1.25]">
          E esse <span className="font-bold text-red">problema</span> ficou maior quando qualquer
          pessoa passou a procurar no <span className="font-bold">Dr. Google</span> uma explicação
          sobre suas questões.
        </h2>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-white/70 sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
          <p>
            Hoje, a informação que antes circulava principalmente entre profissionais está no{' '}
            <span className="font-semibold text-cream">Google</span>, no{' '}
            <span className="font-semibold text-cream">TikTok</span>, no{' '}
            <span className="font-semibold text-cream">Instagram</span> e no{' '}
            <span className="font-semibold text-cream">YouTube</span>.
          </p>
          <p>
            Isso ampliou o acesso ao conhecimento. Mas também colocou{' '}
            <span className="font-semibold text-cream">milhões de interpretações</span> ao alcance
            de qualquer pessoa.
          </p>
          <p>E aí começam a aparecer frases como:</p>
        </div>
      </FadeIn>

      <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
        {SELF_DIAGNOSIS_PHRASES.map((phrase, i) => (
          <FadeIn key={phrase} delay={0.12 + i * 0.05}>
            <p
              className={`flex items-start gap-2.5 rounded-md border border-cream/15 bg-white/[0.04] px-4 py-3 text-[1.05rem] font-semibold italic leading-snug text-cream sm:px-5 sm:py-3.5 sm:text-lg ${
                i % 2 === 0 ? 'sm:-rotate-[0.6deg]' : 'sm:rotate-[0.6deg]'
              }`}
            >
              <Quote size={16} className="mt-1 shrink-0 text-cream/30" aria-hidden="true" />
              <span>{phrase}</span>
            </p>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.4}>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-white/70 sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
          <p>Às vezes, a pessoa já chega convencida de uma explicação.</p>
          <p>
            Outras vezes, ela chega só com um problema e é durante o processo que uma explicação
            começa a ser construída.
          </p>
        </div>
      </FadeIn>
    </>
  )
}

/* ─── Bloco 3: o problema ficou maior ─── */
export function ProblemAmplificationSection() {
  return (
    <section className="relative overflow-hidden bg-dark">
      <div className="relative lg:hidden">
        <img
          src={PROBLEM_IMG_MOBILE}
          alt=""
          width={636}
          height={525}
          className="h-auto w-full object-cover object-[50%_28%]"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-dark from-15% via-dark/85 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="relative lg:min-h-[min(92vh,880px)]">
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
          <img
            src={PROBLEM_IMG_DESKTOP}
            alt=""
            width={1731}
            height={949}
            className="absolute inset-0 h-full w-full object-cover object-[84%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark from-[14%] via-dark/75 via-[40%] to-transparent to-[68%]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[22rem] px-6 pb-16 pt-0 -mt-10 sm:max-w-xl sm:px-8 sm:pb-20 sm:-mt-12 lg:mx-auto lg:mt-0 lg:flex lg:min-h-[min(92vh,880px)] lg:max-w-6xl lg:items-center lg:px-12 lg:py-24 xl:px-4">
          <div className="w-full lg:max-w-[min(100%,34rem)]">
            <ProblemAmplificationCopy />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Bloco 3b: o peso do que você diz ─── */
export function WhatYouSaySection() {
  return (
    <section className="relative overflow-hidden bg-black px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-serif text-[10rem] italic leading-none text-white/[0.05] sm:text-[14rem] lg:text-[18rem]"
      >
        “
      </span>
      <FadeIn className="relative">
        <p className="mx-auto max-w-4xl text-center text-[1.45rem] font-normal leading-[1.3] tracking-tight text-white sm:text-[1.95rem] lg:text-[2.35rem] lg:leading-[1.28]">
          Nos dois casos, <span className="font-bold text-cream">o que você diz</span> pode{' '}
          <span className="font-bold">confirmar</span> uma interpretação,{' '}
          <span className="font-bold">criar</span> uma nova ou{' '}
          <span className="font-bold">
            mudar a forma como aquela pessoa passa a entender a própria história.
          </span>
        </p>
      </FadeIn>
    </section>
  )
}

/* ─── Bloco 4: a interpretação não termina quando é dita ─── */
export function InterpretationConsequenceSection({ onCtaClick }: SectionProps) {
  return (
    <section className="bg-white px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[22rem] flex-col items-center text-center sm:max-w-xl lg:max-w-3xl">
        <FadeIn>
          <h2 className="text-[1.7rem] font-semibold leading-[1.2] tracking-tight text-dark sm:text-[2.15rem] lg:max-w-3xl lg:text-[2.5rem] lg:leading-[1.18]">
            Uma interpretação <span className="text-red">não pode virar conclusão</span> só porque
            parece fazer sentido.
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-8 space-y-6 text-[1.05rem] leading-relaxed text-dark/55 sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
            <p>
              Ela pode mudar a forma como alguém passa a olhar para a própria infância, para a mãe,
              para o pai, para um relacionamento, para uma escolha ou até para quem acredita ser.
            </p>
            <p>
              Uma possibilidade repetida com convicção pode ganhar o peso de uma{' '}
              <span className="font-bold text-dark">verdade pessoal.</span>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.18}>
          <p className="mt-8 text-[1.05rem] leading-relaxed text-dark sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
            E quanto maior a influência que você tem sobre a forma como alguém entende a própria
            vida, maior precisa ser o{' '}
            <span className="font-serif text-[1.15em] italic text-red">
              cuidado com aquilo que você afirma.
            </span>
          </p>
        </FadeIn>

        {onCtaClick && (
          <FadeIn delay={0.24} className="mt-10 w-full sm:mt-12 sm:flex sm:justify-center">
            <Button
              size="md"
              onClick={onCtaClick}
              showTicket
              className="w-full sm:w-auto sm:min-w-[22rem] sm:px-10"
            >
              Garantir Meu ingresso
            </Button>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

const ACTION_FLOW_STEPS = [
  { title: 'O que aconteceu', subtitle: 'Fato / acontecimento' },
  { title: 'O que foi relatado', subtitle: 'Relato da pessoa' },
  { title: 'O que foi interpretado', subtitle: 'Sentido atribuído' },
  { title: 'O que é opinião', subtitle: 'Leitura pessoal' },
  { title: 'O que ainda precisa ser compreendido', subtitle: 'Lacunas e hipóteses' },
]

function ActionFlowModule() {
  return (
    <div className="mt-8 overflow-hidden rounded-md border border-cream/10 bg-white/[0.03] px-5 py-7 sm:mt-10 sm:px-8 sm:py-9">
      <ol className="m-0 flex list-none flex-col gap-0 p-0">
        {ACTION_FLOW_STEPS.map((step, i) => {
          const isLast = i === ACTION_FLOW_STEPS.length - 1
          return (
            <li key={step.title} className="flex gap-4 sm:gap-5">
              <div className="flex w-8 shrink-0 flex-col items-center sm:w-9">
                <span className="flex h-8 w-8 items-center justify-center font-serif text-lg italic text-lime sm:h-9 sm:w-9 sm:text-xl">
                  {i + 1}
                </span>
                {!isLast && (
                  <span
                    className="w-px flex-1 bg-gradient-to-b from-cream/25 to-cream/5"
                    aria-hidden="true"
                  />
                )}
              </div>
              <div className={`min-w-0 flex-1 pb-5 ${isLast ? 'pb-0' : ''}`}>
                <p className="text-base font-bold leading-snug text-cream sm:text-lg">{step.title}</p>
                <p className="mt-0.5 text-sm leading-snug text-cream/50">{step.subtitle}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/* ─── Bloco 5: atuação profissional vs amadora ─── */
export function ProfessionalDistinctionSection() {
  return (
    <section className="bg-dark px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto w-full max-w-[22rem] sm:max-w-xl lg:max-w-3xl">
        <FadeIn>
          <h2 className="text-[1.55rem] font-normal leading-[1.25] tracking-tight text-white sm:text-[1.9rem] lg:text-[2.35rem] lg:leading-[1.22]">
            É aqui que <span className="font-bold">uma atuação profissional</span> começa a se
            separar de uma atuação <span className="font-bold text-red">amadora.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className="mt-7 text-[1.05rem] leading-relaxed text-white/70 sm:mt-8 sm:text-lg lg:text-xl">
            Não pela quantidade de nomes, teorias ou técnicas conhecidas. Mas pela capacidade de
            distinguir:
          </p>
        </FadeIn>

        <FadeIn delay={0.14}>
          <ActionFlowModule />
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="mt-8 space-y-4 text-[1.05rem] leading-relaxed text-white/70 sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
            <p>
              Duas pessoas podem apresentar o mesmo comportamento por razões completamente
              diferentes.
            </p>
            <p>O comportamento pode até ser semelhante.</p>
            <p className="font-serif text-[1.3rem] italic text-white sm:text-[1.55rem]">
              Mas a explicação <span className="text-red">não pode ser automática.</span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

const APS_COMPARISON = [
  {
    without: 'Escuta um comportamento e já pensa no que ele “significa”.',
    with: 'Separa o que aconteceu da interpretação sobre o que aconteceu.',
  },
  {
    without: 'Encontra uma explicação que faz sentido e encerra a busca.',
    with: 'Considera outras possibilidades antes de concluir.',
  },
  {
    without: 'Faz perguntas para confirmar o que suspeitou.',
    with: 'Faz perguntas, observa e busca entender o que ainda não sabe.',
  },
  {
    without: 'Usa o repertório para encaixar o caso em uma teoria.',
    with: 'Usa o repertório para ampliar as possibilidades de leitura.',
  },
  {
    without: 'Confunde uma boa hipótese com uma conclusão.',
    with: 'Sabe o que pode afirmar e o que ainda precisa ser compreendido.',
  },
  {
    without: 'Precisa “sacar” a pessoa para sentir que fez um bom trabalho.',
    with: 'Não precisa adivinhar. Sabe observar, organizar e conduzir.',
  },
]

/* ─── Bloco 6: subir de nível / comparação APS ─── */
export function LevelUpReadingSection() {
  return (
    <section className="bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center lg:max-w-5xl">
        <FadeIn>
          <SectionEyebrow variant="light" className="text-[13px] tracking-[0.2em] text-dark sm:text-sm">
            Por isso
          </SectionEyebrow>
        </FadeIn>

        <FadeIn delay={0.06}>
          <h2 className="mt-5 text-[1.55rem] font-normal leading-[1.25] tracking-tight text-dark sm:mt-6 sm:text-[1.9rem] lg:max-w-3xl lg:text-[2.35rem] lg:leading-[1.22]">
            Subir de nível <span className="font-bold">não significa</span> virar a{' '}
            <span className="font-bold">Mãe Diná</span>, a sabe-tudo, nem olhar para alguém e{' '}
            “sacar” tudo o que acontece com ela em uma sessão.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-8 text-[1.05rem] leading-relaxed text-dark/70 sm:mt-10 sm:text-lg lg:max-w-3xl lg:text-xl">
            O que muda quando você deixa de depender apenas do repertório e começa a desenvolver{' '}
            <span className="font-bold text-dark">capacidade de leitura?</span>
          </p>
        </FadeIn>

        <FadeIn delay={0.12}>
          <p className="mt-6 text-[1.15rem] font-bold tracking-tight text-dark sm:mt-8 sm:text-xl">
            É isso que nós vamos praticar ao vivo
          </p>
        </FadeIn>

        <FadeIn delay={0.16} className="mt-6 w-full sm:mt-8">
          <div className="overflow-hidden rounded-2xl border border-dark/10 text-left shadow-[0_24px_60px_-24px_rgba(32,32,32,0.18)]">
            <div className="hidden grid-cols-2 lg:grid">
              <div className="border-b border-r border-dark/10 bg-red/[0.06] px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-red">
                  Sem o olhar APS
                </p>
              </div>
              <div className="border-b border-dark/10 bg-lime/15 px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-dark">
                  Com o olhar APS
                </p>
              </div>
            </div>

            {APS_COMPARISON.map((row) => (
              <div
                key={row.without}
                className="group grid grid-cols-1 border-b border-dark/10 last:border-b-0 lg:grid-cols-2"
              >
                <div className="flex items-start gap-3 border-dark/10 bg-red/[0.04] px-4 py-4 transition-colors duration-200 group-hover:bg-red/[0.08] sm:px-5 lg:border-r lg:px-6 lg:py-5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red">
                    <X size={11} className="text-white" strokeWidth={2.75} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-red lg:hidden">
                      Sem o olhar APS
                    </p>
                    <p className="text-[0.98rem] leading-snug text-dark/80 sm:text-base">{row.without}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-[#f4f8e8] px-4 py-4 transition-colors duration-200 group-hover:bg-lime/20 sm:px-5 lg:px-6 lg:py-5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-dark">
                    <Check size={11} className="text-lime" strokeWidth={2.75} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-dark/55 lg:hidden">
                      Com o olhar APS
                    </p>
                    <p className="text-[0.98rem] font-semibold leading-snug text-dark sm:text-base">
                      {row.with}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.28}>
          <p className="mt-10 max-w-3xl text-[1.05rem] leading-relaxed text-dark/75 sm:mt-12 sm:text-lg lg:text-xl">
            É assim que a sua atuação começa a se diferenciar: não pela quantidade de certificados,
            mas pela <span className="font-bold text-dark">qualidade do pensamento</span> que
            aparece na forma como você observa, pergunta e conduz.
          </p>
        </FadeIn>

        <FadeIn delay={0.34}>
          <p className="mt-5 font-serif text-[1.65rem] italic leading-snug text-dark sm:text-[2rem] lg:max-w-3xl lg:text-[2.3rem]">
            É esse salto que o <span className="text-red">Efeito Alta Permissão</span> começa a
            desenvolver.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function PatternBox({ text, variant = 'dark' }: { text: string; variant?: 'dark' | 'light' }) {
  const isLight = variant === 'light'

  return (
    <div
      className={`flex h-full items-start gap-4 border border-red/50 bg-red/5 px-4 py-3.5 transition-colors duration-200 hover:border-red/70 hover:bg-red/10 ${
        isLight ? 'sm:px-5 sm:py-4' : ''
      }`}
    >
      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center border border-red/80">
        <X size={11} className="text-red" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span
        className={`text-base leading-snug ${isLight ? 'text-dark/80' : 'text-cream/90'}`}
      >
        {text}
      </span>
    </div>
  )
}

/* ─── Card: sistema operando / limites ─── */
function SystemLimitsCard() {
  return (
    <div className="rounded-[8px] bg-white px-6 py-8 text-center sm:px-8 sm:py-10">
      <p className="mx-auto max-w-xl text-[clamp(1.45rem,3.5vw,2.1rem)] font-light leading-tight text-dark">
        Existe um sistema operando por baixo das suas decisões.
      </p>
      <p className="mx-auto mt-3 max-w-xl text-lead text-dark/70">
        Ele foi programado muito antes de você entender racionalmente as coisas, e, desde então,
        ele dita os <span className="font-semibold text-red">seus limites</span>:
      </p>
    </div>
  )
}

/* ─── Módulo Alta Permissão Sistêmica (arco bege) ─── */
function SolutionArchModule() {
  return (
    <div className="w-full sm:mx-auto sm:max-w-2xl sm:px-4">
      <div
        className="relative z-10 w-full bg-solution-cream px-6 pt-14 pb-10 sm:px-12 sm:pt-18 sm:pb-12"
        style={{ borderRadius: '9999px 9999px 0 0' }}
      >
        <p className="mb-2 text-center text-sm font-semibold text-dark/60 sm:mb-3">
          E a solução
        </p>

        <h3 className="text-display mb-3 text-center leading-none sm:mb-4">
          <span className="text-accent-brand">Alta</span>{' '}
          <span className="text-dark">Permissão</span>
          <br />
          <span className="text-dark">Sistêmica</span>
        </h3>

        <p className="mx-auto max-w-xl text-center text-lead text-dark">
          Permissão é o que determina o que você consegue sustentar. Você pode atrair dinheiro,
          oportunidades e relações, mas, se não tiver permissão para tê-los, vai encontrar formas
          de devolvê-los.
        </p>

        <div className="mt-8 w-full">
          <img
            src={sonhosImg}
            alt="Ilustração sobre sonhos e permissão sistêmica"
            className="h-auto w-full rounded-md object-contain"
          />
        </div>

        <p className="mt-8 text-center text-lg font-semibold leading-relaxed text-dark">
          Ela parte de uma premissa simples:
        </p>
        <p className="mt-3 text-center text-xl font-semibold leading-tight text-dark">
          "Tudo aquilo que você não está disposta a ser, parecer ou receber continua exercendo
          influência sobre as suas decisões."
        </p>
      </div>
    </div>
  )
}

/* ─── Section 2: Diagnóstico — padrões nos bastidores ─── */
export function DiagnosisSection({ onCtaClick }: SectionProps) {
  const patterns = [
    'O teto exato de grana que você se permite reter todos os meses.',
    'O preço que você cobra pelo seu serviço sem sentir aquele desconforto terrível.',
    'O quanto você pode se sentir feliz.',
    'O quanto você se permite descansar.',
    'A coragem de “se expor” e ser vista em qualquer sala em que entrar.',
    'O papel de "medíocre" ou de "boazinha" que você assume para não trair o seu clã.',
  ]

  return (
    <section className="section-padding bg-dark pt-20 pb-16">
      <div className="container-wide">
        <FadeIn>
          <h2 className="text-section text-white text-center mb-8">
            Entendeu por que{' '}
            <span className="font-semibold text-red">nada disso</span> é sobre pedir, manifestar
            ou atrair?{' '}
            <span className="font-semibold">É sobre receber.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="-mx-4 mb-12 sm:mx-auto">
            <SolutionArchModule />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mx-auto mb-10 max-w-2xl">
            <SystemLimitsCard />
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {patterns.map((item, i) => (
            <FadeIn key={item} delay={0.15 + i * 0.06}>
              <PatternBox text={item} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.8}>
          <p className="mx-auto max-w-3xl text-center text-xl font-semibold leading-relaxed text-cream">
            Enquanto esses gatilhos continuarem no ponto cego, você pode ter a teoria
            perfeita na cabeça, mas vai continuar presa a uma rotina que já não combina
            com quem você é hoje.
          </p>
        </FadeIn>

        {onCtaClick && (
          <FadeIn delay={0.9} className="mt-12 flex justify-center">
            <Button size="md" onClick={onCtaClick} showTicket className="w-full sm:w-auto sm:min-w-[22rem] sm:px-10">
              Garantir Meu ingresso
            </Button>
          </FadeIn>
        )}
      </div>
    </section>
  )
}
