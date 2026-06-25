import { useCountdown } from '@/hooks/useLot'

interface LotCountdownProps {
  endDate: Date | null
  className?: string
  variant?: 'default' | 'compact' | 'card'
}

function Digit({
  value,
  label,
  size = 'default',
  accentClass = 'text-red',
}: {
  value: number
  label: string
  size?: 'default' | 'card'
  accentClass?: string
}) {
  const formatted = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className={`${accentClass} font-black tabular-nums leading-none ${
          size === 'card' ? 'text-xl sm:text-2xl' : ''
        }`}
        style={size === 'default' ? { fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' } : undefined}
      >
        {formatted}
      </span>
      <span
        className={`text-cream-muted uppercase tracking-widest ${
          size === 'card' ? 'text-[10px]' : 'text-xs'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

export function LotCountdown({ endDate, className = '', variant = 'default' }: LotCountdownProps) {
  const { days, hours, minutes, seconds, expired } = useCountdown(endDate)

  if (!endDate) return null

  if (variant === 'compact') {
    if (expired) return null

    const hh = String(hours).padStart(2, '0')
    const mm = String(minutes).padStart(2, '0')
    const ss = String(seconds).padStart(2, '0')

    return (
      <span
        className={`inline-flex items-center gap-1.5 whitespace-nowrap ${className}`}
        aria-label={`Lote acaba em ${days} dias, ${hh} horas, ${mm} minutos e ${ss} segundos`}
      >
        <span className="text-[10px] font-semibold uppercase tracking-wide text-cream-muted sm:text-xs">
          acaba em
        </span>
        <span className="tabular-nums text-xs font-black tracking-wide text-red sm:text-sm">
          {days}d {hh}:{mm}:{ss}
        </span>
      </span>
    )
  }

  if (variant === 'card') {
    if (expired) {
      return (
        <p className={`text-cream/30 text-xs uppercase tracking-widest text-center ${className}`}>
          Encerrado
        </p>
      )
    }

    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <p className="text-cream-muted text-[10px] sm:text-xs uppercase tracking-widest text-center">
          Encerra em
        </p>
        <div className="flex items-end gap-2 sm:gap-3">
          <Digit value={days} label="dias" size="card" accentClass="text-white" />
          <span className="text-white font-black text-lg leading-none pb-4">:</span>
          <Digit value={hours} label="hrs" size="card" accentClass="text-white" />
          <span className="text-white font-black text-lg leading-none pb-4">:</span>
          <Digit value={minutes} label="min" size="card" accentClass="text-white" />
          <span className="text-white font-black text-lg leading-none pb-4">:</span>
          <Digit value={seconds} label="seg" size="card" accentClass="text-white" />
        </div>
      </div>
    )
  }

  if (expired) return null

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <p className="text-cream-muted text-sm uppercase tracking-widest">
        Faltam para o próximo lote
      </p>
      <div className="flex items-end gap-4">
        <Digit value={days} label="dias" />
        <span className="text-red font-black text-2xl leading-none pb-4">:</span>
        <Digit value={hours} label="horas" />
        <span className="text-red font-black text-2xl leading-none pb-4">:</span>
        <Digit value={minutes} label="min" />
        <span className="text-red font-black text-2xl leading-none pb-4">:</span>
        <Digit value={seconds} label="seg" />
      </div>
    </div>
  )
}
