import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/application/hooks/useAuth'
import { PageLoader } from '@/presentation/components/ui/Spinner'

/**
 * ProtectedRoute — protege las rutas del admin.
 * Redirige a /admin/login si no hay sesión activa.
 */

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) return <PageLoader />

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />
}
