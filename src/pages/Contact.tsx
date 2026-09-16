import React, { useState } from 'react'
import { MessageCircle, Facebook, MapPin, Send, PhoneCall, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { openWhatsApp } from '@/lib/whatsapp'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export const Contact: React.FC = () => {
  const { settings } = useSiteSettings()
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('Achat iPhone')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    let fullMsg = `Bonjour Evariste, je suis ${name || 'un client du site'}.\nObjet : ${subject}`
    if (message) {
      fullMsg += `\nMessage : ${message}`
    }
    openWhatsApp(fullMsg)
  }

  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 mb-3">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>Contact Direct</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Échangeons sur votre projet
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Pour une demande d'iPhone en stock, une commande sur-mesure ou l'envoi d'un colis, je réponds personnellement avec réactivité.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#111113] border border-white/10 space-y-6">
              <div>
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                  Canal Prioritaire
                </span>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-white">WhatsApp Business</p>
                    <p className="text-xs text-[#25D366] font-mono mt-0.5">{settings.whatsappNumber}</p>
                  </div>
                  <Button
                    variant="whatsapp"
                    size="sm"
                    icon={<MessageCircle className="w-4 h-4 fill-black" />}
                    onClick={() => openWhatsApp('Bonjour Evariste, je vous écris directement.')}
                  >
                    Ouvrir
                  </Button>
                </div>
              </div>

              <div className="pt-4 border-t border-white/8">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block mb-2">
                  Réseaux Sociaux
                </span>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center">
                      <Facebook className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Page Facebook</p>
                      <p className="text-[11px] text-neutral-400">@evaristekamiwa</p>
                    </div>
                  </div>
                  <span className="text-xs text-neutral-400 group-hover:text-white transition-colors">→</span>
                </a>
              </div>

              <div className="pt-4 border-t border-white/8 space-y-3">
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                  Zones d'opération
                </span>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  <span>Madagascar (Antananarivo & provinces)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Île Maurice (Livraison & correspondances)</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span>Dubaï (Achats & logistique)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-[#111113] border border-white/10">
              <h2 className="text-xl font-bold text-white mb-2">Formulaire de contact direct</h2>
              <p className="text-xs text-neutral-400 mb-6">
                Ce formulaire prépare votre message WhatsApp de manière claire et structurée.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Votre Nom ou Prénom"
                  placeholder="Ex: Jean / Sarah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-300">
                    Objet de votre demande
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none"
                  >
                    <option value="Achat iPhone">Achat d'un iPhone spécifique</option>
                    <option value="Renseignement stock">Renseignement sur le stock disponible</option>
                    <option value="Envoi de colis Madagascar Maurice">Envoi colis Madagascar ↔ Maurice</option>
                    <option value="Envoi de colis Madagascar Dubaï">Envoi colis Madagascar ↔ Dubaï</option>
                    <option value="Autre demande">Autre demande</option>
                  </select>
                </div>

                <Textarea
                  label="Précisions sur votre demande"
                  placeholder="Modèle recherché, budget, date d'expédition souhaitée..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <Button
                  type="submit"
                  variant="whatsapp"
                  size="lg"
                  className="w-full justify-center"
                  icon={<Send className="w-4 h-4" />}
                >
                  Envoyer via WhatsApp
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
