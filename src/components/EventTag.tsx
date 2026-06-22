import { Calendar, Clock } from 'lucide-react'

export function EventTag({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex items-stretch rounded-md overflow-hidden shrink-0 shadow-[0_2px_12px_rgba(0,0,0,0.25)] ${className}`}
    >
      <div className="flex items-center gap-2 bg-accent-brand-light px-3 sm:px-4 py-2 sm:py-2.5">
        <span className="w-2 h-2 rounded-full bg-red animate-pulse shrink-0" aria-hidden="true" />
        <span className="text-dark font-bold text-[10px] sm:text-xs uppercase tracking-wide whitespace-nowrap">
          Ao Vivo
        </span>
      </div>

      <div className="flex items-stretch bg-white text-dark">
        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-r border-dark/10">
          <Calendar size={15} className="text-accent-brand shrink-0" strokeWidth={2} aria-hidden="true" />
          <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wide whitespace-nowrap">
            11 de Julho
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5">
          <Clock size={15} className="text-accent-brand shrink-0" strokeWidth={2} aria-hidden="true" />
          <span className="font-bold text-[10px] sm:text-xs uppercase tracking-wide whitespace-nowrap">
            Às 09h
          </span>
        </div>
      </div>
    </div>
  )
}
