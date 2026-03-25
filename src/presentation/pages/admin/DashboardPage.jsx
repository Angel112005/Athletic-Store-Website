import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, Tag, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import { getAllProducts } from '@/infrastructure/supabase/productRepository'
import { getAllCategories } from '@/infrastructure/supabase/categoryRepository'
import { SectionLoader } from '@/presentation/components/ui/Spinner'
import Button from '@/presentation/components/ui/Button'

function StatCard({ icon: Icon, label, value, color = 'gold' }) {
  const colors = {
    gold:    { bg: 'bg-[var(--color-gold-muted)]', icon: 'text-[var(--color-gold)]' },
    success: { bg: 'bg-green-500/10',               icon: 'text-green-400' },
    blue:    { bg: 'bg-blue-500/10',                icon: 'text-blue-400' },
  }
  const c = colors[color] ?? colors.gold

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6 flex items-center gap-5">
      <div className={`w-12 h-12 rounded-sm ${c.bg} flex items-center justify-center shrink-0`}>
        <Icon size={22} className={c.icon} />
      </div>
      <div>
        <p className="text-2xl font-black">{value}</p>
        <p className="text-xs text-[var(--color-text-muted)] tracking-widest uppercase mt-0.5">{label}</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const [stats,   setStats]   = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([getAllProducts(), getAllCategories()])
      .then(([products, categories]) => {
        setStats({
          total:      products.length,
          active:     products.filter((p) => p.isActive).length,
          inactive:   products.filter((p) => !p.isActive).length,
          categories: categories.length,
          withDiscount: products.filter((p) => p.hasDiscount).length,
        })
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <SectionLoader />

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-black uppercase tracking-wide">Dashboard</h1>
        <p className="text-sm text-[var(--color-text-muted)] mt-1">
          Bienvenido al panel de administración
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-12">
        <StatCard icon={Package}   label="Productos totales" value={stats?.total ?? 0}          color="gold"    />
        <StatCard icon={TrendingUp} label="Activos"           value={stats?.active ?? 0}         color="success" />
        <StatCard icon={Package}   label="Inactivos"          value={stats?.inactive ?? 0}       color="blue"    />
        <StatCard icon={Tag}       label="Categorías"         value={stats?.categories ?? 0}     color="gold"    />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4">Acciones rápidas</h2>
          <div className="flex flex-col gap-3">
            <Link to="/admin/productos/nuevo">
              <Button size="sm" className="w-full justify-start gap-3">
                <Plus size={16} />
                Nuevo producto
              </Button>
            </Link>
            <Link to="/admin/productos">
              <Button variant="secondary" size="sm" className="w-full justify-start gap-3">
                <Package size={16} />
                Ver todos los productos
                <ArrowRight size={14} className="ml-auto" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest mb-4">Resumen</h2>
          <ul className="space-y-3">
            {[
              { label: 'Productos con descuento', value: stats?.withDiscount ?? 0 },
              { label: 'Tasa de activación',      value: stats?.total ? `${Math.round((stats.active / stats.total) * 100)}%` : '0%' },
            ].map(({ label, value }) => (
              <li key={label} className="flex items-center justify-between text-sm">
                <span className="text-[var(--color-text-muted)]">{label}</span>
                <span className="font-semibold text-[var(--color-gold)]">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
