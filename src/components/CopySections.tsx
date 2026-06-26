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
  Gift,
  type LucideIcon,
} from 'lucide-react'
import { FadeIn } from './FadeIn'
import { Button } from './Button'
import { SectionEyebrow } from './SectionEyebrow'
import tornPaperDown from '@/assets/torn-paper-down.svg'
import sonhosImg from '@/assets/sonhos.webp'

const HISTORIA_IMAGE_SRC = `${import.meta.env.BASE_URL}foto-historia.webp`
const HISTORIA_MOBILE_IMAGE_SRC = `${import.meta.env.BASE_URL}foto-historia-mobile.webp`
const BONUS_IMAGE_SRC = `${import.meta.env.BASE_URL}talita-bonus.webp`

interface SectionProps {
  onCtaClick?: () => void
}

const PROBLEM_INSIGHTS = [
  'Se você não consegue vender, por exemplo, a solução mais óbvia parece ser estudar mais sobre o assunto. Mas, quando o seu inconsciente descobre que algo nesse desejo pode te ameaçar, você recua com todas as desculpas possíveis.',
  'Você quer investir para reter mais dinheiro, mas, quando percebe que ter muito dinheiro pode significar reviver algum perigo ancestral, uma emergência mágica acontece para esvaziar o seu caixa.',
  'Você deseja um número maior de clientes, mas, só de pensar em não entregar o melhor ou em receber uma avaliação ruim, você simplesmente já programa uma maneira de desistir ou mudar de profissão.',
]


/* ─── Section 1: Problema — o elástico ─── */
export function ProblemSection() {
  return (
    <section className="relative">
      <div className="bg-white px-4 py-16 sm:py-20">
        <div className="container-wide">
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
            <div className="mx-auto max-w-2xl space-y-5 text-dark/70 text-lead">
              <p>
                Você estuda muito, faz terapia, mentorias de negócios, cursos e segue estratégias.
                O pacote completo.{' '}
                <span className="italic text-dark">
                  Mas, no fundo, parece que tem uma chave que não vira nunca e um limite que você
                  não consegue ultrapassar.
                </span>
              </p>
              <p>
                O próximo nível financeiro parece logo ali. Só que, na prática, os mesmos
                comportamentos repetitivos continuam aparecendo. O dinheiro entra e você dá um
                "jeito" de sumir com ele. O projeto fica no rascunho. A procrastinação
                sempre vence e você continua na roda dos ratos. Tudo isso sem nenhuma explicação
                lógica.
              </p>
              <p className="text-dark font-semibold">
                E sabe o que é pior? Ninguém, de forma consciente, "recusa" ter
                prosperidade, ainda mais vindo de um lugar difícil. Mas é exatamente isso que você
                faz quando se aproxima da experiência daquilo que você mais quer:
              </p>
            </div>
          </FadeIn>

          <div className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-3">
            {PROBLEM_INSIGHTS.map((item, i) => (
              <FadeIn key={item} delay={0.28 + i * 0.08}>
                <PatternBox text={item} variant="light" />
              </FadeIn>
            ))}
          </div>
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
            <Button size="lg" onClick={onCtaClick} showTicket className="whitespace-nowrap">
              Quero esse conhecimento
            </Button>
          </FadeIn>
        )}
      </div>
    </section>
  )
}

/* ─── Section 2b: Modelos operacionais internos ─── */
function OperationalModelsContent() {
  return (
    <>
      <h2 className="text-section mb-6 text-left font-light leading-[1.18] text-white">
        Tudo isso acontece porque os primeiros vínculos familiares moldam os chamados "Modelos
        Operacionais Internos", que automatizam as suas respostas ao dinheiro e à segurança.
      </h2>

      <div className="space-y-5 text-left">
        <p className="text-lead text-cream-muted">
          Investigar o passado de forma correta não serve para buscar culpados, mas sim para
          compreender esses comportamentos automáticos. É isso que possibilita mudanças reais,
          movendo o seu sistema nervoso do modo de sobrevivência para o modo de ação.
        </p>
        <p className="text-lead font-semibold text-cream">
          A mudança real ocorre quando você entende os motivos de repetir comportamentos
          indesejados, e não apenas quando descobre o que fazer.
        </p>
      </div>
    </>
  )
}

export function OperationalModelsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-dark">
      {/* Mobile: texto + imagem em quadro */}
      <div className="flex flex-col lg:hidden">
        <FadeIn delay={0.1}>
          <div className="px-5 py-12 sm:px-8">
            <OperationalModelsContent />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="px-5 pb-12 sm:px-8">
            <div className="overflow-hidden rounded-md border border-cream/10">
              <img
                src={HISTORIA_MOBILE_IMAGE_SRC}
                alt="Ilustração sobre vínculos familiares e modelos operacionais internos"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Desktop: imagem de fundo com texto sobreposto */}
      <FadeIn delay={0.1} className="hidden lg:block">
        <div className="relative aspect-[1920/1080] w-full">
          <div
            className="absolute inset-0 bg-cover bg-no-repeat bg-right bg-center"
            style={{ backgroundImage: `url(${HISTORIA_IMAGE_SRC})` }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-dark from-0% via-dark/88 via-[40%] to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 flex min-h-full flex-col justify-center px-12 py-16 xl:max-w-[46%] xl:px-16">
            <OperationalModelsContent />
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

function BonusHighlightCard() {
  return (
    <div className="overflow-hidden rounded-md border-2 border-accent-brand/35 bg-gradient-to-br from-accent-brand-light/50 via-white to-accent-brand-light/25 shadow-[0_12px_40px_rgba(154,104,72,0.12)]">
      <div className="flex flex-col lg:flex-row">
        <div className="relative lg:w-[42%] xl:w-[40%]">
          <img
            src={BONUS_IMAGE_SRC}
            alt="Talita Lopes no mini curso Permissão de Ser Vista"
            className="h-full min-h-[260px] w-full object-cover object-[50%_20%] sm:min-h-[320px] lg:min-h-[420px]"
            loading="lazy"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-dark/25 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-dark/10"
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-4 px-6 py-7 sm:px-8 sm:py-9">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-brand/25 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-accent-brand">
              <Gift size={12} strokeWidth={2.5} aria-hidden="true" />
              Bônus
            </span>
            <span className="inline-flex rounded-full bg-lime px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-dark">
              Presente
            </span>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent-brand">
              Mini Curso
            </p>
            <h3 className="mt-1 text-2xl font-semibold leading-tight text-dark sm:text-[1.75rem]">
              Permissão de Ser Vista
            </h3>
            <p className="mt-2 text-base font-semibold text-dark/75">
              Com Talita Lopes ao vivo
            </p>
          </div>

          <p className="text-base leading-relaxed text-dark/70">
            “A Permissão de Ser Vista” é um mini curso exclusivo que une técnica de oratória com
            trabalho emocional pra você entender o que trava a sua presença na câmera, nomear
            isso, e desenvolver a coragem de aparecer no digital com a autoridade que a sua
            profissão já tem.
          </p>
        </div>
      </div>
    </div>
  )
}

function DeliverableCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-dark/15 bg-white/80 h-full px-5 py-5 rounded-[6px] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
      <p className="text-dark font-black text-base leading-snug tracking-wide mb-4 pb-3 border-b border-dark/10">{title}</p>
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
            <h2 className="text-section text-dark text-center mb-3">
              O que você vai receber no dia
            </h2>
          </FadeIn>

          <FadeIn delay={0.06}>
            <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-dark/65 sm:text-lg">
              Uma única experiência desenhada para duas realidades perfeitamente integradas:
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <FadeIn delay={0.1} className="h-full">
              <DeliverableCard
                title="Se você quer aplicar na sua vida e carreira:"
                items={forSelf}
              />
            </FadeIn>
            <FadeIn delay={0.2} className="h-full">
              <DeliverableCard
                title="Se você trabalha com pessoas (terapeutas, mentoras, líderes e coaches):"
                items={forWork}
              />
            </FadeIn>
          </div>

          <FadeIn delay={0.3}>
            <p className="text-dark text-center text-lead font-semibold mt-12 leading-relaxed max-w-xl mx-auto">
              Você não precisa ser terapeuta para viver este dia. A transformação acontece na pele
              de quem trabalha em qualquer área. Mas, se você conduz pessoas, sairá com uma
              ferramenta pronta para aplicar e faturar logo na segunda-feira seguinte.
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
                  Documentação oficial de conclusão do treinamento Método APS.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="mx-auto mt-14 max-w-4xl">
              <div className="mb-6 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent-brand">
                  Presente + bônus
                </p>
                <h3 className="text-section mt-2 text-dark">
                  Tem mais uma coisinha incluída
                </h3>
              </div>
              <BonusHighlightCard />
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
      'você consegue avançar para o próximo nível financeiro e para de criar despesas ou problemas do nada para queimar dinheiro.',
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
      'Você passa a apresentar o seu preço com firmeza, consegue se posicionar para cobrar mais, elimina os descontos por insegurança e não sente mais necessidade de ficar se justificando.',
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
          <h2 className="text-section text-white text-center mb-3">
            O que muda na prática
          </h2>
          <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-cream-muted sm:text-lg">
            Dominando o método, você resgata a sua autoconfiança, segurança, ousadia e uma
            profunda sensação de leveza, capacidade e coragem. Na prática, você para de:
          </p>
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
