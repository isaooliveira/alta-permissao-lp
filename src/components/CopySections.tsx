import {
  Award,
  Check,
  X,
  ArrowUpFromLine,
  Feather,
  Rocket,
  Crown,
  Anchor,
  UserRound,
  ScanEye,
  Circle,
  type LucideIcon,
} from 'lucide-react'
import { FadeIn } from './FadeIn'
import { Button } from './Button'
import { SectionEyebrow } from './SectionEyebrow'
import tornPaperDown from '@/assets/torn-paper-down.svg'
import sonhosImg from '@/assets/sonhos.webp'

interface SectionProps {
  onCtaClick?: () => void
}


/* ─── Section 1: Problema — o elástico ─── */
export function ProblemSection() {
  return (
    <section className="relative">
      <div className="bg-white px-4 py-16 sm:py-20">
        <div className="container-narrow">
          <FadeIn>
            <SectionEyebrow variant="light" className="mb-6">
              Existem aprendizados que apenas informam
            </SectionEyebrow>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-section text-dark text-center mb-8">
              E existem aprendizados que{' '}
              <span className="text-accent-warm">mudam tudo:</span>{' '}
              o olhar sobre si mesma, sobre os outros e sobre o que é possível
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="space-y-5 text-dark/70 text-lead">
              <p>
                Dá para estudar muito, fazer terapia, mentorias, cursos e retiros. O pacote
                completo. Mas no fundo, parece que tem uma chave que simplesmente não vira.
              </p>
              <p>
                A teoria já está clara e o próximo nível parece logo ali. Só que, na prática,{' '}
                <strong className="text-dark">velhas escolhas continuam travando o processo.</strong>{' '}
                O potencial está ali, mas o comportamento ainda é de se encolher em certas
                situações, sem explicação aparente.
              </p>
              <p className="text-dark font-semibold text-xl">
                É a sensação de estar perto de algo maior, mas com um elástico que sempre
                puxa de volta para o mesmo ponto.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>

      <img
        src={tornPaperDown}
        alt=""
        aria-hidden="true"
        className="block w-full h-auto"
        draggable={false}
      />
    </section>
  )
}

function PatternBox({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4 border border-red/50 bg-red/5 px-4 py-3.5 transition-colors duration-200 hover:bg-red/10 hover:border-red/70">
      <span className="flex-shrink-0 w-5 h-5 border border-red/80 flex items-center justify-center">
        <X size={11} className="text-red" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <span className="text-cream/90 text-base leading-snug">{text}</span>
    </div>
  )
}

/* ─── Section 2: Diagnóstico — padrões nos bastidores ─── */
export function DiagnosisSection() {
  const patterns = [
    'A grana que você se permite ganhar',
    'Os relacionamentos que aceita tolerar',
    'A imagem que vê no espelho',
    'A coragem de colocar a cara no mundo',
    'O papel que assume na sociedade',
    'As oportunidades que chegam para você',
  ]

  return (
    <section className="section-padding pt-20 pb-28 bg-dark">
      <div className="container-wide">
        <FadeIn>
          <h2 className="text-section text-white text-center mb-6">
            O comportamento humano quase nunca muda
            <br />
            <span className="text-red font-semibold">só porque a teoria está na cabeça.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="text-cream-muted text-lead mb-10 text-center max-w-2xl mx-auto">
            Existem padrões antigos rodando nos bastidores e ditando as regras.
            <br />
            <strong className="text-cream">Eles controlam:</strong>
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
          {patterns.map((item, i) => (
            <FadeIn key={item} delay={0.15 + i * 0.06}>
              <PatternBox text={item} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.8}>
          <p className="text-cream font-semibold text-xl text-center leading-relaxed max-w-3xl mx-auto">
            Enquanto esses gatilhos continuarem no ponto cego, você pode ter a teoria
            perfeita na cabeça, mas vai continuar presa a uma rotina que já não combina
            com quem você é hoje.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Section 3: Solução — Alta Permissão Sistêmica ─── */
export function SolutionSection() {
  return (
    <section className="relative pt-0 pb-0 bg-dark">
      {/* Mobile: largura total | Web: mesma largura dos demais blocos (container-narrow) */}
      <div className="w-full sm:max-w-2xl sm:mx-auto sm:px-4">
        <FadeIn delay={0.1}>
          <div
            className="relative z-10 -mt-20 sm:-mt-24 w-full bg-solution-cream px-6 sm:px-12 pt-14 sm:pt-18 pb-10 sm:pb-12"
            style={{ borderRadius: '9999px 9999px 0 0' }}
          >
            <p className="text-dark/60 text-sm font-semibold text-center mb-2 sm:mb-3">
              E a solução
            </p>

            <h2 className="text-display text-center mb-3 sm:mb-4 leading-none">
              <span className="text-accent-brand">Alta</span>{' '}
              <span className="text-dark">Permissão</span>
              <br />
              <span className="text-dark">Sistêmica</span>
            </h2>

            <p className="text-dark text-lead text-center max-w-xl mx-auto">
              A Alta Permissão Sistêmica é um{' '}
              <strong>modelo de compreensão humana</strong> que investiga{' '}
              <strong>por que uma pessoa continua se limitando</strong> mesmo quando já possui
              consciência, conhecimento e desejo de viver diferente.
            </p>

            <div className="mt-8 w-full">
              <img
                src={sonhosImg}
                alt="Ilustração sobre sonhos e permissão sistêmica"
                className="w-full h-auto object-contain rounded-md"
              />
            </div>

            <p className="text-dark font-semibold text-lg text-center mt-8 leading-relaxed">
              Ela parte de uma premissa simples:
            </p>
            <p className="text-dark text-xl font-semibold text-center mt-3 leading-tight">
              "Tudo aquilo que você não está disposta a ser, parecer ou receber
              continua exercendo influência sobre as suas decisões."
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

/* ─── Section 3b: Lógica por trás dos limites ─── */
export function LogicRevealSection({ onCtaClick }: SectionProps) {
  return (
    <section className="section-padding bg-dark">
      <div className="container-narrow">
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-[8px] px-6 sm:px-8 py-8 sm:py-10 mb-12 text-center">
            <p className="text-[clamp(1.45rem,3.5vw,2.1rem)] font-light text-dark leading-tight">
              Existe uma lógica por trás dos seus{' '}
              <span className="font-semibold">limites</span>.
            </p>
            <p className="text-dark/70 text-lead mt-3 max-w-xl mx-auto">
              E quando essa lógica se torna visível, fica difícil continuar enxergando a si
              mesma, as pessoas e a vida exatamente da mesma forma.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="text-center">
            <p className="font-semibold text-white/70 text-lead leading-tight mb-2">
              E o mais importante:
            </p>
            <p className="text-[clamp(1.5rem,3.8vw,2.15rem)] font-light text-white leading-[1.3]">
              na maioria das vezes,<br />
              <span
                className="text-cream font-semibold"
                style={{ textShadow: '0 0 40px rgba(236, 215, 184, 0.3)' }}
              >
                não tem nada de errado com você.
              </span>
            </p>
            <p className="text-cream-muted text-lead mt-4">
              Apenas padrões antigos gerando resultados velhos.
            </p>
          </div>
        </FadeIn>

        {onCtaClick && (
          <FadeIn delay={0.3} className="flex justify-center mt-12">
            <Button size="lg" onClick={onCtaClick} showTicket className="whitespace-nowrap">
              Quero esse conhecimento
            </Button>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

function DeliverableCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-dark/15 bg-white/80 h-full px-5 py-5 rounded-[6px] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
      <p className="text-dark font-black text-base uppercase tracking-wide mb-4 pb-3 border-b border-dark/10">{title}</p>
      <ul>
        {items.map((item, i) => (
          <li key={item}>
            <div className="flex items-start gap-3 py-2.5">
              <Check
                size={16}
                className="text-accent-brand flex-shrink-0 mt-0.5"
                strokeWidth={2.5}
                aria-hidden="true"
              />
              <span className="text-dark/80 text-base leading-snug">{item}</span>
            </div>
            {i < items.length - 1 && (
              <div className="flex gap-3" aria-hidden="true">
                <Check size={16} className="opacity-0 flex-shrink-0" />
                <div className="flex-1 h-px bg-dark/8" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ─── Section 4: Entregas — O que você vai aprender ─── */
export function DeliverablesSection() {
  const forSelf = [
    'Entender por que você continua repetindo os mesmos erros',
    'Ganhar clareza real sobre as suas decisões e limites',
    'Saber por que algumas mudanças não duram muito tempo',
    'Olhar para a sua vida e para as suas relações com outros olhos',
    'Abrir espaço para escolhas que realmente façam sentido',
  ]

  const forWork = [
    'Um novo olhar para entender como as pessoas agem',
    'Fazer perguntas que trazem clareza e estalam a mente rápido',
    'Enxergar padrões que costumam ficar escondidos no ponto cego',
    'Ficar muito mais afiada na hora de observar e investigar',
    'Dar um salto de qualidade em atendimentos, mentorias, liderança, aulas e treinos',
  ]

  return (
    <section className="relative">
      <div className="bg-white px-4 py-20">
        <div className="container-wide">
          <FadeIn>
            <h2 className="text-section text-dark text-center mb-12">
              Neste dia, você vai
            </h2>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <FadeIn delay={0.1} className="h-full">
              <DeliverableCard title="Para si mesma" items={forSelf} />
            </FadeIn>
            <FadeIn delay={0.2} className="h-full">
              <DeliverableCard title="Para quem trabalha com pessoas" items={forWork} />
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <p className="text-dark text-center text-lead font-semibold mt-12 leading-relaxed max-w-xl mx-auto">
              Você não precisa ser terapeuta para aprender Alta Permissão Sistêmica. Mas se o
              seu trabalho envolve pessoas em qualquer nível que seja, vai ser difícil sair desse dia olhando para o
              comportamento humano do mesmo jeito.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 max-w-xl mx-auto border-l-4 border-lime bg-dark/[0.03] flex items-start gap-5 px-6 py-5">
              <div className="flex-shrink-0 w-10 h-10 bg-lime flex items-center justify-center">
                <Award size={20} className="text-dark" strokeWidth={2} aria-hidden="true" />
              </div>
              <div>
                <p className="text-dark font-black text-sm uppercase tracking-wide mb-1">
                  Certificado de Participação
                </p>
                <p className="text-dark/65 text-base leading-snug">
                  Documentação válida para portfólio e horas complementares.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <img
        src={tornPaperDown}
        alt=""
        aria-hidden="true"
        className="block w-full h-auto"
        draggable={false}
      />
    </section>
  )
}

/* ─── Section 5: Aplicando no dia a dia — insights ─── */
const PEAK_INSIGHTS: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Romper o teto invisível',
    description:
      'você consegue avançar para o próximo nível financeiro e profissional sem criar um autoboicote logo em seguida.',
    icon: ArrowUpFromLine,
  },
  {
    title: 'Agir sem peso na consciência',
    description:
      'você toma decisões difíceis e estabelece limites claros sem carregar uma culpa esmagadora depois.',
    icon: Feather,
  },
  {
    title: 'Parar de se adiar',
    description:
      'você coloca seus projetos no mundo e se expõe sem precisar da validação ou da aprovação de terceiros.',
    icon: Rocket,
  },
  {
    title: 'Ocupar o seu real tamanho',
    description:
      'você assume cargos, valores e espaços maiores sem se sentir uma fraude ou pedir desculpas por isso.',
    icon: Crown,
  },
  {
    title: 'Sustentar o próprio sucesso',
    description:
      'você aprende a receber e manter o que é bom sem criar crises para voltar ao padrão antigo.',
    icon: Anchor,
  },
  {
    title: 'Sair do papel de salvadora',
    description:
      'você deixa de carregar a responsabilidade pelos problemas dos outros e foca na sua própria vida.',
    icon: UserRound,
  },
  {
    title: 'Olhar clínico para pessoas',
    description:
      'você decifra a lógica por trás dos travamentos humanos, sabendo exatamente onde intervir e o que perguntar.',
    icon: ScanEye,
  },
  {
    title: 'Viver em neutralidade',
    description:
      'as opiniões alheias e os imprevistos perdem o poder de desestabilizar o seu estado emocional e suas escolhas.',
    icon: Circle,
  },
]

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
      <div className="h-full rounded-[5px] bg-dark px-4 sm:px-5 py-5 sm:py-6 flex flex-col gap-3 transition-colors duration-300 group-hover:bg-[#252520]">
        <Icon
          size={24}
          className="text-cream shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:text-[#ECD7B8]"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <p className="text-cream font-bold text-base sm:text-lg leading-snug transition-colors duration-300 group-hover:text-white">
          {title}
        </p>
        <p className="text-cream/75 text-sm sm:text-base leading-relaxed transition-colors duration-300 group-hover:text-cream/90">
          {description}
        </p>
      </div>
    </div>
  )
}

export function DailyInsightsSection() {
  return (
    <section className="section-padding bg-dark">
      <div className="container-narrow">
        <FadeIn delay={0.1}>
          <p className="text-cream-muted text-sm font-semibold text-center mb-4">
            E aqui está o detalhe mais importante:
          </p>
          <h2 className="text-section text-white text-center mb-10">
            Aplicando a{' '}
            <span className="font-semibold">Alta Permissão Sistêmica</span> diariamente você vai:
          </h2>
        </FadeIn>
      </div>

      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-3 lg:gap-4">
          {PEAK_INSIGHTS.map((item, i) => (
            <FadeIn key={item.title} delay={0.15 + i * 0.06} className="h-full">
              <PeakInsightCard
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
