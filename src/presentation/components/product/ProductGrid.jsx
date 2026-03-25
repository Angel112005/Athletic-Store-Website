import ProductCard from './ProductCard'
import { SectionLoader } from '@/presentation/components/ui/Spinner'
import { Package } from 'lucide-react'

/**
 * ProductGrid — grid responsive de tarjetas de producto
 */

export default function ProductGrid({ products, loading, error }) {
  if (loading) return <SectionLoader text="Cargando productos..." />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <p className="text-[var(--color-error)] text-sm">Error al cargar productos: {error}</p>
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-[var(--color-text-muted)]">
        <Package size={48} strokeWidth={1} />
        <p className="text-sm">No se encontraron productos</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, i) => (
        <div
          key={product.id}
          className="animate-fade-in-up"
          style={{ animationDelay: `${i * 60}ms`, opacity: 0, animationFillMode: 'forwards' }}
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  )
}
