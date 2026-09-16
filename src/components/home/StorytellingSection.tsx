import React from 'react'
import { motion } from 'framer-motion'
import { Search, CheckCircle2, Send, Sparkles } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import iphonePic from '@/assets/images/iphone-1.jpg'

export const StorytellingSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Trouvez votre iPhone idéal',
      desc: 'Parcourez les derniers modèles de la gamme Apple : iPhone 14, 15 Pro, 16 Pro Max. Choisissez votre capacité (128 Go à 1 To) et votre finition préférée.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Validez en toute sérénité',
      desc: 'Chaque appareil bénéficie d’un diagnostic poussé : santé de batterie attestée, capteurs vérifiés, composants 100% officiels sans aucun verrouillage.',
      icon: CheckCircle2,
    },
    {
      num: '03',
      title: 'Acheminé là où vous êtes',
      desc: 'Que vous soyez à Madagascar, à l’Île Maurice ou à Dubaï, la logistique est maîtrisée de bout en bout pour garantir une livraison rapide et intacte.',
      icon: Send,
    },
    {
      num: '04',
      title: 'Une relation de proximité',
      desc: 'Pas de centre d’appels impersonnel : vous traitez en direct avec Evariste Kamiwa sur WhatsApp pour un accompagnement personnalisé et convivial.',
      icon: Sparkles,
    },
  ]

  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image showcase with iphone-1.jpg */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl p-3 bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 shadow-2xl">
              <div className="aspect-square rounded-2xl overflow-hidden bg-neutral-950 flex items-center justify-center p-4">
                <img
                  src={iphonePic}
                  alt="iPhone présenté en boutique - Neutra Mobile"
                  className="w-full h-full object-cover object-center rounded-xl shadow-lg"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#111113] border border-white/10 rounded-xl px-4 py-2.5 shadow-xl">
                <span className="text-xs font-bold text-white block">Stock & Commande</span>
                <span className="text-[11px] text-[#25D366] font-medium">Disponibilité confirmée sur WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Steps */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">
                Parcours & Expérience
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight">
                Comment se déroule votre commande ?
              </h2>
            </div>

            <div className="space-y-6">
              {steps.map((step, idx) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-[#111113]/60 border border-white/5 hover:border-white/15 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-white font-mono text-xs font-bold">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <span>{step.title}</span>
                        <Icon className="w-4 h-4 text-blue-400" />
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
