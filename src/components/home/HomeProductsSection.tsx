import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { ProductCard } from '@/components/products/ProductCard'
import { getProducts } from '@/data/products'

export const HomeProductsSection: React.FC = () => {
  const products = getProducts().slice(0, 3)

  return (
    <section className="py-24 relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Exemples de modèles disponibles</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              iPhones en vedette
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Modèles originaux vérifiés et prêts pour remise en main propre ou expédition sécurisée.
            </p>
          </div>

          <Link to="/iphone">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Explorer tout le catalogue
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </Container>
    </section>
  )
}
