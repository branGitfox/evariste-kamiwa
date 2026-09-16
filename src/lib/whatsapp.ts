import { getSettings } from '@/data/siteConfig'
import { trackWhatsAppClick } from '@/lib/analytics'

// ============================================================
// WHATSAPP — Centralized WhatsApp functionality
// All CTA buttons use this single function.
// ============================================================

export function getWhatsAppUrl(message?: string): string {
  const settings = getSettings()
  const number = settings.whatsapp.replace(/\D/g, '')
  if (!number) return '#whatsapp-not-configured'
  const base = `https://wa.me/${number}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function openWhatsApp(message?: string): void {
  trackWhatsAppClick()
  const url = getWhatsAppUrl(message)
  if (url === '#whatsapp-not-configured') {
    alert('Le numéro WhatsApp n\'est pas encore configuré. Rendez-vous dans Administration > Paramètres.')
    return
  }
  window.open(url, '_blank', 'noopener,noreferrer')
}

// Context-specific messages
export function productMessage(name: string, storage: string): string {
  return `Bonjour Evariste, je suis intéressé par ${name} ${storage}. Pouvez-vous me confirmer sa disponibilité et son prix ?`
}

export function serviceMessage(title: string): string {
  return `Bonjour Evariste, je souhaite avoir des informations concernant le service : ${title}.`
}

export function generalMessage(): string {
  return 'Bonjour Evariste, je souhaite connaître les iPhone actuellement disponibles.'
}

export function openWhatsAppForProduct(name: string, _model?: string, price?: number, currency?: string): void {
  const priceStr = price ? ` (Prix indicatif: ${price.toLocaleString('fr-FR')} ${currency || 'MGA'})` : ''
  const msg = `Bonjour Evariste, je suis intéressé par votre ${name}${priceStr}. Est-il toujours disponible ?`
  openWhatsApp(msg)
}
