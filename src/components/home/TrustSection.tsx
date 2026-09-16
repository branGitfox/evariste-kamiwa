import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Eye, PlaneTakeoff, UserCheck } from 'lucide-react'
import { Container } from '@/components/layout/Container'

export const TrustSection: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'iPhones 100% Originaux',
      description: 'Chaque appareil est scrupuleusement testé : état de la batterie, Face ID, True Tone, connectivité et absence de blocage iCloud.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
    },
    {
      icon: Eye,
      title: 'Transparence Absolue',
      description: 'Photos et vidéos réelles de l’appareil avant validation. Pas de mauvaises surprises : vous recevez exactement ce qui vous est présenté.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      icon: PlaneTakeoff,
      title: 'Liaisons Express Colis',
      description: 'Acheminement sécurisé de vos plis, colis et marchandises sur les axes Madagascar ↔ Île Maurice et Madagascar ↔ Dubaï.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      icon: UserCheck,
      title: 'Interlocuteur Unique',
      description: 'Vous échangez directement avec Evariste Kamiwa. Conseil sur-mesure, disponibilité réactive et suivi rigoureux jusqu’à la réception.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
  ]

  return (
    <section className="py-20 border-y border-white/5 bg-[#09090b]/50 relative">
      <Container>
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
            Engagement & Fiabilité
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 tracking-tight">
            Pourquoi faire confiance à Neutra Mobile ?
          </h2>
          <p className="text-sm text-neutral-400 mt-3">
            Des garanties concrètes pour un achat sans stress et des envois de colis en toute sérénité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#111113] border border-white/8 hover:border-white/15 rounded-2xl p-6 transition-all hover:bg-[#151518]"
              >
                <div className={`w-12 h-12 rounded-xl ${p.bg} ${p.color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{p.description}</p>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
