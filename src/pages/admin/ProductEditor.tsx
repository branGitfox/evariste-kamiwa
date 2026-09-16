import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save, Sparkles, Smartphone, Eye } from 'lucide-react'
import { getProductById, saveProduct } from '@/data/products'
import type { Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { ProductCard } from '@/components/products/ProductCard'
import iphonePlaceholder from '@/assets/images/iphone-1.jpg'

export const ProductEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEditing = Boolean(id && id !== 'new')

  const [formData, setFormData] = useState<Partial<Product>>({
    name: 'iPhone 15 Pro Max',
    model: 'iPhone 15 Pro Max',
    storage: '256 Go',
    color: 'Titane Naturel',
    condition: 'Comme neuf',
    batteryHealth: 98,
    price: 4900000,
    currency: 'MGA',
    status: 'available',
    demo: false,
    description: 'État irréprochable avec batterie certifiée d’origine. Livré avec câble de charge officiel.',
    images: [iphonePlaceholder],
  })

  useEffect(() => {
    if (isEditing && id) {
      const existing = getProductById(id)
      if (existing) {
        setFormData(existing)
      }
    }
  }, [isEditing, id])

  const handleChange = (key: keyof Product, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const productToSave: Product = {
      id: isEditing && id ? id : `iphone-${Date.now()}`,
      name: formData.name || 'iPhone',
      model: formData.model || 'iPhone',
      storage: formData.storage || '128 Go',
      color: formData.color || 'Noir',
      condition: formData.condition || 'Comme neuf',
      batteryHealth: Number(formData.batteryHealth) || undefined,
      price: Number(formData.price) || 0,
      currency: formData.currency || 'MGA',
      status: (formData.status as any) || 'available',
      demo: Boolean(formData.demo),
      description: formData.description || '',
      images: formData.images || [iphonePlaceholder],
      createdAt: formData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    saveProduct(productToSave)
    navigate('/admin/products')
  }

  // Live preview mockup product
  const previewProduct: Product = {
    id: 'preview',
    name: formData.name || 'Nom du modèle',
    model: formData.model || 'Modèle',
    storage: formData.storage || 'Capacité',
    color: formData.color || 'Couleur',
    condition: formData.condition || 'État',
    batteryHealth: Number(formData.batteryHealth) || undefined,
    price: Number(formData.price) || 0,
    currency: formData.currency || 'MGA',
    status: (formData.status as any) || 'available',
    demo: Boolean(formData.demo),
    description: formData.description,
    images: formData.images || [iphonePlaceholder],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à la liste des iPhones
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            {isEditing ? 'Modifier l’iPhone' : 'Ajouter un nouvel iPhone'}
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Renseignez les détails techniques et prévisualisez la carte en direct.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <div className="bg-[#111113] border border-white/8 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-neutral-300">
              Informations Principales
            </h3>

            <Input
              label="Nom commercial affiché"
              value={formData.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Modèle Apple"
                value={formData.model || ''}
                onChange={(e) => handleChange('model', e.target.value)}
                placeholder="Ex: iPhone 16 Pro"
                required
              />
              <Input
                label="Capacité de stockage"
                value={formData.storage || ''}
                onChange={(e) => handleChange('storage', e.target.value)}
                placeholder="Ex: 256 Go"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Couleur / Finition"
                value={formData.color || ''}
                onChange={(e) => handleChange('color', e.target.value)}
                placeholder="Ex: Titane Bleu"
                required
              />
              <Input
                label="État cosmétique"
                value={formData.condition || ''}
                onChange={(e) => handleChange('condition', e.target.value)}
                placeholder="Ex: Comme neuf / Reconditionné A+"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label="Prix"
                type="number"
                value={formData.price || 0}
                onChange={(e) => handleChange('price', Number(e.target.value))}
                required
              />
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">Devise</label>
                <select
                  value={formData.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none"
                >
                  <option value="MGA">Ariary (MGA)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dollar ($)</option>
                </select>
              </div>
              <Input
                label="Santé Batterie (%)"
                type="number"
                max={100}
                min={50}
                value={formData.batteryHealth || ''}
                onChange={(e) => handleChange('batteryHealth', e.target.value ? Number(e.target.value) : undefined)}
                placeholder="Ex: 95"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">Statut du stock</label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none"
                >
                  <option value="available">Disponible immédiatement</option>
                  <option value="reserved">Réservé</option>
                  <option value="sold">Vendu / Sur commande</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="demo"
                  checked={formData.demo || false}
                  onChange={(e) => handleChange('demo', e.target.checked)}
                  className="w-4 h-4 rounded bg-neutral-900 border-white/20 text-blue-600 focus:ring-0"
                />
                <label htmlFor="demo" className="text-xs text-neutral-300 cursor-pointer">
                  Marquer comme exemple / Produit Démo
                </label>
              </div>
            </div>

            <Textarea
              label="Description détaillée"
              value={formData.description || ''}
              onChange={(e) => handleChange('description', e.target.value)}
              rows={4}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center mt-4"
              icon={<Save className="w-4 h-4" />}
            >
              {isEditing ? 'Enregistrer les modifications' : 'Créer l’iPhone'}
            </Button>
          </div>
        </form>

        {/* Live Preview Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-8">
            <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-neutral-400">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Aperçu En Direct (Carte Produit)</span>
            </div>

            <div className="max-w-sm mx-auto">
              <ProductCard product={previewProduct} />
            </div>

            <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-neutral-500 text-center">
              Les modifications saisies dans le formulaire ci-contre se reflètent immédiatement dans cet aperçu client.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
