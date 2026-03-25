import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, EyeOff, Search, Package } from 'lucide-react'
import { useAdminProducts } from '@/application/hooks/useAdminProducts'
import { ConfirmDialog } from '@/presentation/components/ui/Modal'
import { SectionLoader } from '@/presentation/components/ui/Spinner'
import Badge from '@/presentation/components/ui/Badge'
import Button from '@/presentation/components/ui/Button'
import { useToast } from '@/presentation/components/ui/Toast'

export default function ProductsPage() {
  const { products, loading, error, remove, toggle } = useAdminProducts()
  const toast = useToast()

  const [search,       setSearch]       = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.brand ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const handleToggle = async (product) => {
    try {
      await toggle(product.id, !product.isActive)
      toast.success(`Producto ${!product.isActive ? 'activado' : 'desactivado'}`)
    } catch {
      toast.error('Error al cambiar estado')
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    try {
      await remove(deleteTarget.id)
      toast.success('Producto eliminado')
    } catch {
      toast.error('Error al eliminar')
    }
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wide">Productos</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {products.length} productos en total
          </p>
        </div>
        <Link to="/admin/productos/nuevo">
          <Button size="sm">
            <Plus size={16} />
            Nuevo producto
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)]" />
        <input
          type="text"
          placeholder="Buscar por nombre o marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm text-white placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 p-3 bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 rounded-sm">
          <p className="text-sm text-[var(--color-error)]">{error}</p>
        </div>
      )}

      {loading ? (
        <SectionLoader />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-4 text-[var(--color-text-muted)]">
          <Package size={48} strokeWidth={1} />
          <p className="text-sm">No hay productos</p>
          <Link to="/admin/productos/nuevo">
            <Button size="sm">
              <Plus size={14} />
              Crear el primero
            </Button>
          </Link>
        </div>
      ) : (
        /* Table */
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  {['Producto', 'Marca', 'Categoría', 'Precio', 'Estado', 'Acciones'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[10px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)] whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, i) => (
                  <tr
                    key={product.id}
                    className="border-b border-[var(--color-border)] last:border-0 hover:bg-white/[0.02] transition-colors group"
                  >
                    {/* Producto */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.mainImageUrl ? (
                          <img
                            src={product.mainImageUrl}
                            alt={product.name}
                            className="w-10 h-10 rounded-sm object-cover bg-[var(--color-surface-2)] shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-sm bg-[var(--color-surface-2)] flex items-center justify-center shrink-0">
                            <Package size={16} className="text-[var(--color-text-faint)]" />
                          </div>
                        )}
                        <span className="font-medium text-white line-clamp-1 max-w-[180px]">
                          {product.name}
                        </span>
                      </div>
                    </td>

                    {/* Marca */}
                    <td className="px-4 py-3 text-[var(--color-text-muted)] whitespace-nowrap">
                      {product.brand || '—'}
                    </td>

                    {/* Categoría */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {product.category ? (
                        <Badge variant="muted">{product.category.name}</Badge>
                      ) : '—'}
                    </td>

                    {/* Precio */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="font-semibold text-white">{product.finalPriceFormatted}</span>
                      {product.hasDiscount && (
                        <span className="ml-2 text-xs text-[var(--color-text-faint)] line-through">
                          {product.originalPriceFormatted}
                        </span>
                      )}
                    </td>

                    {/* Estado */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Badge variant={product.isActive ? 'success' : 'muted'}>
                        {product.isActive ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>

                    {/* Acciones */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                        {/* Toggle */}
                        <button
                          onClick={() => handleToggle(product)}
                          title={product.isActive ? 'Desactivar' : 'Activar'}
                          className="p-2 rounded-sm text-[var(--color-text-muted)] hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {product.isActive ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>

                        {/* Edit */}
                        <Link
                          to={`/admin/productos/${product.id}/editar`}
                          className="p-2 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-gold)] hover:bg-[var(--color-gold-muted)] transition-colors"
                          title="Editar"
                        >
                          <Pencil size={15} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteTarget(product)}
                          title="Eliminar"
                          className="p-2 rounded-sm text-[var(--color-text-muted)] hover:text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirm delete */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Eliminar producto"
        message={`¿Estás seguro de que quieres eliminar "${deleteTarget?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
        variant="danger"
      />
    </div>
  )
}
