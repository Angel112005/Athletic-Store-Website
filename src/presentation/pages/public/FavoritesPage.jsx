import { Link } from 'react-router-dom'
import { Heart, Trash2 } from 'lucide-react'
import { useWishlist } from '@/application/context/WishlistContext'
import ProductCard from '@/presentation/components/product/ProductCard'
import Button from '@/presentation/components/ui/Button'

export default function FavoritesPage() {
  const { items, clear } = useWishlist()

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">
            Lista de deseos
          </p>
          <div className="flex items-end justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-black uppercase">
              Favoritos
              {items.length > 0 && (
                <span className="ml-3 text-lg text-[var(--color-text-muted)] font-normal normal-case">
                  ({items.length} {items.length === 1 ? 'producto' : 'productos'})
                </span>
              )}
            </h1>
            {items.length > 0 && (
              <button
                onClick={clear}
                className="flex items-center gap-2 text-xs text-[var(--color-error)] hover:text-red-400 transition-colors shrink-0"
              >
                <Trash2 size={14} />
                Limpiar lista
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--color-surface-2)] border border-[var(--color-border)] flex items-center justify-center mb-6">
              <Heart size={32} className="text-[var(--color-text-faint)]" />
            </div>
            <h2 className="text-xl font-black uppercase mb-3">Tu lista está vacía</h2>
            <p className="text-[var(--color-text-muted)] text-sm max-w-xs mb-8 leading-relaxed">
              Guarda los productos que te interesan para encontrarlos fácilmente más tarde.
            </p>
            <Link to="/catalogo">
              <Button>Explorar catálogo</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
            {items.map((product, i) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${i * 60}ms`,
                  opacity: 0,
                  animationFillMode: 'forwards',
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
