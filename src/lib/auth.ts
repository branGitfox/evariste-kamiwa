import type { AdminUser } from '@/types'

// ============================================================
// AUTH — Demo authentication service
// ⚠️ NOT SECURE — Frontend-only demo authentication.
// Ready to be replaced by Supabase Auth or FastAPI JWT.
// ============================================================

const AUTH_KEY = 'evariste-auth'

const DEMO_CREDENTIALS = {
  email: 'admin@evariste.com',
  password: 'admin123',
}

const DEMO_USER: AdminUser = {
  email: 'admin@evariste.com',
  name: 'Evariste Kamiwa',
  role: 'admin',
}

export function login(email: string, password: string): AdminUser | null {
  if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(DEMO_USER))
    return DEMO_USER
  }
  return null
}

export function logout(): void {
  localStorage.removeItem(AUTH_KEY)
}

export function getCurrentUser(): AdminUser | null {
  try {
    const stored = localStorage.getItem(AUTH_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return null
}

export function isAuthenticated(): boolean {
  return getCurrentUser() !== null
}
