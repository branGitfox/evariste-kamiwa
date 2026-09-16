import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, MessageCircle, ShieldCheck, BatteryCharging, Smartphone, Check, Share2, HelpCircle } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getProductById } from '@/data/products'
import { openWhatsAppForProduct } from '@/lib/whatsapp'
import { trackProductView } from '@/lib/analytics'
import iphonePlaceholder from '@/assets/images/iphone-1.jpg'

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = id ? getProductById(id) : undefined

  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    if (product) {
      trackProductView(product.id, product.name)
    }
  }, [product])

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <Container size="sm">
          <h1 className="text-2xl font-bold text-white mb-4">iPhone introuvable</h1>
          <p className="text-sm text-neutral-400 mb-6">Le produit demandé n'existe pas ou n'est plus référencé.</p>
          <Button onClick={() => navigate('/iphone')} variant="secondary">
            Retour au catalogue
          </Button>
        </Container>
      </div>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : [iphonePlaceholder]
  const currentImage = images[activeImageIndex] || iphonePlaceholder

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'MGA') return `${price.toLocaleString('fr-FR')} Ar`
    return `${price.toLocaleString('fr-FR')} €`
  }

  return (
    <div className="pt-32 pb-24">
      <Container>
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/iphone"
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux iPhones
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-3xl bg-[#111113] border border-white/10 p-8 flex items-center justify-center overflow-hidden">
              {product.demo && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="demo">Modèle Démo</Badge>
                </div>
              )}
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Thumbnails if multiple */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-xl bg-[#111113] border p-2 shrink-0 transition-all ${
                      activeImageIndex === idx ? 'border-white' : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                  {product.model}
                </span>
                <span className="text-neutral-600">•</span>
                <span className="text-xs text-neutral-400">{product.condition}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                {product.description ||
                  `iPhone authentique en excellent état, scrupuleusement inspecté et débloqué tous opérateurs.`}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-2xl bg-[#111113] border border-white/10 flex items-center justify-between">
              <div>
                <span className="block text-xs text-neutral-400 font-medium">Prix indicatif</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white">
                  {formatPrice(product.price, product.currency)}
                </span>
              </div>
              <Badge variant="success" size="md">
                Prêt pour réservation
              </Badge>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-neutral-400 block">Stockage</span>
                <span className="text-white font-semibold text-sm">{product.storage}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-neutral-400 block">Couleur</span>
                <span className="text-white font-semibold text-sm">{product.color}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-neutral-400 block">Batterie</span>
                <span className="text-emerald-400 font-semibold text-sm">
                  {product.batteryHealth ? `${product.batteryHealth}% d'origine` : 'État optimal certifié'}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <span className="text-neutral-400 block">Opérateur</span>
                <span className="text-white font-semibold text-sm">Débloqué tout opérateur</span>
              </div>
            </div>

            {/* Security checklist */}
            <div className="space-y-2 py-3 border-y border-white/8 text-xs text-neutral-300">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Débloqué iCloud, prêt à configurer avec votre Apple ID</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Face ID et capteurs photo 100% fonctionnels</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Paiement & remise convenus directement avec le vendeur</span>
              </div>
            </div>

            {/* Primary Action */}
            <div className="pt-2 space-y-3">
              <Button
                variant="whatsapp"
                size="lg"
                className="w-full justify-center"
                icon={<MessageCircle className="w-5 h-5 fill-black" />}
                onClick={() =>
                  openWhatsAppForProduct(product.name, product.model, product.price, product.currency)
                }
              >
                Commander cet iPhone sur WhatsApp
              </Button>
              <p className="text-center text-[11px] text-neutral-400">
                Vous serez redirigé vers WhatsApp avec un message pré-rédigé contenant les détails de ce modèle.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
