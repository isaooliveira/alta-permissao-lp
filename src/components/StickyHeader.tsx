import { useLot } from '@/hooks/useLot'
import { useEventStatus } from '@/hooks/useEventStatus'
import { Button } from './Button'
import { LotCountdown } from './LotCountdown'

interface StickyHeaderProps {
  onCtaClick: () => void
}

export function StickyHeader({ onCtaClick }: StickyHeaderProps) {
  const { currentLot } = useLot()
  const { eventPast } = useEventStatus()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 hidden bg-dark/95 border-b border-cream/8 backdrop-blur-md lg:block">
      <div className="px-4 py-2.5">
        {eventPast ? (
          <div className="container-narrow mx-auto flex justify-center">
            <Button
              size="sm"
              onClick={onCtaClick}
              className="whitespace-nowrap text-xs px-3 py-1.5 tracking-wide sm:text-sm sm:px-4 sm:py-2"
            >
              Garanta sua vaga mesmo
            </Button>
          </div>
        ) : (
          <div className="container-narrow lg:max-w-6xl mx-auto flex items-center justify-between gap-3 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3 lg:flex-none">
              <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-red border border-red/50 px-2 py-0.5">
                {currentLot.label}
              </span>
              <span className="shrink-0 text-cream font-black text-base sm:text-xl whitespace-nowrap">
                {currentLot.priceFormatted}
              </span>
              <LotCountdown
                endDate={currentLot.endDate}
                variant="compact"
                className="hidden min-[400px]:inline min-w-0 truncate"
              />
            </div>

            <div className="shrink-0 lg:justify-self-end">
              <Button
                size="sm"
                onClick={onCtaClick}
                className="whitespace-nowrap text-xs px-3 py-1.5 tracking-wide sm:text-sm sm:px-4 sm:py-2"
              >
                Garanta sua vaga
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
