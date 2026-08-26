import {
  X,
  ArrowDown,
  Eye,
  MessageCircleQuestion,
  Layers,
  Search,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react'
import { FadeIn } from './FadeIn'
import { Button } from './Button'
import { SectionEyebrow } from './SectionEyebrow'
import sonhosImg from '@/assets/sonhos.webp'

interface SectionProps {
  onCtaClick?: () => void
}

/* ─── Bloco 2: mercado de interpretações ─── */
export function ProblemSection() {
  return (
    <section className="relative">
      <div className="bg-white px-6 pb-16 pt-10 sm:px-8 sm:pb-24 sm:pt-14 lg:px-12 lg:pb-28 lg:pt-16">
        <FadeIn>
          <h2 className="mx-auto max-w-[20.5rem] text-center text-[1.35rem] font-normal leading-[1.35] tracking-tight text-dark sm:max-w-xl sm:text-[1.65rem] sm:leading-snug lg:max-w-3xl lg:text-[2rem] lg:leading-[1.3]">
            O que acontece quando um mercado inteiro começa a tratar interpretações sobre
            comportamento humano como se fossem fatos?
          </h2>
        </FadeIn>
      </div>

      <div className="relative bg-cream px-6 pb-16 pt-16 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-28 lg:pt-24">
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-[4.5rem] w-10 items-center justify-center rounded-full bg-dark shadow-[0_10px_28px_rgba(32,32,32,0.28)] sm:h-[5.25rem] sm:w-11">
            <ArrowDown size={22} className="text-cream" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>

        <div className="mx-auto max-w-[20.5rem] space-y-8 text-center text-dark sm:max-w-xl sm:space-y-10 lg:max-w-3xl lg:space-y-12">
          <FadeIn>
            <p className="text-[1.05rem] leading-relaxed sm:text-xl lg:text-[1.4rem] lg:leading-[1.45]">
              Hoje existem <span className="font-bold">várias teorias</span> capazes de{' '}
              <span className="font-bold">explicar</span> o{' '}
              <span className="font-bold">mesmo comportamento</span> de formas completamente
              diferentes.
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <p className="text-[1.35rem] font-bold leading-[1.35] tracking-tight sm:text-2xl lg:text-[1.9rem] lg:leading-snug">
              Trauma. Apego. Crenças. Família. Sistema. Medo. Proteção.
            </p>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="text-[1.05rem] leading-relaxed sm:text-xl lg:text-[1.4rem] lg:leading-[1.45]">
              E, quando qualquer uma delas entra cedo demais como resposta, o risco é transformar
              uma possibilidade em verdade sobre alguém.
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

const SHELF_EXPLANATIONS = [
  {
    title: 'Opiniões apresentadas como verdade',
    description: 'Leituras pessoais que ganham aparência de fato.',
  },
  {
    title: 'Simplificações que reduzem uma história inteira a uma causa',
    description: '“É sua mãe.” “É trauma.” “É medo.” “É o sistema.”',
  },
  {
    title: 'Explicações de prateleira que servem para qualquer pessoa',
    description: 'Respostas prontas aplicadas antes de entender aquela situação específica.',
  },
]

const PROBLEM_IMG_DESKTOP = `${import.meta.env.BASE_URL}${encodeURIComponent('Group 19202.webp')}`
const PROBLEM_IMG_MOBILE = `${import.meta.env.BASE_URL}${encodeURIComponent('Group 19201.webp')}`

function ProblemAmplificationCopy() {
  return (
    <>
      <FadeIn>
        <h2 className="text-[1.45rem] font-normal leading-[1.28] tracking-tight text-white sm:text-[1.85rem] lg:text-[2.15rem] lg:leading-[1.25]">
          E esse <span className="font-bold text-red">problema</span> ficou maior quando{' '}
          <span className="font-bold">qualquer pessoa passou a estar a uma pesquisa de distância</span>{' '}
          de uma explicação sobre si mesma.
        </h2>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-white/70 sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
          <p>
            Hoje, conceitos sobre trauma, apego, narcisismo, crenças, família e comportamento
            circulam fora dos consultórios o tempo inteiro.
          </p>
          <p>Isso ampliou o acesso à informação.</p>
          <p>Mas também fez:</p>
        </div>
      </FadeIn>

      <div className="mt-5 space-y-2.5 sm:mt-6 sm:space-y-3">
        {SHELF_EXPLANATIONS.map((item, i) => (
          <FadeIn key={item.title} delay={0.14 + i * 0.06}>
            <div className="flex items-start gap-3.5 rounded-md border border-red/55 bg-white/[0.03] px-4 py-3.5 sm:px-5 sm:py-4">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red sm:h-8 sm:w-8">
                <X size={13} className="text-white" strokeWidth={2.75} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-base font-semibold leading-snug text-white sm:text-lg">
                  {item.title}
                </p>
                <p className="mt-1 text-sm leading-snug text-white/65 sm:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.36}>
        <div className="mt-8 space-y-5 text-[1.05rem] leading-relaxed text-white/70 sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
          <p>
            Às vezes, a pessoa já chega convencida de uma explicação. Outras vezes, ela chega
            apenas com um problema e encontra essa explicação durante o processo.
          </p>
          <p>Nos dois casos, quem trabalha com pessoas ocupa uma posição de muita influência.</p>
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

/* ─── Bloco 4: a interpretação não termina quando é dita ─── */
export function InterpretationConsequenceSection({ onCtaClick }: SectionProps) {
  return (
    <section className="bg-white px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[22rem] flex-col items-center text-center sm:max-w-xl lg:max-w-3xl">
        <FadeIn>
          <SectionEyebrow variant="light" className="text-[13px] tracking-[0.2em] text-dark sm:text-sm">
            Isso acontece
          </SectionEyebrow>
        </FadeIn>

        <FadeIn delay={0.06}>
          <h2 className="mt-5 text-[1.7rem] font-semibold leading-[1.2] tracking-tight text-dark sm:mt-6 sm:text-[2.15rem] lg:max-w-2xl lg:text-[2.5rem] lg:leading-[1.18]">
            Porque uma interpretação não termina quando é dita.
          </h2>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="mt-8 space-y-6 text-[1.05rem] leading-relaxed text-dark/55 sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
            <p>
              Ela pode mudar a forma como alguém passa a olhar para a própria infância, para a mãe,
              para o pai, para um relacionamento, para uma escolha ou até para quem acredita ser.
            </p>
            <p>Uma possibilidade repetida com convicção pode ganhar o peso de uma verdade pessoal.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.18}>
          <p className="mt-8 text-[1.05rem] font-bold leading-relaxed text-dark sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
            Quanto maior a influência que um profissional tem sobre a forma como uma pessoa entende
            a própria vida, maior precisa ser a responsabilidade com a explicação que oferece.
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
  { title: 'O que aconteceu', subtitle: 'fato / acontecimento' },
  { title: 'O que foi relatado', subtitle: 'relato da pessoa' },
  { title: 'O que foi interpretado', subtitle: 'sentido atribuído' },
  { title: 'O que é opinião', subtitle: 'leitura pessoal' },
  { title: 'O que ainda precisa ser compreendido', subtitle: 'lacunas e hipóteses' },
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
                <span className="flex h-8 w-8 items-center justify-center text-[11px] font-bold tabular-nums tracking-widest text-lime sm:h-9 sm:w-9 sm:text-xs">
                  0{i + 1}
                </span>
                {!isLast && (
                  <span className="w-px flex-1 bg-cream/15" aria-hidden="true" />
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
            E é aqui que <span className="font-bold">uma atuação profissional</span> começa a se
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
          <p className="mt-8 text-[1.05rem] leading-relaxed text-white/70 sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
            Porque duas pessoas podem apresentar um comportamento parecido e estar respondendo a
            situações completamente diferentes.{' '}
            <span className="font-bold text-white">
              O comportamento pode ser semelhante. A leitura não pode ser automática.
            </span>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

const LEVEL_UP_ITEMS = [
  'Aprender a olhar uma situação antes de encaixá-la em uma resposta',
  'Organizar as informações.',
  'Perceber o que já pode ser afirmado.',
  'Reconhecer o que ainda é apenas uma possibilidade.',
  'Fazer perguntas que tragam informação nova, em vez de apenas confirmar uma ideia anterior.',
]

/* ─── Bloco 6: subir de nível ─── */
export function LevelUpReadingSection() {
  return (
    <section className="bg-white px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[22rem] flex-col items-center text-center sm:max-w-xl lg:max-w-3xl">
        <FadeIn>
          <SectionEyebrow variant="light" className="text-[13px] tracking-[0.2em] text-dark sm:text-sm">
            Por isso
          </SectionEyebrow>
        </FadeIn>

        <FadeIn delay={0.06}>
          <h2 className="mt-5 text-[1.55rem] font-normal leading-[1.25] tracking-tight text-dark sm:mt-6 sm:text-[1.9rem] lg:max-w-2xl lg:text-[2.35rem] lg:leading-[1.22]">
            Subir de nível <span className="font-bold">não significa</span> simplesmente encontrar
            explicações mais sofisticadas.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-6 text-[1.05rem] leading-relaxed text-dark/55 sm:mt-7 sm:text-lg lg:text-xl">
            É aprender a olhar e ler uma situação com mais precisão antes de encaixá-la em uma
            resposta. Mas sim:
          </p>
        </FadeIn>

        <ul className="mt-8 w-full space-y-2.5 text-left sm:mt-10 sm:space-y-3">
          {LEVEL_UP_ITEMS.map((item, i) => (
            <FadeIn key={item} delay={0.14 + i * 0.05}>
              <li className="flex items-start gap-3 rounded-md border border-dark/10 bg-dark/[0.04] px-4 py-3.5 sm:gap-3.5 sm:px-5 sm:py-4">
                <span className="mt-0.5 text-base font-bold leading-none text-dark" aria-hidden="true">
                  ✓
                </span>
                <span className="text-[1.02rem] leading-snug text-dark sm:text-lg">{item}</span>
              </li>
            </FadeIn>
          ))}
        </ul>

        <FadeIn delay={0.42}>
          <p className="mt-8 text-[1.05rem] leading-relaxed text-dark sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
            É isso que{' '}
            <span className="font-bold">transforma repertório em capacidade de leitura e atuação.</span>
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

function PeakInsightCard({
  title,
  description,
  icon: Icon,
}: {
  title: string
  description: string
  icon: LucideIcon
}) {
  return (
    <div className="group h-full rounded-md p-px bg-gradient-to-b from-[#988D49]/60 to-[#988D49]/20 transition-all duration-300 ease-out hover:-translate-y-1 hover:from-[#988D49]/95 hover:to-[#988D49]/45 hover:shadow-[0_14px_36px_rgba(152,141,73,0.28)]">
      <div className="flex h-full flex-row items-start gap-3.5 rounded-[5px] bg-dark px-4 py-4 text-left transition-colors duration-300 group-hover:bg-[#252520] sm:flex-col sm:gap-3 sm:px-5 sm:py-6">
        <Icon
          size={24}
          className="mt-0.5 shrink-0 text-cream transition-all duration-300 group-hover:scale-110 group-hover:text-[#F8F0DF] sm:mt-0"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <div className="min-w-0 flex flex-col gap-1 sm:gap-3">
          <p className="text-cream font-bold text-base sm:text-lg leading-snug transition-colors duration-300 group-hover:text-white">
            {title}
          </p>
          <p className="text-cream/75 text-sm sm:text-base leading-relaxed transition-colors duration-300 group-hover:text-cream/90">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

const METHOD_OUTCOME_CARDS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Um novo olhar',
    description: 'Para entender como as pessoas agem.',
    icon: Eye,
  },
  {
    title: 'Perguntas que estalam',
    description: 'Fazer perguntas que trazem clareza e estalam a mente rápido.',
    icon: MessageCircleQuestion,
  },
  {
    title: 'Padrões no ponto cego',
    description: 'Enxergar o que costuma ficar escondido.',
    icon: Layers,
  },
  {
    title: 'Observar e investigar',
    description: 'Ficar muito mais afiada na hora de ler pessoas e situações.',
    icon: Search,
  },
  {
    title: 'Salto de qualidade',
    description: 'Em atendimentos, mentorias, liderança, aulas e treinos.',
    icon: GraduationCap,
  },
]

/* ─── Bloco 7: nasceu o Efeito Alta Permissão ─── */
export function MethodIntroSection({ onCtaClick }: SectionProps) {
  return (
    <section className="bg-dark px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-28">
      <div className="mx-auto flex w-full max-w-[22rem] flex-col items-center text-center sm:max-w-xl lg:max-w-5xl">
        <FadeIn>
          <h2 className="text-[1.55rem] font-bold leading-[1.25] tracking-tight text-white sm:text-[1.9rem] lg:max-w-2xl lg:text-[2.35rem] lg:leading-[1.22]">
            Foi para desenvolver esse olhar que nasceu o Efeito Alta Permissão.
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="mt-8 max-w-3xl text-[1.05rem] leading-relaxed text-white/60 sm:mt-10 sm:text-lg lg:text-xl lg:leading-relaxed">
            Um treinamento introdutório ao Método APS para profissionais que trabalham com pessoas e
            querem ampliar a forma como compreendem comportamentos, histórias e padrões.
          </p>
        </FadeIn>

        <div className="mt-10 grid w-full grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
          {METHOD_OUTCOME_CARDS.map((item, i) => (
            <FadeIn key={item.title} delay={0.14 + i * 0.05} className="h-full">
              <PeakInsightCard
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            </FadeIn>
          ))}

          <FadeIn delay={0.4} className="h-full">
            <div
              className="flex h-full min-h-[7.5rem] items-center justify-center rounded-md border border-dashed border-[#988D49]/35 bg-dark px-4 py-4 sm:min-h-full"
              aria-hidden="true"
            />
          </FadeIn>
        </div>

        {onCtaClick && (
          <FadeIn delay={0.45} className="mt-10 w-full sm:mt-12 sm:flex sm:justify-center">
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
