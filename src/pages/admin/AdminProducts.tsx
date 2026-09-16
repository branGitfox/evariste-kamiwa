import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Copy,
  ExternalLink,
  Smartphone,
  Eye,
} from 'lucide-react'
import { getProducts, deleteProduct, saveProduct } from '@/data/products'
import type { Product } from '@/types'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => getProducts())
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null)

  const reloadProducts = () => {
    setProducts(getProducts())
  }

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const q = search.toLowerCase()
      return (
        p.name.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.color.toLowerCase().includes(q)
      )
    })
  }, [products, search])

  const handleDelete = () => {
    if (deleteTarget) {
      deleteProduct(deleteTarget.id)
      setDeleteTarget(null)
      reloadProducts()
    }
  }

  const handleDuplicate = (product: Product) => {
    const duplicated: Product = {
      ...product,
      id: `iphone-${Date.now()}`,
      name: `${product.name} (Copie)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    saveProduct(duplicated)
    reloadProducts()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Gestion des iPhones</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Gérez votre catalogue, mettez à jour les prix, stock et caractéristiques.
          </p>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
            Ajouter un iPhone
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="max-w-md">
        <Input
          placeholder="Filtrer les produits par modèle ou couleur..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />
      </div>

      {/* Table */}
      <div className="bg-[#111113] border border-white/8 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-neutral-300">
            <thead className="bg-white/[0.03] text-neutral-400 font-semibold border-b border-white/8 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Modèle & Nom</th>
                <th className="p-4">Stockage</th>
                <th className="p-4">Couleur</th>
                <th className="p-4">Batterie</th>
                <th className="p-4">Prix</th>
                <th className="p-4">Statut</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-white/5 flex items-center justify-center shrink-0">
                        <Smartphone className="w-4 h-4 text-neutral-400" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{p.name}</p>
                        <p className="text-[11px] text-neutral-400">{p.model}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium">{p.storage}</td>
                  <td className="p-4">{p.color}</td>
                  <td className="p-4">
                    {p.batteryHealth ? (
                      <span className="text-emerald-400 font-medium">{p.batteryHealth}%</span>
                    ) : (
                      <span className="text-neutral-500">—</span>
                    )}
                  </td>
                  <td className="p-4 font-mono font-bold text-white">
                    {p.price.toLocaleString('fr-FR')} {p.currency}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <Badge
                        variant={
                          p.status === 'available'
                            ? 'success'
                            : p.status === 'reserved'
                            ? 'warning'
                            : 'default'
                        }
                        size="sm"
                      >
                        {p.status}
                      </Badge>
                      {p.demo && <Badge variant="demo" size="sm">Démo</Badge>}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/iphone/${p.id}`}
                        target="_blank"
                        className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5"
                        title="Voir la fiche publique"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDuplicate(p)}
                        className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5"
                        title="Dupliquer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <Link
                        to={`/admin/products/${p.id}/edit`}
                        className="p-2 rounded-lg text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Confirmer la suppression"
      >
        <p className="text-xs text-neutral-300 mb-6 leading-relaxed">
          Êtes-vous certain de vouloir supprimer l'appareil{' '}
          <strong className="text-white">{deleteTarget?.name}</strong> ? Cette action est irréversible en base locale.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" size="sm" onClick={() => setDeleteTarget(null)}>
            Annuler
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Supprimer définitivement
          </Button>
        </div>
      </Modal>
    </div>
  )
}
