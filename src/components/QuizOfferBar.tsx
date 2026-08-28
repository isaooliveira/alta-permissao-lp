export function QuizOfferBar({ className = '' }: { className?: string }) {
  return (
    <div
      className={`inline-flex max-w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full border border-white/12 bg-[#141414] px-3.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-cream/85 sm:gap-x-3 sm:px-4 sm:text-[10px] ${className}`}
    >
      <span className="flex items-center gap-2">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-lime shadow-[0_0_8px_rgba(209,255,3,0.9)]" />
        </span>
        Oportunidade
      </span>
      <span className="text-white/25" aria-hidden="true">
        |
      </span>
      <span>apenas nessa página</span>
    </div>
  )
}
