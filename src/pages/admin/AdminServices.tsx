import React, { useState } from 'react'
import { Plane, Plus, Edit2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react'
import { getServices, saveService, deleteService } from '@/data/services'
import type { Service } from '@/types'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Modal } from '@/components/ui/Modal'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'

export const AdminServices: React.FC = () => {
  const [services, setServices] = useState<Service[]>(() => getServices())
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const reload = () => setServices(getServices())

  const handleOpenAdd = () => {
    setEditingService({
      id: `service-${Date.now()}`,
      name: '',
      origin: 'Madagascar',
      destination: '',
      description: '',
      active: true,
    })
    setIsModalOpen(true)
  }

  const handleOpenEdit = (service: Service) => {
    setEditingService(service)
    setIsModalOpen(true)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingService && editingService.name && editingService.destination) {
      saveService(editingService as Service)
      setIsModalOpen(false)
      reload()
    }
  }

  const handleDelete = (id: string) => {
    deleteService(id)
    reload()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Services Colis & Fret</h1>
          <p className="text-xs text-neutral-400 mt-1">
            Configurez les lignes de transport et les descriptions de vos liaisons.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus className="w-4 h-4" />} onClick={handleOpenAdd}>
          Ajouter une Liaison
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div
            key={s.id}
            className="bg-[#111113] border border-white/8 rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5" />
                  {s.origin} ↔ {s.destination}
                </span>
                <Badge variant={s.active ? 'success' : 'default'} size="sm">
                  {s.active ? 'Actif' : 'Inactif'}
                </Badge>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{s.name}</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">{s.description}</p>
            </div>

            <div className="pt-4 border-t border-white/8 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" icon={<Edit2 className="w-3.5 h-3.5" />} onClick={() => handleOpenEdit(s)}>
                Modifier
              </Button>
              <button
                onClick={() => handleDelete(s.id)}
                className="p-2 rounded-xl text-red-400 hover:bg-red-500/10 text-xs transition-colors"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingService?.id?.startsWith('service-') ? 'Ajouter une liaison' : 'Modifier la liaison'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Nom du service"
            value={editingService?.name || ''}
            onChange={(e) => setEditingService((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Ex: Madagascar ↔ Dubaï Express"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Point de départ (Origine)"
              value={editingService?.origin || ''}
              onChange={(e) => setEditingService((prev) => ({ ...prev, origin: e.target.value }))}
              required
            />
            <Input
              label="Point d'arrivée (Destination)"
              value={editingService?.destination || ''}
              onChange={(e) => setEditingService((prev) => ({ ...prev, destination: e.target.value }))}
              required
            />
          </div>

          <Textarea
            label="Description du service"
            value={editingService?.description || ''}
            onChange={(e) => setEditingService((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
            required
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Annuler
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Enregistrer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
