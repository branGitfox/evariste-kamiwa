import type { SiteSettings, ContentBlock } from '@/types'

// ============================================================
// SITE CONFIGURATION — Single source of truth
// All WhatsApp/Facebook links read from here.
// ============================================================

export const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp: '+212674105702',
  whatsappNumber: '+212674105702',
  facebook: 'https://web.facebook.com/evaristekamiwa',
  facebookUrl: 'https://web.facebook.com/evaristekamiwa',
  siteName: 'Neutra Mobile',
  businessName: 'NEUTRA MOBILE',
  siteTagline: 'Apple by Evariste Kamiwa',
  tagline: 'Apple by Evariste Kamiwa',
  defaultCurrency: 'MGA',
  heroTitle: 'Votre iPhone.\nVotre colis.\nEn toute confiance.',
  heroSubtitle:
    'Neutra Mobile — Votre boutique spécialisée en iPhones authentiques et solutions d\'expédition de colis entre Madagascar, Maurice et Dubaï.',
  heroCta: 'Voir les iPhone',
  heroCtaSecondary: 'Contacter sur WhatsApp',
  aboutText:
    'Neutra Mobile, dirigé par Evariste Kamiwa, vous accompagne dans l\'achat d\'iPhones certifiés et sécurise tous vos envois de colis entre Madagascar, Maurice et Dubaï.',
  contactTitle: 'Vous cherchez un iPhone ou souhaitez envoyer un colis ?',
  contactSubtitle: 'Neutra Mobile vous répond directement sur WhatsApp.',
}

export const DEFAULT_CONTENT_BLOCKS: ContentBlock[] = [
  { id: '1', section: 'hero', key: 'title', value: DEFAULT_SETTINGS.heroTitle, label: 'Titre Hero' },
  { id: '2', section: 'hero', key: 'subtitle', value: DEFAULT_SETTINGS.heroSubtitle, label: 'Sous-titre Hero' },
  { id: '3', section: 'hero', key: 'cta', value: DEFAULT_SETTINGS.heroCta, label: 'CTA primaire' },
  { id: '4', section: 'hero', key: 'ctaSecondary', value: DEFAULT_SETTINGS.heroCtaSecondary, label: 'CTA secondaire' },
  { id: '5', section: 'about', key: 'text', value: DEFAULT_SETTINGS.aboutText, label: 'Texte À propos' },
  { id: '6', section: 'contact', key: 'title', value: DEFAULT_SETTINGS.contactTitle, label: 'Titre Contact' },
  { id: '7', section: 'contact', key: 'subtitle', value: DEFAULT_SETTINGS.contactSubtitle, label: 'Sous-titre Contact' },
]

export function getSettings(): SiteSettings {
  try {
    const stored = localStorage.getItem('neutra-settings') || localStorage.getItem('evariste-settings')
    if (stored) {
      const parsed = JSON.parse(stored)
      // If legacy name was saved, update to Neutra Mobile
      if (parsed.businessName === 'EVARISTE KAMIWA') {
        parsed.businessName = 'NEUTRA MOBILE'
        parsed.siteName = 'Neutra Mobile'
        parsed.tagline = 'Apple by Evariste Kamiwa'
      }
      return { ...DEFAULT_SETTINGS, ...parsed }
    }
  } catch {
    // ignore
  }
  return DEFAULT_SETTINGS
}

export function saveSettings(settings: Partial<SiteSettings>): void {
  const current = getSettings()
  localStorage.setItem('neutra-settings', JSON.stringify({ ...current, ...settings }))
}

export function getContentBlocks(): ContentBlock[] {
  try {
    const stored = localStorage.getItem('neutra-content') || localStorage.getItem('evariste-content')
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return DEFAULT_CONTENT_BLOCKS
}

export function saveContentBlocks(blocks: ContentBlock[]): void {
  localStorage.setItem('evariste-content', JSON.stringify(blocks))
}
