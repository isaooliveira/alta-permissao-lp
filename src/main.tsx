import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FunilPage } from './FunilPage.tsx'
import { ObrigadoPage, isObrigadoLocation } from './ObrigadoPage.tsx'
import { captureUtm } from './lib/utm'
import { trackVisit } from './lib/visits'

const path = window.location.pathname.replace(/\/$/, '')
const isFunil = path.endsWith('/funil')
const isObrigado = isObrigadoLocation()

if (!isFunil && !isObrigado) {
  captureUtm()
  trackVisit()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isFunil ? <FunilPage /> : isObrigado ? <ObrigadoPage /> : <App />}
  </StrictMode>,
)
