import { useReducedMotion } from 'framer-motion'
import { FadeIn } from './FadeIn'

const TESTIMONIALS = [
  {
    src: `${import.meta.env.BASE_URL}depoimento_eap_camila.webp`,
    alt: 'Depoimento de Camila sobre a primeira edição',
    width: 847,
    height: 1600,
  },
  {
    src: `${import.meta.env.BASE_URL}depoimento_eap_laisa.webp`,
    alt: 'Depoimento de Laísa sobre a primeira edição',
    width: 910,
    height: 1092,
  },
] as const

const SEQUENCE = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS]
const TRACK = [...SEQUENCE, ...SEQUENCE]

function TestimonialSlide({
  src,
  alt,
  width,
  height,
  decorative,
}: {
  src: string
  alt: string
  width: number
  height: number
  decorative?: boolean
}) {
  return (
    <figure className="shrink-0">
      <img
        src={src}
        alt={decorative ? '' : alt}
        width={width}
        height={height}
        draggable={false}
        className="h-[22rem] w-auto rounded-md object-contain shadow-[0_18px_40px_-18px_rgba(32,32,32,0.35)] sm:h-[26rem] lg:h-[30rem]"
      />
    </figure>
  )
}

export function FirstEditionSection() {
  const reduceMotion = useReducedMotion()

  const fadeMask = {
    maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
    WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
  }

  return (
    <section className="overflow-hidden bg-cream py-16 sm:py-20 lg:py-24">
      <FadeIn>
        <h2 className="text-section px-5 text-center text-dark">
          Como foi a <span className="font-serif italic">primeira edição</span>
        </h2>
      </FadeIn>

      <div className="mt-10 sm:mt-12" style={fadeMask}>
        {reduceMotion ? (
          <div className="flex justify-center gap-4 overflow-x-auto px-5 pb-2">
            {TESTIMONIALS.map((item) => (
              <TestimonialSlide key={item.src} {...item} />
            ))}
          </div>
        ) : (
          <div className="testimonial-marquee-track flex w-max items-end gap-4 pr-4 sm:gap-5 sm:pr-5">
            {TRACK.map((item, i) => (
              <TestimonialSlide
                key={`${item.src}-${i}`}
                {...item}
                decorative={i >= TESTIMONIALS.length}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
