export const INVESTMENT_SECTION_ID = 'investimento'

export function scrollToInvestimento() {
  document.getElementById(INVESTMENT_SECTION_ID)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
