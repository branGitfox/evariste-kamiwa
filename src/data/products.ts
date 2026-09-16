import type { Product } from '@/types'

// ============================================================
// PRODUITS DEMO — Données migrées du site original.
// Toutes marquées demo: true. Ne pas présenter comme stock réel.
// ============================================================

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'iphone-15-pro-max-256',
    name: 'iPhone 15 Pro Max',
    model: 'iPhone 15 Pro Max',
    storage: '256 Go',
    color: 'Titane Naturel',
    condition: 'Comme Neuf',
    batteryHealth: 98,
    price: 3500000,
    currency: 'MGA',
    stock: 1,
    available: true,
    status: 'available',
    images: ['/src/assets/images/iphone-1.jpg'],
    description: 'iPhone 15 Pro Max 256 Go en excellent état avec batterie certifiée d’origine. Produit de démonstration.',
    badge: 'DEMO',
    featured: true,
    demo: true,
    slug: 'iphone-15-pro-max',
    createdAt: '2026-01-15T10:00:00Z',
  },
  {
    id: 'iphone-16-pro-256',
    name: 'iPhone 16 Pro',
    model: 'iPhone 16 Pro',
    storage: '256 Go',
    color: 'Titane Noir',
    condition: 'Neuf scellé',
    batteryHealth: 100,
    price: 4000000,
    currency: 'MGA',
    stock: 1,
    available: true,
    status: 'available',
    images: ['/src/assets/images/iphone-1.jpg'],
    description: 'iPhone 16 Pro 256 Go. Dernier cri Apple, puce A18 Pro, performances photo exceptionnelles.',
    badge: 'DEMO',
    featured: true,
    demo: true,
    slug: 'iphone-16-pro',
    createdAt: '2026-02-10T10:00:00Z',
  },
  {
    id: 'iphone-14-512',
    name: 'iPhone 14',
    model: 'iPhone 14',
    storage: '512 Go',
    color: 'Rose',
    condition: 'Comme Neuf',
    batteryHealth: 92,
    price: 2500000,
    currency: 'MGA',
    stock: 1,
    available: true,
    status: 'available',
    images: ['/src/assets/images/iphone-1.jpg'],
    description: 'iPhone 14 512 Go Rose en excellent état. Grande capacité pour toutes vos photos et vidéos.',
    badge: 'DEMO',
    featured: false,
    demo: true,
    slug: 'iphone-14',
    createdAt: '2026-03-05T10:00:00Z',
  },
]

const STORAGE_KEY = 'evariste-products'

export function getProducts(): Product[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch {
    // ignore
  }
  return DEFAULT_PRODUCTS
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}

export function saveProduct(product: Product): void {
  const products = getProducts()
  const idx = products.findIndex((p) => p.id === product.id)
  if (idx >= 0) {
    products[idx] = product
  } else {
    products.push(product)
  }
  saveProducts(products)
}

export function getProductBySlug(slug: string): Product | undefined {
  return getProducts().find((p) => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find((p) => p.id === id)
}

export function addProduct(product: Product): void {
  saveProduct(product)
}

export function updateProduct(id: string, updates: Partial<Product>): void {
  const products = getProducts().map((p) => (p.id === id ? { ...p, ...updates } : p))
  saveProducts(products)
}

export function deleteProduct(id: string): void {
  saveProducts(getProducts().filter((p) => p.id !== id))
}

export function duplicateProduct(id: string): Product | null {
  const product = getProductById(id)
  if (!product) return null
  const newProduct: Product = {
    ...product,
    id: `${product.id}-copy-${Date.now()}`,
    slug: `${product.slug}-copy-${Date.now()}`,
    name: `${product.name} (copie)`,
    createdAt: new Date().toISOString(),
  }
  addProduct(newProduct)
  return newProduct
}

export const FILTER_MODELS = ['Tous', 'iPhone 14', 'iPhone 15', 'iPhone 16']
