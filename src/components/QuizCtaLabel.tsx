import { QUIZ_VIP_COMPARE } from '@/hooks/useLot'

export function QuizCtaLabel({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex flex-col items-center justify-center leading-none">
      <span>Pegar meu ingresso</span>
      <span
        className={`mt-1 font-semibold normal-case tracking-normal ${
          compact ? 'text-[9px]' : 'text-[11px] sm:text-xs'
        }`}
      >
        De <s className="opacity-55">R${QUIZ_VIP_COMPARE}</s> por R$127
      </span>
    </span>
  )
}
