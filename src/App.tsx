import { useState } from 'react'
import { StickyHeader } from './components/StickyHeader'
import { HeroSection } from './components/HeroSection'
import {
  ProblemSection,
  DiagnosisSection,
  SolutionSection,
  LogicRevealSection,
  DeliverablesSection,
  DailyInsightsSection,
} from './components/CopySections'
import { ScheduleSection } from './components/ScheduleSection'
import { PricingSection } from './components/PricingSection'
import { MentorSection } from './components/MentorSection'
import { GuaranteeAndFAQ } from './components/GuaranteeAndFAQ'
import { LeadModal } from './components/LeadModal'
import { MarqueeBanner } from './components/MarqueeBanner'
import { scrollToInvestimento } from '@/lib/scroll'
import { useEventStatus } from '@/hooks/useEventStatus'

const LOGO_SRC = `${import.meta.env.BASE_URL}logo-alta.svg`

function Footer() {
  return (
    <footer className="py-10 px-4 border-t border-cream/10">
      <div className="container-narrow text-center">
        <img
          src={LOGO_SRC}
          alt="Alta Permissão, Missão Consciência"
          className="w-full max-w-sm h-auto mx-auto mb-2"
        />
        <p className="text-cream/10 text-xs mt-6">
          © {new Date().getFullYear()} Missão Consciência. Todos os direitos reservados.
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
      <StickyHeader onCtaClick={scrollToInvestimento} />
      <main>
        <HeroSection onCtaClick={scrollToInvestimento} />
        <MarqueeBanner />
        <ProblemSection />
        <DiagnosisSection />
        <SolutionSection />
        <LogicRevealSection onCtaClick={open} />
        <DeliverablesSection />
        <DailyInsightsSection />
        {!eventPast && <ScheduleSection onCtaClick={scrollToInvestimento} />}
        <PricingSection onCtaClick={open} />
        <MentorSection />
        <GuaranteeAndFAQ />
      </main>
      <Footer />
      <LeadModal open={modalOpen} onClose={close} />
    </>
  )
}
