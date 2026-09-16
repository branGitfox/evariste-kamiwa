import type { Service } from '@/types'

// ============================================================
// SERVICES — Migrés depuis le site original
// ============================================================

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'mada-maurice',
    title: 'Madagascar → Maurice',
    name: 'Madagascar ↔ Île Maurice',
    origin: 'Madagascar',
    destination: 'Île Maurice',
    description: 'Envoi sécurisé de colis et plis confidentiels entre Antananarivo et l’Île Maurice.',
    active: true,
    ctaMessage: "Bonjour Evariste, je souhaite avoir des informations concernant l'envoi d'un colis de Tana vers Maurice.",
    flag: { origin: '🇲🇬', destination: '🇲🇺' },
  },
  {
    id: 'mada-dubai',
    title: 'Madagascar → Dubaï',
    name: 'Madagascar ↔ Dubaï',
    origin: 'Madagascar',
    destination: 'Dubaï',
    description: 'Envoi de colis, matériel électronique et commandes spécifiques entre Madagascar et Dubaï.',
    active: true,
    ctaMessage: "Bonjour Evariste, je souhaite avoir des informations concernant l'envoi d'un colis de Tana vers Dubaï.",
    flag: { origin: '🇲🇬', destination: '🇦🇪' },
  },
]

const STORAGE_KEY = 'evariste-services'

export function getServices(): Service[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return DEFAULT_SERVICES
}

export function saveServices(services: Service[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services))
}

export function saveService(service: Service): void {
  const services = getServices()
  const idx = services.findIndex((s) => s.id === service.id)
  if (idx >= 0) {
    services[idx] = service
  } else {
    services.push(service)
  }
  saveServices(services)
}

export function deleteService(id: string): void {
  saveServices(getServices().filter((s) => s.id !== id))
}

export function updateService(id: string, updates: Partial<Service>): void {
  const services = getServices().map((s) => (s.id === id ? { ...s, ...updates } : s))
  saveServices(services)
}
