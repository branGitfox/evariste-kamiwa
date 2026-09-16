import type { FAQItem } from '@/types'

// ============================================================
// FAQ — Migrée depuis le site original
// ============================================================

export const DEFAULT_FAQ: FAQItem[] = [
  {
    id: '1',
    question: 'Quels iPhone sont disponibles ?',
    answer: 'La disponibilité varie régulièrement. Contactez-nous pour connaître les modèles disponibles.',
  },
  {
    id: '2',
    question: 'Comment commander un iPhone ?',
    answer: 'Contactez-nous directement via WhatsApp.',
  },
  {
    id: '3',
    question: 'Proposez-vous des envois de colis ?',
    answer: 'Oui, des services d\'envoi sont proposés entre les destinations indiquées.',
  },
  {
    id: '4',
    question: 'Quels sont les tarifs des colis ?',
    answer: 'Les tarifs dépendent du colis et du trajet. Contactez-nous pour obtenir un devis.',
  },
  {
    id: '5',
    question: 'Puis-je réserver un iPhone ?',
    answer: 'Contactez-nous pour discuter de la disponibilité et des modalités. Aucune réservation n\'est promise par le site.',
  },
]

const STORAGE_KEY = 'evariste-faq'

export function getFAQ(): FAQItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return DEFAULT_FAQ
}

export function saveFAQ(items: FAQItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}
