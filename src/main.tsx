import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FunilPage } from './FunilPage.tsx'
import { captureUtm } from './lib/utm'

captureUtm()

const isFunil = window.location.pathname.replace(/\/$/, '').endsWith('/funil')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isFunil ? <FunilPage /> : <App />}
  </StrictMode>,
)
