import { Routes, Route, Navigate } from 'react-router-dom'

// Layouts
import PublicLayout from '@/presentation/layouts/PublicLayout'
import AdminLayout  from '@/presentation/layouts/AdminLayout'

// Guards
import ProtectedRoute from './ProtectedRoute'

// Public pages
import HomePage          from '@/presentation/pages/public/HomePage'
import CatalogPage       from '@/presentation/pages/public/CatalogPage'
import ProductDetailPage from '@/presentation/pages/public/ProductDetailPage'
import FavoritesPage     from '@/presentation/pages/public/FavoritesPage'

// Admin pages
import LoginPage      from '@/presentation/pages/admin/LoginPage'
import DashboardPage  from '@/presentation/pages/admin/DashboardPage'
import ProductsPage   from '@/presentation/pages/admin/ProductsPage'
import ProductFormPage from '@/presentation/pages/admin/ProductFormPage'

// Toast provider
import { ToastProvider } from '@/presentation/components/ui/Toast'

export default function AppRouter() {
  return (
    <ToastProvider>
      <Routes>
        {/* ── PUBLIC ── */}
        <Route element={<PublicLayout />}>
          <Route path="/"               element={<HomePage />} />
          <Route path="/catalogo"       element={<CatalogPage />} />
          <Route path="/producto/:id"   element={<ProductDetailPage />} />
          <Route path="/favoritos"      element={<FavoritesPage />} />
        </Route>

        {/* ── ADMIN LOGIN (sin layout) ── */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* ── ADMIN PROTECTED ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin"                              element={<DashboardPage />} />
            <Route path="/admin/productos"                    element={<ProductsPage />} />
            <Route path="/admin/productos/nuevo"              element={<ProductFormPage />} />
            <Route path="/admin/productos/:id/editar"         element={<ProductFormPage />} />
          </Route>
        </Route>

        {/* ── CATCH ALL ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  )
}
