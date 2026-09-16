import React from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, Facebook, ShieldCheck, Plane, Smartphone, Heart } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { Container } from './Container'

export const Footer: React.FC = () => {
  const { settings } = useSiteSettings()

  return (
    <footer className="bg-[#0a0a0c] border-t border-white/8 pt-16 pb-24 md:pb-12 text-neutral-400 text-sm">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/8">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white p-1 border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                <img src="/logo.png" alt="Neutra Mobile" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base leading-tight block">
                  {settings.businessName || 'NEUTRA MOBILE'}
                </span>
                <span className="text-[10px] text-neutral-400 font-medium block">
                  Apple by Evariste Kamiwa
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Vente d'iPhones testés et garantis. Services d'envoi de colis sécurisés entre Madagascar, Maurice et Dubaï.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => openWhatsApp('Bonjour Evariste, je souhaite échanger avec vous.')}
                className="footer-social-btn w-10 h-10 rounded-xl bg-neutral-800/80 hover:bg-[#25D366] text-white hover:text-black flex items-center justify-center transition-all border border-white/10 shadow-sm group"
                title="WhatsApp Neutra Mobile"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-black transition-colors" />
              </button>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn w-10 h-10 rounded-xl bg-neutral-800/80 hover:bg-[#1877F2] text-white flex items-center justify-center transition-all border border-white/10 shadow-sm group"
                title="Page Facebook Neutra Mobile"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-[#1877F2] group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Catalogue
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/iphone" className="hover:text-white transition-colors flex items-center gap-2">
                  <Smartphone className="w-3.5 h-3.5" />
                  Tous les iPhones
                </Link>
              </li>
              <li>
                <Link to="/iphone?model=15" className="hover:text-white transition-colors">
                  iPhone 15 Series
                </Link>
              </li>
              <li>
                <Link to="/iphone?model=16" className="hover:text-white transition-colors">
                  iPhone 16 Series
                </Link>
              </li>
              <li>
                <Link to="/iphone?model=14" className="hover:text-white transition-colors">
                  iPhone 14 Series
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Services Colis
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center gap-2">
                  <Plane className="w-3.5 h-3.5" />
                  Madagascar ↔ Île Maurice
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center gap-2">
                  <Plane className="w-3.5 h-3.5" />
                  Madagascar ↔ Dubaï
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Transport Sécurisé & Suivi
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact rapide */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Contact Direct
            </h4>
            <div className="space-y-2.5 text-xs">
              <p className="text-neutral-300 font-medium">WhatsApp :</p>
              <button
                onClick={() => openWhatsApp()}
                className="text-[#25D366] hover:underline font-mono"
              >
                {settings.whatsappNumber}
              </button>
              <p className="text-neutral-400 pt-2">
                Échanges directs, transparence totale et remise en main propre selon convenance.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} Neutra Mobile · Apple by Evariste Kamiwa. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-neutral-400">À propos</Link>
            <span>•</span>
            <Link to="/contact" className="hover:text-neutral-400">Contact</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-neutral-400">Espace Admin</Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
