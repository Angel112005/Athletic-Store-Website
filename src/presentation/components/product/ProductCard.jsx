import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import Badge from '@/presentation/components/ui/Badge'
import { useWishlist } from '@/application/context/WishlistContext'
import QuickViewModal from './QuickViewModal'

/**
 * ProductCard — tarjeta premium de producto
 */

export default function ProductCard({ product }) {
  const { toggle, has } = useWishlist()
  const [quickViewOpen, setQuickViewOpen] = useState(false)

  const {
    id,
    name,
    brand,
    mainImageUrl,
    originalPriceFormatted,
    finalPriceFormatted,
    hasDiscount,
    discountPercentage,
    category,
  } = product

  const isWishlisted = has(id)

  return (
    <>
      <Link
        to={`/producto/${id}`}
        className="group flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm overflow-hidden hover:border-[var(--color-gold)]/50 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(217,170,75,0.15)]"
      >
        {/* Imagen Container */}
        <div
          className="relative overflow-hidden bg-gradient-to-b from-[var(--color-surface-2)] to-[var(--color-surface)] flex items-center justify-center"
          style={{ aspectRatio: '1' }}
        >
          {mainImageUrl ? (
            <img
              src={mainImageUrl}
              alt={name}
              className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[var(--color-text-faint)]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
          )}

          {/* Discount badge */}
          {hasDiscount && (
            <div className="absolute top-3 left-3">
              <Badge variant="gold">-{discountPercentage}%</Badge>
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product) }}
            aria-label={isWishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full border-2 transition-all duration-200 opacity-0 group-hover:opacity-100 ${
              isWishlisted
                ? 'bg-[var(--color-gold)] border-[var(--color-gold)] text-black scale-110'
                : 'bg-black/60 border-white/20 text-white hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]'
            }`}
          >
            <Heart size={13} className={isWishlisted ? 'fill-black' : ''} />
          </button>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Quick view bar */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewOpen(true) }}
            className="absolute inset-x-0 bottom-0 py-3 bg-gradient-to-t from-[var(--color-gold)] to-[var(--color-gold)]/80 text-black text-center text-xs font-bold tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          >
            Vista rápida
          </button>
        </div>

        {/* Info Section */}
        <div className="flex flex-col flex-1 p-4 gap-3">
          {brand && (
            <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
              {brand}
            </p>
          )}

          <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-[var(--color-gold)] transition-colors duration-200">
            {name}
          </h3>

          {/* Precio - pushed to bottom */}
          <div className="flex items-baseline gap-2 mt-auto pt-2 border-t border-[var(--color-border)]/30">
            <span className="text-base font-black text-white">
              {finalPriceFormatted}
            </span>
            {hasDiscount && (
              <span className="text-xs text-[var(--color-text-faint)] line-through">
                {originalPriceFormatted}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick view modal — rendered via portal outside the Link */}
      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  )
}
