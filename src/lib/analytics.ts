declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
    __eapSkipGa?: boolean
    __eapUtmQuery?: string
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  if (window.__eapSkipGa) return
  window.gtag?.('event', name, params)
}
