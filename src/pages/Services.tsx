import React, { useState } from 'react'
import { Plane, ShieldCheck, Clock, MapPin, MessageCircle, AlertCircle, CheckCircle } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { openWhatsApp } from '@/lib/whatsapp'
import { DEFAULT_SERVICES } from '@/data/services'

export const Services: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState('Madagascar ↔ Île Maurice')
  const [packageType, setPackageType] = useState('Colis standard / Marchandises')
  const [approxWeight, setApproxWeight] = useState('')

  const handleQuoteRequest = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Bonjour Evariste, je souhaite un devis pour un envoi de colis :\n- Trajet : ${selectedRoute}\n- Type : ${packageType}\n- Poids estimé : ${approxWeight || 'Non précisé'}`
    openWhatsApp(msg)
  }

  const steps = [
    {
      num: '1',
      title: 'Prise de contact & Devis',
      desc: 'Transmettez le poids, le volume et la nature de votre envoi pour recevoir les dates de vol et un tarif précis.',
    },
    {
      num: '2',
      title: 'Dépôt & Conditionnement',
      desc: 'Remise du colis au point de dépôt convenu. Contrôle de conformité et emballage protecteur.',
    },
    {
      num: '3',
      title: 'Transport Express Aérien',
      desc: 'Acheminement rapide sur notre prochain voyage avec suivi étape par étape.',
    },
    {
      num: '4',
      title: 'Récupération Sécurisée',
      desc: 'Remise en main propre au destinataire sur présentation d’une pièce d’identité.',
    },
  ]

  return (
    <div className="pt-32 pb-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-3">
            <Plane className="w-3.5 h-3.5" />
            <span>Fret & Logistique Express</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Envoi de Colis Madagascar, Maurice & Dubaï
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 mt-3 leading-relaxed">
            Un service de proximité fiable pour expédier documents confidentiels, achats personnels, pièces détachées et marchandises commerciales.
          </p>
        </div>

        {/* Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {DEFAULT_SERVICES.map((s) => (
            <div
              key={s.id}
              className="bg-[#111113] border border-white/10 rounded-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 text-sm font-semibold text-blue-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{s.origin} ↔ {s.destination}</span>
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">{s.name}</h2>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">{s.description}</p>

                <div className="space-y-2.5 text-xs text-neutral-300 border-t border-white/8 pt-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400" />
                    <span>Fréquence : Liaisons régulières selon planning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Remise en mains propres garantie</span>
                  </div>
                </div>
              </div>

              <Button
                variant="whatsapp"
                size="md"
                icon={<MessageCircle className="w-4 h-4 fill-black" />}
                onClick={() => openWhatsApp(`Bonjour Evariste, je souhaite connaître les prochaines dates de départ pour : ${s.name}.`)}
              >
                Demander les prochaines dates
              </Button>
            </div>
          ))}
        </div>

        {/* 4 Steps Section */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Comment fonctionne notre service colis ?
            </h3>
            <p className="text-xs text-neutral-400 mt-1">
              Un processus transparent, fluide et rassurant du dépôt à la livraison.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((st) => (
              <div key={st.num} className="bg-[#111113] border border-white/8 rounded-xl p-5 relative">
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-sm text-white mb-4">
                  {st.num}
                </span>
                <h4 className="text-sm font-bold text-white mb-1.5">{st.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Quote Calculator / Inquiry */}
        <div className="bg-[#111113] border border-white/10 rounded-2xl p-6 sm:p-10 max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-white">Demande de devis express</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Remplissez ces informations pour générer un message clair sur WhatsApp.
            </p>
          </div>

          <form onSubmit={handleQuoteRequest} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Trajet souhaité
              </label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              >
                <option value="Madagascar ↔ Île Maurice">Madagascar ↔ Île Maurice</option>
                <option value="Madagascar ↔ Dubaï">Madagascar ↔ Dubaï</option>
                <option value="Autre demande spécifique">Autre trajet sur demande</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Nature du colis
              </label>
              <select
                value={packageType}
                onChange={(e) => setPackageType(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              >
                <option value="Colis standard / Marchandises">Colis standard / Marchandises</option>
                <option value="Documents / Plis confidentiels">Documents / Plis confidentiels</option>
                <option value="Matériel électronique / Téléphone">Matériel électronique / Téléphone</option>
                <option value="Effets personnels">Effets personnels</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                Poids approximatif (ex: 2 kg, 5 kg, 10 kg)
              </label>
              <input
                type="text"
                placeholder="Ex: 3 kg"
                value={approxWeight}
                onChange={(e) => setApproxWeight(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
              />
            </div>

            <Button
              type="submit"
              variant="whatsapp"
              size="lg"
              className="w-full justify-center mt-2"
              icon={<MessageCircle className="w-5 h-5 fill-black" />}
            >
              Envoyer la demande sur WhatsApp
            </Button>
          </form>
        </div>
      </Container>
    </div>
  )
}
