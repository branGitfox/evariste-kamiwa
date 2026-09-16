import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, UserCheck, Sparkles, MessageCircle, ArrowRight } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { openWhatsApp } from '@/lib/whatsapp'
import evImage from '@/assets/images/ev.jpeg'

export const About: React.FC = () => {
  return (
    <div className="pt-32 pb-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-2 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-2xl">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900">
                <img
                  src={evImage}
                  alt="Evariste Kamiwa"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Bio & Vision */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 border border-white/20 shadow-md flex items-center justify-center overflow-hidden shrink-0">
                <img src="/logo.png" alt="Neutra Mobile" className="w-full h-full object-contain" />
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300">
                <UserCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>À propos de Neutra Mobile</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Neutra Mobile
            </h1>
            <p className="text-sm font-semibold text-blue-400">
              L'univers Apple certifié & expéditions express · Fondé par Evariste Kamiwa
            </p>

            <p className="text-base text-neutral-300 leading-relaxed">
              Chez <strong>Neutra Mobile</strong>, notre mission est claire : <strong>offrir l’excellence Apple en toute confiance</strong> ainsi qu’une logistique d’envoi de colis fluide et sécurisée entre l’océan Indien et le Moyen-Orient.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Sur un marché où les copies, les téléphones reconditionnés de mauvaise facture ou les pièces contrefaites pullulent, je m’engage personnellement à ne proposer que des iPhones 100% authentiques, rigoureusement audités avant toute transaction.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              Parallèlement, mes déplacements fréquents entre <strong>Madagascar</strong>, <strong>l'Île Maurice</strong> et <strong>Dubaï</strong> m’ont naturellement conduit à proposer un service de transport de colis sécurisé, rapide et direct, offrant une alternative sereine aux circuits logistiques traditionnels.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Button
                variant="whatsapp"
                size="md"
                icon={<MessageCircle className="w-4 h-4 fill-black" />}
                onClick={() => openWhatsApp('Bonjour Evariste, je souhaite échanger avec vous.')}
              >
                Prendre contact sur WhatsApp
              </Button>
              <Link to="/iphone">
                <Button variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Consulter les iPhones
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 3 Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/8">
          <div className="p-6 rounded-2xl bg-[#111113] border border-white/8">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Exigence Technique</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Diagnostic complet batterie, écran d'origine, Face ID, déblocage réseau et iCloud. Aucun compromis n'est fait.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111113] border border-white/8">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Transparence Totale</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Rapports d'état réels et photographies contractuelles avant tout engagement. Vous savez exactement ce que vous achetez.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111113] border border-white/8">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">Accompagnement Humain</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Un seul numéro, un seul interlocuteur responsable. Conseil personnalisé pour choisir le modèle selon vos besoins réels.
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
