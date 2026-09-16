import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'

// ─── Initialize theme before first paint to prevent FOUC ─────────────────────
const savedTheme = localStorage.getItem('ek_theme') ?? 'dark'
const root = document.documentElement
root.classList.remove('dark', 'light')
root.classList.add(savedTheme)
// ─────────────────────────────────────────────────────────────────────────────

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
