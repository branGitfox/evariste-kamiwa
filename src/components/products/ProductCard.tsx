import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Smartphone, BatteryCharging, ShieldCheck, MessageCircle, ArrowUpRight } from 'lucide-react'
import type { Product } from '@/types'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { openWhatsAppForProduct } from '@/lib/whatsapp'
import iphonePlaceholder from '@/assets/images/iphone-1.jpg'

export interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const formatPrice = (price: number, currency: string) => {
    if (currency === 'MGA') {
      return `${price.toLocaleString('fr-FR')} Ar`
    }
    return `${price.toLocaleString('fr-FR')} €`
  }

  const imageSrc = product.images?.[0] || iphonePlaceholder

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative bg-[#111113] border border-white/8 hover:border-white/20 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-black/60"
    >
      {/* Top badges */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          {product.demo && <Badge variant="demo" size="sm">Démo</Badge>}
          {product.status === 'available' ? (
            <Badge variant="success" size="sm">Disponible</Badge>
          ) : product.status === 'reserved' ? (
            <Badge variant="warning" size="sm">Réservé</Badge>
          ) : (
            <Badge variant="default" size="sm">Sur commande</Badge>
          )}
        </div>
        {product.condition && (
          <span className="text-[11px] font-medium bg-black/60 backdrop-blur-md text-neutral-300 px-2.5 py-0.5 rounded-full border border-white/10">
            {product.condition}
          </span>
        )}
      </div>

      {/* Image container */}
      <Link
        to={`/iphone/${product.id}`}
        className="block relative aspect-[4/3] sm:aspect-square bg-gradient-to-b from-neutral-900 to-[#111113] overflow-hidden p-6"
      >
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111113] via-transparent to-transparent opacity-60 pointer-events-none" />
      </Link>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Model & Name */}
        <div className="mb-2">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            {product.model}
          </span>
          <Link to={`/iphone/${product.id}`} className="block">
            <h3 className="text-base font-bold text-white group-hover:text-white transition-colors flex items-center justify-between">
              <span>{product.name}</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-neutral-400" />
            </h3>
          </Link>
        </div>

        {/* Specs highlights */}
        <div className="grid grid-cols-2 gap-2 my-3 text-xs text-neutral-400 py-2.5 border-y border-white/5">
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate">{product.storage}</span>
          </div>
          {product.batteryHealth ? (
            <div className="flex items-center gap-1.5">
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Batterie {product.batteryHealth}%</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">{product.color}</span>
            </div>
          )}
        </div>

        {/* Price & Action */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] text-neutral-400 font-medium">Prix indicatif</span>
            <span className="text-lg font-extrabold text-white">
              {formatPrice(product.price, product.currency)}
            </span>
          </div>

          <Button
            variant="whatsapp"
            size="sm"
            icon={<MessageCircle className="w-4 h-4 fill-black" />}
            onClick={() => openWhatsAppForProduct(product.name, product.model, product.price, product.currency)}
          >
            Commander
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
