import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { AnimatePresence, motion } from 'framer-motion'
import { Play, X } from 'lucide-react'
import { FadeIn } from './FadeIn'

const TESTIMONIALS = [
  { name: 'Ju Garcia', videoId: '5Vj0HSzbLig', isShort: false },
  { name: 'Suenny Bezerra', videoId: 'WXXEypdOjfg', isShort: false },
  { name: 'Valéria Cunha', videoId: 'jsdwwn-ya7s', isShort: false },
  { name: 'Gabriela Cruz', videoId: 'WeINlrFzNsM', isShort: false },
  { name: 'Rafaela dos Santos', videoId: 'c0fvmW8M6GI', isShort: false },
  { name: 'Shirlene Alves', videoId: 'ryGitk-LghM', isShort: true },
  { name: 'Marcela Giacon', videoId: '76KYP4bx-W0', isShort: true },
] as const

function youtubeEmbedUrl(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3`
}

function thumbnailUrl(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

function TestimonialCard({
  name,
  videoId,
  isShort,
  onPlay,
}: {
  name: string
  videoId: string
  isShort: boolean
  onPlay: () => void
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group flex w-full flex-col overflow-hidden rounded-md border border-dark/15 bg-dark/[0.03] text-left transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-brand"
      aria-label={`Assistir depoimento de ${name}`}
    >
      <div
        className={`relative w-full overflow-hidden bg-dark/10 ${
          isShort ? 'aspect-[9/16] max-h-[420px]' : 'aspect-video'
        }`}
      >
        <img
          src={thumbnailUrl(videoId)}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-dark/55 via-dark/15 to-dark/5"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cream/30 bg-dark/45 text-cream backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 group-hover:bg-dark/55">
            <Play size={22} fill="currentColor" className="ml-0.5" />
          </span>
        </span>
      </div>
      <div className="border-t border-dark/10 px-4 py-3.5">
        <p className="text-sm font-semibold leading-snug text-dark sm:text-base">{name}</p>
      </div>
    </button>
  )
}

function TestimonialVideoModal({
  open,
  onClose,
  name,
  videoId,
  isShort,
}: {
  open: boolean
  onClose: () => void
  name: string
  videoId: string
  isShort: boolean
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-dark/85 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 16 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className={`fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 ${
                  isShort ? 'max-w-[min(100%,22rem)]' : 'max-w-4xl'
                }`}
              >
                <div className="overflow-hidden rounded-md border border-cream/15 bg-dark shadow-2xl">
                  <div className="flex items-start justify-between gap-4 border-b border-cream/10 px-4 py-3 sm:px-5">
                    <Dialog.Title className="text-base font-semibold leading-snug text-cream sm:text-lg">
                      {name}
                    </Dialog.Title>
                    <Dialog.Close className="shrink-0 text-cream-muted transition-colors hover:text-cream">
                      <X size={20} />
                      <span className="sr-only">Fechar vídeo</span>
                    </Dialog.Close>
                  </div>
                  <div className={isShort ? 'aspect-[9/16] w-full' : 'aspect-video w-full'}>
                    <iframe
                      title={`Depoimento de ${name}`}
                      src={youtubeEmbedUrl(videoId)}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex !== null ? TESTIMONIALS[activeIndex] : null

  return (
    <section className="bg-white px-4 py-20">
      <div className="container-wide">
        <FadeIn>
          <h2 className="text-section mx-auto mb-3 max-w-4xl text-center text-dark">
            <span className="text-accent-warm">+5 mil mulheres</span> já passaram pelo Método APS.
          </h2>
        </FadeIn>

        <FadeIn delay={0.08}>
          <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-dark/65 sm:text-lg">
            O que acontece quando você{' '}
            <span className="font-semibold text-dark">expande a sua capacidade de reter</span>:
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {TESTIMONIALS.map((testimonial, i) => (
            <FadeIn key={testimonial.videoId} delay={0.12 + i * 0.05}>
              <TestimonialCard
                {...testimonial}
                onPlay={() => setActiveIndex(i)}
              />
            </FadeIn>
          ))}
        </div>
      </div>

      {active && (
        <TestimonialVideoModal
          open={activeIndex !== null}
          onClose={() => setActiveIndex(null)}
          name={active.name}
          videoId={active.videoId}
          isShort={active.isShort}
        />
      )}
    </section>
  )
}
