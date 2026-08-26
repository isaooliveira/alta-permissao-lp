import { useState } from 'react'
import { ScrollProgress } from './components/ScrollProgress'
import { StickyHeader } from './components/StickyHeader'
import { HeroSection } from './components/HeroSection'
import {
  ProblemSection,
  ProblemAmplificationSection,
  InterpretationConsequenceSection,
  ProfessionalDistinctionSection,
  LevelUpReadingSection,
  MethodIntroSection,
} from './components/CopySections'
import { TestimonialsSection } from './components/TestimonialsSection'
import { ScheduleSection } from './components/ScheduleSection'
import { AudienceSection } from './components/AudienceSection'
import { PricingSection } from './components/PricingSection'
import { MentorSection } from './components/MentorSection'
import { GuaranteeSection, GuaranteeAndFAQ } from './components/GuaranteeAndFAQ'
import { LeadModal } from './components/LeadModal'
import { MarqueeBanner } from './components/MarqueeBanner'
import { scrollToInvestimento } from '@/lib/scroll'
import { useEventStatus } from '@/hooks/useEventStatus'

const GRUPO_ALTA_LOGO_SRC = `${import.meta.env.BASE_URL}logo-altas.svg`

function Footer() {
  return (
    <footer className="border-t border-cream/10 px-6 py-12 sm:px-8 sm:py-14 lg:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 text-center sm:flex-row sm:items-center sm:text-left">
        <img
          src={GRUPO_ALTA_LOGO_SRC}
          alt="Grupo Alta"
          width={190}
          height={73}
          className="h-12 w-auto sm:h-14"
        />
        <p className="text-sm leading-relaxed text-cream/45 sm:text-right">
          © {new Date().getFullYear()} Todos os direitos reservados
          <br />
          Alta Co. | CNPJ: 66.525.966/0001-50
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const open = () => setModalOpen(true)
  const close = () => setModalOpen(false)
  const { eventPast } = useEventStatus()

  return (
    <>
      <ScrollProgress />
      <StickyHeader onCtaClick={scrollToInvestimento} />
      <main>
        <HeroSection onCtaClick={scrollToInvestimento} />
        <MarqueeBanner />
        <ProblemSection />
        <ProblemAmplificationSection />
        <InterpretationConsequenceSection onCtaClick={scrollToInvestimento} />
        <ProfessionalDistinctionSection />
        <LevelUpReadingSection />
        <MethodIntroSection onCtaClick={scrollToInvestimento} />
        <TestimonialsSection />
        {!eventPast && <ScheduleSection onCtaClick={scrollToInvestimento} />}
        <AudienceSection />
        <PricingSection onCtaClick={open} />
        <GuaranteeSection />
        <MentorSection />
        <GuaranteeAndFAQ />
      </main>
      <Footer />
      <LeadModal open={modalOpen} onClose={close} />
    </>
  )
}
