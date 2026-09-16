import React from 'react'
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react'
import { Input } from '@/components/ui/Input'

export interface FilterState {
  search: string
  model: string
  storage: string
  condition: string
  sortBy: string
}

export interface ProductFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onReset: () => void
  models: string[]
  storages: string[]
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChange,
  onReset,
  models,
  storages,
}) => {
  const handleChange = (key: keyof FilterState, value: string) => {
    onChange({ ...filters, [key]: value })
  }

  const isFiltered =
    Boolean(filters.search) ||
    filters.model !== 'all' ||
    filters.storage !== 'all' ||
    filters.condition !== 'all'

  return (
    <div className="bg-[#111113] border border-white/8 rounded-2xl p-5 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="flex-1 min-w-[240px]">
          <Input
            placeholder="Rechercher un modèle (ex: 15 Pro, 256 Go, Titane)..."
            value={filters.search}
            onChange={(e) => handleChange('search', e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-neutral-400">Trier par:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="bg-neutral-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
          >
            <option value="featured">En vedette</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="name">Modèle (A-Z)</option>
          </select>

          {isFiltered && (
            <button
              onClick={onReset}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded transition-colors"
              title="Réinitialiser les filtres"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Effacer</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter pills */}
      <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2 items-center text-xs">
        <span className="text-neutral-400 flex items-center gap-1 mr-1">
          <SlidersHorizontal className="w-3.5 h-3.5" /> Modèle:
        </span>
        <button
          onClick={() => handleChange('model', 'all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            filters.model === 'all'
              ? 'bg-white text-black font-semibold'
              : 'bg-white/5 text-neutral-300 hover:bg-white/10'
          }`}
        >
          Tous
        </button>
        {models.map((m) => (
          <button
            key={m}
            onClick={() => handleChange('model', m)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filters.model === m
                ? 'bg-white text-black font-semibold'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            {m}
          </button>
        ))}

        {/* Storage pills */}
        <span className="text-neutral-400 ml-3 mr-1">Stockage:</span>
        <button
          onClick={() => handleChange('storage', 'all')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
            filters.storage === 'all'
              ? 'bg-white text-black font-semibold'
              : 'bg-white/5 text-neutral-300 hover:bg-white/10'
          }`}
        >
          Tous
        </button>
        {storages.map((s) => (
          <button
            key={s}
            onClick={() => handleChange('storage', s)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filters.storage === s
                ? 'bg-white text-black font-semibold'
                : 'bg-white/5 text-neutral-300 hover:bg-white/10'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
