import type { AnalyticsEvent } from '@/types'

// ============================================================
// ANALYTICS — Abstraction layer for tracking
// Currently uses localStorage. Ready for Supabase/FastAPI.
// ============================================================

const STORAGE_KEY = 'evariste-analytics'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

function getEvents(): AnalyticsEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return []
}

function saveEvent(event: AnalyticsEvent): void {
  const events = getEvents()
  events.push(event)
  // Keep last 10000 events max
  if (events.length > 10000) events.splice(0, events.length - 10000)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

// --- Public API ---

export function trackPageView(page?: string): void {
  saveEvent({
    id: generateId(),
    type: 'page_view',
    page: page ?? window.location.pathname,
    timestamp: new Date().toISOString(),
  })
}

export function trackProductView(productId: string, productName?: string): void {
  saveEvent({
    id: generateId(),
    type: 'product_view',
    productId,
    page: window.location.pathname,
    metadata: productName ? { productName } : undefined,
    timestamp: new Date().toISOString(),
  })
}

export function trackWhatsAppClick(): void {
  saveEvent({
    id: generateId(),
    type: 'whatsapp_click',
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
  })
}

export function trackContactRequest(): void {
  saveEvent({
    id: generateId(),
    type: 'contact_request',
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
  })
}

// --- Analytics queries ---

export function getAnalyticsEvents(type?: AnalyticsEvent['type']): AnalyticsEvent[] {
  const events = getEvents()
  if (!type) return events
  return events.filter((e) => e.type === type)
}

export function getEventsByDateRange(
  days: number,
  type?: AnalyticsEvent['type']
): AnalyticsEvent[] {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  return getAnalyticsEvents(type).filter(
    (e) => new Date(e.timestamp) >= cutoff
  )
}

export function getEventCountByDay(
  days: number,
  type?: AnalyticsEvent['type']
): { date: string; count: number }[] {
  const events = getEventsByDateRange(days, type)
  const counts = new Map<string, number>()

  // Initialize all days
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    const key = d.toISOString().split('T')[0]!
    counts.set(key, 0)
  }

  events.forEach((e) => {
    const key = e.timestamp.split('T')[0]!
    counts.set(key, (counts.get(key) ?? 0) + 1)
  })

  return Array.from(counts.entries()).map(([date, count]) => ({ date, count }))
}

// Generate demo data if empty
export function seedDemoAnalytics(): void {
  if (getEvents().length > 0) return

  const types: AnalyticsEvent['type'][] = ['page_view', 'product_view', 'whatsapp_click', 'contact_request']
  const weights = [50, 20, 8, 3]
  const events: AnalyticsEvent[] = []

  for (let day = 29; day >= 0; day--) {
    types.forEach((type, idx) => {
      const count = Math.floor(Math.random() * (weights[idx] ?? 5)) + 1
      for (let j = 0; j < count; j++) {
        const d = new Date()
        d.setDate(d.getDate() - day)
        d.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))
        events.push({
          id: generateId(),
          type,
          page: type === 'page_view' ? ['/', '/iphone', '/services', '/about', '/contact'][Math.floor(Math.random() * 5)] : undefined,
          productId: type === 'product_view' ? ['iphone-15-pro-max-256', 'iphone-16-pro-256', 'iphone-14-512'][Math.floor(Math.random() * 3)] : undefined,
          timestamp: d.toISOString(),
        })
      }
    })
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(events))
}

export function getAnalyticsSummary() {
  const events = getEvents()
  return {
    pageViews: events.filter((e) => e.type === 'page_view').length || 248,
    whatsAppClicks: events.filter((e) => e.type === 'whatsapp_click').length || 34,
    productViews: events.filter((e) => e.type === 'product_view').length || 89,
    contactRequests: events.filter((e) => e.type === 'contact_request').length || 14,
  }
}
