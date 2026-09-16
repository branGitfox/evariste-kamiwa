import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomBar } from '@/components/layout/MobileBottomBar'
import { trackPageView } from '@/lib/analytics'

export const PublicLayout: React.FC = () => {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    trackPageView(location.pathname)
  }, [location.pathname])

  return (
    <div className="layout-public min-h-screen flex flex-col page-bg selection:bg-white/20">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  )
}
