import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Smartphone, Package, MessageCircle, PhoneCall } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'

export const MobileBottomBar: React.FC = () => {
  const location = useLocation()

  const tabs = [
    { label: 'Accueil', path: '/', icon: Home },
    { label: 'iPhones', path: '/iphone', icon: Smartphone },
    { label: 'Colis', path: '/services', icon: Package },
    { label: 'Contact', path: '/contact', icon: PhoneCall },
  ]

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-lg border-t border-white/10 px-3 py-2 flex items-center justify-around shadow-2xl">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const active = isActive(tab.path)
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-medium transition-colors ${
              active ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Icon className={`w-5 h-5 ${active ? 'text-white stroke-[2.2]' : 'text-neutral-400'}`} />
            <span>{tab.label}</span>
          </Link>
        )
      })}

      {/* Floating WhatsApp Quick Contact Action */}
      <button
        onClick={() => openWhatsApp('Bonjour Evariste, je vous contacte depuis mon mobile.')}
        className="flex flex-col items-center gap-1 py-1 px-3 rounded-lg text-[10px] font-semibold text-[#25D366]"
        aria-label="Contacter sur WhatsApp"
      >
        <div className="w-8 h-8 rounded-full bg-[#25D366] text-black flex items-center justify-center shadow-lg shadow-[#25D366]/30">
          <MessageCircle className="w-4 h-4 fill-black" />
        </div>
        <span>WhatsApp</span>
      </button>
    </div>
  )
}
