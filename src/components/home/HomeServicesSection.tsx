import React from 'react'
import { Link } from 'react-router-dom'
import { Plane, ArrowRight, ShieldCheck, Clock, MessageCircle, MapPin } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { openWhatsApp } from '@/lib/whatsapp'
import { DEFAULT_SERVICES } from '@/data/services'

export const HomeServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-transparent via-[#0a0a0c] to-transparent relative">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
              Logistique Internationale
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
              Services d’envoi de colis & fret
            </h2>
            <p className="text-sm text-neutral-400 mt-2 max-w-xl">
              Acheminez vos marchandises, documents urgents et commandes personnelles en toute sécurité grâce à nos liaisons régulières.
            </p>
          </div>

          <Link to="/services">
            <Button variant="outline" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
              Tous nos services
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DEFAULT_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-[#111113] border border-white/8 hover:border-white/15 rounded-2xl p-7 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header route */}
                <div className="flex items-center justify-between gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-neutral-400" />
                      {service.origin}
                    </span>
                    <span className="text-neutral-500">↔</span>
                    <span className="text-sm font-bold text-white flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      {service.destination}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Aérien express
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                    <span>Délai moyen : 3 à 7 jours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Suivi direct WhatsApp</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/8 flex items-center justify-between gap-3">
                <span className="text-xs text-neutral-400">
                  Tarif adapté selon poids et volume
                </span>
                <Button
                  variant="whatsapp"
                  size="sm"
                  icon={<MessageCircle className="w-4 h-4 fill-black" />}
                  onClick={() => openWhatsApp(`Bonjour Evariste, je souhaite expédier un colis sur le trajet ${service.name}.`)}
                >
                  Devis WhatsApp
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
