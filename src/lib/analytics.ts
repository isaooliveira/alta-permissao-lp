declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
) {
  window.gtag?.('event', name, params)
}
