import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MessageCircle, Menu, X, Smartphone, Sun, Moon, Shield } from 'lucide-react'
import { openWhatsApp } from '@/lib/whatsapp'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { useTheme } from '@/hooks/useTheme'
import { Button } from '@/components/ui/Button'
import { Container } from './Container'

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { settings } = useSiteSettings()
  const { isDark, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'iPhones', path: '/iphone' },
    { name: 'Services Colis', path: '/services' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'header-glass bg-[#050505]/85 backdrop-blur-md border-b border-white/8 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-white p-1 border border-white/20 shadow-md flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform shrink-0">
              <img src="/logo.png" alt="Neutra Mobile" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="block font-extrabold text-white text-base leading-tight tracking-tight">
                {settings.businessName || 'NEUTRA MOBILE'}
              </span>
              <span className="block text-[11px] text-neutral-400 font-medium">
                {settings.tagline || 'Apple by Evariste Kamiwa'}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/8 px-3 py-1.5 rounded-full">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title={isDark ? 'Mode clair' : 'Mode sombre'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              to="/admin"
              className="p-2.5 rounded-xl border border-white/10 text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Accès Espace Vendeur"
              aria-label="Admin"
            >
              <Shield className="w-4 h-4" />
            </Link>

            <Button
              variant="whatsapp"
              size="sm"
              icon={<MessageCircle className="w-4 h-4" />}
              onClick={() => openWhatsApp('Bonjour Evariste, je vous contacte depuis votre site web.')}
            >
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-white/10 text-neutral-400"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-white/10 text-neutral-300 hover:text-white"
              aria-label="Ouvrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[60px] bg-[#0d0d0f] border-b border-white/10 p-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-neutral-300 hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
              <Button
                variant="whatsapp"
                className="w-full justify-center"
                icon={<MessageCircle className="w-5 h-5" />}
                onClick={() => openWhatsApp('Bonjour Evariste, je viens de votre site.')}
              >
                WhatsApp Direct
              </Button>
              <Link to="/admin" className="text-center text-xs text-neutral-400 py-2">
                Accès Espace Gestion
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
