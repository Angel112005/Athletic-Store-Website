import { Link, useLocation } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

/**
 * Breadcrumb — Navigation breadcrumbs
 */

const BREADCRUMB_LABELS = {
  '/': 'Inicio',
  '/catalogo': 'Catálogo',
  '/producto': 'Producto',
}

export default function Breadcrumb() {
  const location = useLocation()
  const pathname = location.pathname

  // Generate breadcrumb paths
  const getBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean)

    const breadcrumbs = [{ label: 'Inicio', href: '/' }]

    let currentPath = ''
    for (const path of paths) {
      currentPath += `/${path}`
      const label = BREADCRUMB_LABELS[currentPath] || path.charAt(0).toUpperCase() + path.slice(1)
      breadcrumbs.push({ label, href: currentPath })
    }

    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs()

  // No show breadcrumb on home page
  if (pathname === '/') return null

  return (
    <nav className="bg-[var(--color-surface)] border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center gap-2 text-xs">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1

            return (
              <div key={crumb.href} className="flex items-center gap-2">
                {isLast ? (
                  <span className="text-[var(--color-text-muted)]">{crumb.label}</span>
                ) : (
                  <>
                    <Link
                      to={crumb.href}
                      className="text-[var(--color-text-muted)] hover:text-[var(--color-gold)] transition-colors duration-200"
                    >
                      {crumb.label}
                    </Link>
                    <ChevronRight size={14} className="text-[var(--color-border)]" />
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
