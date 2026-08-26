import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FunilPage } from './FunilPage.tsx'
import { captureUtm } from './lib/utm'
import { trackVisit } from './lib/visits'

const isFunil = window.location.pathname.replace(/\/$/, '').endsWith('/funil')

if (!isFunil) {
  captureUtm()
  trackVisit()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isFunil ? <FunilPage /> : <App />}
  </StrictMode>,
)
