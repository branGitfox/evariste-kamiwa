import React, { useState } from 'react'
import { Settings as SettingsIcon, Save, PhoneCall, Facebook, Globe } from 'lucide-react'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/components/ui/Toast'

export const Settings: React.FC = () => {
  const { settings, updateSettings } = useSiteSettings()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    businessName: settings.businessName || 'EVARISTE KAMIWA',
    tagline: settings.tagline || 'Apple & Fret Express',
    whatsappNumber: settings.whatsappNumber || '+212674105702',
    facebookUrl: settings.facebookUrl || 'https://web.facebook.com/evaristekamiwa',
    defaultCurrency: settings.defaultCurrency || 'MGA',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateSettings(formData)
    toast({
      title: 'Paramètres mis à jour',
      description: 'Le numéro WhatsApp et les liens ont été synchronisés sur l’ensemble du site.',
      type: 'success',
    })
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Paramètres Généraux</h1>
        <p className="text-xs text-neutral-400 mt-1">
          Source de vérité unique pour les numéros de contact, liens sociaux et configurations globales.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Identité */}
        <div className="bg-[#111113] border border-white/8 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Identité Commerciale</span>
          </div>

          <Input
            label="Nom de l'activité / Vendeur"
            value={formData.businessName}
            onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
            required
          />

          <Input
            label="Slogan / Sous-titre"
            value={formData.tagline}
            onChange={(e) => setFormData((prev) => ({ ...prev, tagline: e.target.value }))}
            required
          />
        </div>

        {/* Canaux de contact */}
        <div className="bg-[#111113] border border-white/8 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
            <PhoneCall className="w-4 h-4 text-[#25D366]" />
            <span>Coordonnées & Réseaux</span>
          </div>

          <Input
            label="Numéro WhatsApp International (avec indicatif pays, sans espaces ni tirets)"
            value={formData.whatsappNumber}
            onChange={(e) => setFormData((prev) => ({ ...prev, whatsappNumber: e.target.value }))}
            placeholder="+212674105702"
            required
          />
          <p className="text-[11px] text-neutral-400 -mt-2">
            Tous les boutons "Commander", "Devis" et contact direct du site utilisent ce numéro unique.
          </p>

          <Input
            label="URL de la page Facebook"
            value={formData.facebookUrl}
            onChange={(e) => setFormData((prev) => ({ ...prev, facebookUrl: e.target.value }))}
            placeholder="https://web.facebook.com/..."
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={<Save className="w-4 h-4" />}
          >
            Enregistrer les réglages
          </Button>
        </div>
      </form>
    </div>
  )
}
