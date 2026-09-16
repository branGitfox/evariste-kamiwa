import React, { useState, useMemo } from 'react'
import { Container } from '@/components/layout/Container'
import { ProductCard } from '@/components/products/ProductCard'
import { ProductFilters, FilterState } from '@/components/products/ProductFilters'
import { EmptyState } from '@/components/ui/EmptyState'
import { getProducts } from '@/data/products'
import { Smartphone, Info } from 'lucide-react'

export const Products: React.FC = () => {
  const allProducts = useMemo(() => getProducts(), [])

  const models = useMemo(() => {
    const list = Array.from(new Set(allProducts.map((p) => p.model)))
    return list
  }, [allProducts])

  const storages = useMemo(() => {
    const list = Array.from(new Set(allProducts.map((p) => p.storage)))
    return list
  }, [allProducts])

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    model: 'all',
    storage: 'all',
    condition: 'all',
    sortBy: 'featured',
  })

  const resetFilters = () => {
    setFilters({
      search: '',
      model: 'all',
      storage: 'all',
      condition: 'all',
      sortBy: 'featured',
    })
  }

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        if (filters.search) {
          const q = filters.search.toLowerCase()
          const matchName = p.name.toLowerCase().includes(q)
          const matchModel = p.model.toLowerCase().includes(q)
          const matchColor = p.color.toLowerCase().includes(q)
          if (!matchName && !matchModel && !matchColor) return false
        }
        if (filters.model !== 'all' && p.model !== filters.model) {
          return false
        }
        if (filters.storage !== 'all' && p.storage !== filters.storage) {
          return false
        }
        if (filters.condition !== 'all' && p.condition !== filters.condition) {
          return false
        }
        return true
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price
        if (filters.sortBy === 'price-desc') return b.price - a.price
        if (filters.sortBy === 'name') return a.name.localeCompare(b.name)
        return 0
      })
  }, [allProducts, filters])

  return (
    <div className="pt-32 pb-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 mb-3">
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
            <span>Catalogue iPhones</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            iPhones Disponibles & Sur Commande
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Parcourez notre sélection de modèles Apple authentiques. Les modèles ci-dessous sont des exemples de références que nous fournissons régulièrement.
          </p>

          {/* Info notice */}
          <div className="mt-4 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3 text-xs text-blue-300">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Vous recherchez une couleur ou une capacité spécifique non listée ? Contactez-nous directement sur WhatsApp, nous vérifions le stock en temps réel.
            </span>
          </div>
        </div>

        {/* Filters */}
        <ProductFilters
          filters={filters}
          onChange={setFilters}
          onReset={resetFilters}
          models={models}
          storages={storages}
        />

        {/* Results grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="Aucun iPhone trouvé"
            description="Aucun modèle ne correspond à vos critères de recherche. Essayez de réinitialiser vos filtres ou contactez-nous pour une commande sur-mesure."
            actionLabel="Réinitialiser les filtres"
            onAction={resetFilters}
          />
        )}
      </Container>
    </div>
  )
}
