import React, { useState } from 'react'
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Smartphone,
  Plane,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react'
import { isAuthenticated, logout } from '@/lib/auth'

export const AdminLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  // Redirect if not logged in — use Navigate component (declarative, safe in StrictMode)
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  const navItems = [
    { label: 'Tableau de bord', path: '/admin', icon: LayoutDashboard },
    { label: 'Gestion iPhones', path: '/admin/products', icon: Smartphone },
    { label: 'Services Colis', path: '/admin/services', icon: Plane },
    { label: 'Contenus du Site', path: '/admin/content', icon: FileText },
    { label: 'Statistiques', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Paramètres', path: '/admin/settings', icon: Settings },
  ]

  const isActive = (path: string) => {
    if (path === '/admin' && location.pathname === '/admin') return true
    if (path !== '/admin' && location.pathname.startsWith(path)) return true
    return false
  }

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/8 bg-[#0d0d0f] p-5 shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/8 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white p-1 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
            <img src="/logo.png" alt="Neutra Mobile" className="w-full h-full object-contain" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white leading-tight">Neutra Mobile</h2>
            <span className="text-[10px] text-neutral-400">Espace Administration</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-black' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-white/8 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs text-neutral-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Voir le site public
            </span>
            <span className="text-[10px] text-neutral-500">↗</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar on Mobile / Tablet */}
        <header className="lg:hidden bg-[#0d0d0f] border-b border-white/8 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white p-0.5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0">
              <img src="/logo.png" alt="Neutra Mobile" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-sm">Neutra Mobile — Gestion</span>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg border border-white/10 text-neutral-300"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0d0d0f] border-b border-white/10 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.path)
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium ${
                    active ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            <div className="pt-2 border-t border-white/8 flex items-center justify-between">
              <Link to="/" className="text-xs text-neutral-400">Voir le site</Link>
              <button onClick={handleLogout} className="text-xs text-red-400">Déconnexion</button>
            </div>
          </div>
        )}

        {/* Page body */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
