import { useReducedMotion } from 'framer-motion'
import { Diamond, Zap } from 'lucide-react'
import { useEventStatus } from '@/hooks/useEventStatus'
import { MARQUEE_ITEMS_LIVE, MARQUEE_ITEMS_POST_EVENT } from '@/lib/eventContent'

function Separator({ type }: { type: 'diamond' | 'zap' }) {
  if (type === 'zap') {
    return <Zap size={13} fill="currentColor" className="text-dark/50 flex-shrink-0" aria-hidden="true" />
  }
  return <Diamond size={11} fill="currentColor" className="text-dark/35 flex-shrink-0" aria-hidden="true" />
}

export function MarqueeBanner() {
  const reduceMotion = useReducedMotion()
  const { eventPast } = useEventStatus()
  const items = eventPast ? MARQUEE_ITEMS_POST_EVENT : MARQUEE_ITEMS_LIVE

  // Repeat enough to fill wide screens and loop seamlessly
  const track = [...items, ...items, ...items, ...items]

  return (
    <div className="overflow-hidden bg-cream border-y border-dark/10 py-3" aria-hidden="true">
      <div
        className="flex whitespace-nowrap"
        style={
          reduceMotion
            ? undefined
            : { animation: 'marquee 22s linear infinite' }
        }
      >
        {track.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 px-7">
            <Separator type={item.icon} />
            <span className="text-dark font-black text-xs uppercase tracking-[0.25em]">
              {item.text}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
