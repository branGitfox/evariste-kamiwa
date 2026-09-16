import React from 'react'
import { MessageCircle, PhoneCall, Shield } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { openWhatsApp } from '@/lib/whatsapp'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export const HomeCTASection: React.FC = () => {
  const { settings } = useSiteSettings()

  return (
    <section className="py-20 relative overflow-hidden">
      <Container>
        <div className="cta-banner relative rounded-3xl bg-gradient-to-r from-neutral-900 via-[#131317] to-neutral-900 border border-white/10 p-8 sm:p-14 overflow-hidden shadow-2xl">
          {/* Subtle decorative elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#25D366]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-neutral-300 mb-4">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Réponse rapide garantie sous quelques heures</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Prêt à trouver votre iPhone ou planifier un envoi ?
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 mt-4 leading-relaxed">
              Discutez directement avec Evariste Kamiwa sur WhatsApp pour obtenir les disponibilités en temps réel, poser vos questions et réserver votre modèle sans démarche superflue.
            </p>

            <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="w-5 h-5 fill-black" />}
                onClick={() => openWhatsApp('Bonjour Evariste, je souhaite échanger sur une commande ou un envoi de colis.')}
              >
                Écrire sur WhatsApp ({settings.whatsappNumber})
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
