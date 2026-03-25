import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '@/presentation/components/layout/Navbar'
import Breadcrumb from '@/presentation/components/layout/Breadcrumb'
import Footer from '@/presentation/components/layout/Footer'

/**
 * PublicLayout — envuelve todas las páginas públicas
 */

export default function PublicLayout() {
  const location = useLocation()

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Breadcrumb />
      <main
        key={location.pathname}
        className="flex-1 page-enter"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
