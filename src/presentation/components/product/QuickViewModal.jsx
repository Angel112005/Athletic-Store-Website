import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { X, ArrowRight, Heart } from 'lucide-react'
import { useWishlist } from '@/application/context/WishlistContext'
import Badge from '@/presentation/components/ui/Badge'
import { COMMON_SIZES, COMMON_COLORS } from '@/domain/types/index'

export default function QuickViewModal({ product, onClose }) {
  const [selectedSize,  setSelectedSize]  = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)
  const { toggle, has } = useWishlist()

  const {
    id, name, brand, category,
    mainImageUrl, finalPriceFormatted, originalPriceFormatted,
    hasDiscount, discountPercentage,
  } = product

  const isWishlisted = has(id)

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.15s ease' }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Panel */}
      <div
        className="relative w-full max-w-2xl bg-[var(--color-surface)] border border-[var(--color-border-2)] rounded-sm shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ animation: 'fadeInUp 0.2s ease' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-sm text-[var(--color-text-muted)] hover:text-white transition-colors"
        >
          <X size={16} />
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Image */}
          <div className="bg-gradient-to-br from-[var(--color-surface-2)] to-[var(--color-surface)] flex items-center justify-center aspect-square">
            {mainImageUrl ? (
              <img
                src={mainImageUrl}
                alt={name}
                className="w-full h-full object-contain p-6"
              />
            ) : (
              <div className="text-[var(--color-text-faint)]">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-6 flex flex-col">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {category    && <Badge variant="muted">{category.name}</Badge>}
              {hasDiscount && <Badge variant="gold">-{discountPercentage}% OFF</Badge>}
            </div>

            {brand && (
              <p className="text-[10px] font-semibold tracking-[0.3em] uppercase text-[var(--color-gold)] mb-1">
                {brand}
              </p>
            )}

            <h2 className="text-lg font-black uppercase leading-tight mb-4">{name}</h2>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-2xl font-black text-white">{finalPriceFormatted}</span>
              {hasDiscount && (
                <span className="text-sm text-[var(--color-text-faint)] line-through">
                  {originalPriceFormatted}
                </span>
              )}
            </div>

            <div className="h-px bg-[var(--color-border)] mb-5" />

            {/* Sizes */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
                  Talla
                </span>
                {selectedSize && (
                  <span className="text-xs text-[var(--color-gold)]">{selectedSize}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`px-3 py-1.5 text-xs font-semibold border rounded-sm transition-all duration-200 ${
                      selectedSize === size
                        ? 'border-[var(--color-gold)] bg-[var(--color-gold-muted)] text-[var(--color-gold)]'
                        : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-2)] hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
                  Color
                </span>
                {selectedColor && (
                  <span className="text-xs text-[var(--color-gold)]">{selectedColor}</span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {COMMON_COLORS.map(({ label, hex }) => (
                  <button
                    key={label}
                    onClick={() => setSelectedColor(selectedColor === label ? null : label)}
                    title={label}
                    className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                      selectedColor === label
                        ? 'border-[var(--color-gold)] scale-110'
                        : 'border-transparent hover:border-[var(--color-border-2)]'
                    }`}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 mt-auto">
              <Link
                to={`/producto/${id}`}
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--color-gold)] text-black text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-[var(--color-gold-light)] transition-colors group"
              >
                Ver producto completo
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <button
                onClick={() => toggle(product)}
                className={`w-full py-3 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase rounded-sm border transition-all duration-200 ${
                  isWishlisted
                    ? 'border-[var(--color-gold)] text-[var(--color-gold)] bg-[var(--color-gold-muted)]'
                    : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-gold)] hover:text-white'
                }`}
              >
                <Heart size={14} className={isWishlisted ? 'fill-current' : ''} />
                {isWishlisted ? 'En favoritos' : 'Agregar a favoritos'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
