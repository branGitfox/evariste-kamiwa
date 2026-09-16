import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from '@/components/ui/Toast'
import { PublicLayout } from '@/layouts/PublicLayout'
import { AdminLayout } from '@/layouts/AdminLayout'

// Public Pages
import { Home } from '@/pages/Home'
import { Products } from '@/pages/Products'
import { ProductDetails } from '@/pages/ProductDetails'
import { Services } from '@/pages/Services'
import { About } from '@/pages/About'
import { Contact } from '@/pages/Contact'

// Admin Pages
import { Login } from '@/pages/admin/Login'
import { Dashboard } from '@/pages/admin/Dashboard'
import { AdminProducts } from '@/pages/admin/AdminProducts'
import { ProductEditor } from '@/pages/admin/ProductEditor'
import { AdminServices } from '@/pages/admin/AdminServices'
import { Content } from '@/pages/admin/Content'
import { Analytics } from '@/pages/admin/Analytics'
import { Settings } from '@/pages/admin/Settings'

export function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/iphone" element={<Products />} />
            <Route path="/iphone/:id" element={<ProductDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<ProductEditor />} />
            <Route path="products/:id/edit" element={<ProductEditor />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="content" element={<Content />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App
