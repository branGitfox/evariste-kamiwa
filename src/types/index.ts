// ============================================================
// EVARISTE KAMIWA — Type Definitions
// ============================================================

export type ProductStatus = 'available' | 'reserved' | 'sold'

export type Product = {
  id: string
  name: string
  model: string
  storage: string
  color: string
  condition: string
  batteryHealth?: number
  price: number
  currency: string
  stock?: number
  available?: boolean
  status: ProductStatus
  images: string[]
  description?: string
  badge?: string
  featured?: boolean
  demo?: boolean
  slug?: string
  createdAt?: string
  updatedAt?: string
}

export type Service = {
  id: string
  title: string
  name?: string
  origin: string
  destination: string
  description: string
  image?: string
  active: boolean
  ctaMessage?: string
  flag?: { origin: string; destination: string }
}

export type FAQItem = {
  id: string
  question: string
  answer: string
}

export type AnalyticsEvent = {
  id: string
  type: 'page_view' | 'product_view' | 'whatsapp_click' | 'contact_request'
  page?: string
  productId?: string
  timestamp: string
  metadata?: Record<string, string>
}

export type SiteSettings = {
  whatsapp: string
  whatsappNumber?: string
  facebook: string
  facebookUrl?: string
  siteName: string
  businessName?: string
  siteTagline: string
  tagline?: string
  defaultCurrency?: string
  heroTitle: string
  heroSubtitle: string
  heroCta: string
  heroCtaSecondary: string
  aboutText: string
  contactTitle: string
  contactSubtitle: string
}

export type ContentBlock = {
  id: string
  section: string
  key: string
  value: string
  label: string
}

export type AdminUser = {
  email: string
  name: string
  role: 'admin'
}

export type KPIData = {
  label: string
  value: number | string
  change?: number
  icon: string
  trend?: 'up' | 'down' | 'neutral'
}

export type ChartDataPoint = {
  date: string
  value: number
  label?: string
}

export type ToastType = 'success' | 'error' | 'info'

export type Toast = {
  id: string
  message: string
  type: ToastType
}
