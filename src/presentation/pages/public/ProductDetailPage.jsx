import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { useProductDetail } from '@/application/hooks/useProductDetail'
import { useWishlist } from '@/application/context/WishlistContext'
import ProductCard from '@/presentation/components/product/ProductCard'
import ReviewSection from '@/presentation/components/product/ReviewSection'
import { PageLoader } from '@/presentation/components/ui/Spinner'
import Button from '@/presentation/components/ui/Button'
import Badge from '@/presentation/components/ui/Badge'
import { COMMON_SIZES, COMMON_COLORS } from '@/domain/types/index'

// ─── Image Gallery ─────────────────────────────────────────

function ImageGallery({ images, productName }) {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeImage = images[activeIndex]
  const hasPrev = activeIndex > 0
  const hasNext = activeIndex < images.length - 1

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1))
  const next = () => setActiveIndex((i) => Math.min(images.length - 1, i + 1))

  if (!images.length) {
    return (
      <div className="aspect-square bg-[var(--color-surface-2)] rounded-sm flex items-center justify-center">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"
          className="text-[var(--color-text-faint)]">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
    )
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          {images.map((img, i) => (
            <button
              key={img.id ?? i}
              onClick={() => setActiveIndex(i)}
              className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                i === activeIndex
                  ? 'border-[var(--color-gold)]'
                  : 'border-[var(--color-border)] hover:border-[var(--color-border-2)]'
              }`}
            >
              <img src={img.url} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main image */}
      <div className="relative flex-1 bg-[var(--color-surface-2)] rounded-sm overflow-hidden aspect-square md:aspect-auto">
        <img
          key={activeImage.url}
          src={activeImage.url}
          alt={productName}
          className="w-full h-full object-cover"
          style={{ animation: 'fadeIn 0.2s ease' }}
        />

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              disabled={!hasPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-sm text-white disabled:opacity-30 hover:bg-black/80 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={!hasNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-sm text-white disabled:opacity-30 hover:bg-black/80 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 rounded-sm text-xs text-[var(--color-text-muted)]">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Variants Selector ─────────────────────────────────────

function SizeSelector({ sizes, selected, onSelect }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
          Talla
        </span>
        {selected && (
          <span className="text-xs text-[var(--color-gold)]">{selected}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSelect(selected === size ? null : size)}
            className={`px-4 py-2 text-sm font-semibold border rounded-sm transition-all duration-200 ${
              selected === size
                ? 'border-[var(--color-gold)] bg-[var(--color-gold-muted)] text-[var(--color-gold)]'
                : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-border-2)] hover:text-white'
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

function ColorSelector({ colors, selected, onSelect }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
          Color
        </span>
        {selected && (
          <span className="text-xs text-[var(--color-gold)]">{selected}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        {colors.map(({ label, hex }) => (
          <button
            key={label}
            onClick={() => onSelect(selected === label ? null : label)}
            title={label}
            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
              selected === label
                ? 'border-[var(--color-gold)] scale-110'
                : 'border-transparent hover:border-[var(--color-border-2)]'
            }`}
            style={{ backgroundColor: hex }}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────

export default function ProductDetailPage() {
  const { id } = useParams()
  const { product, related, loading, error } = useProductDetail(id)
  const { toggle, has } = useWishlist()
  const [selectedSize,  setSelectedSize]  = useState(null)
  const [selectedColor, setSelectedColor] = useState(null)

  if (loading) return <PageLoader />

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-[var(--color-error)] mb-4">{error ?? 'Producto no encontrado'}</p>
          <Link to="/catalogo">
            <Button variant="secondary">Volver al catálogo</Button>
          </Link>
        </div>
      </div>
    )
  }

  const {
    name, brand, description,
    originalPriceFormatted, finalPriceFormatted,
    hasDiscount, discountPercentage,
    category, images,
  } = product

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            to="/catalogo"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-white transition-colors group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Volver al catálogo
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Gallery */}
          <div className="animate-fade-in">
            <ImageGallery images={images} productName={name} />
          </div>

          {/* Product info */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0.15s', opacity: 0, animationFillMode: 'forwards' }}
          >
            {/* Meta */}
            <div className="flex items-center gap-3 mb-4">
              {category && (
                <Badge variant="muted">{category.name}</Badge>
              )}
              {hasDiscount && (
                <Badge variant="gold">-{discountPercentage}% OFF</Badge>
              )}
            </div>

            {/* Brand */}
            {brand && (
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">
                {brand}
              </p>
            )}

            {/* Name */}
            <h1 className="text-2xl md:text-3xl font-black uppercase leading-tight mb-6">
              {name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-black text-white">{finalPriceFormatted}</span>
              {hasDiscount && (
                <span className="text-lg text-[var(--color-text-faint)] line-through">
                  {originalPriceFormatted}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-[var(--color-border)] mb-8" />

            {/* Variants */}
            <div className="space-y-6 mb-8">
              <SizeSelector
                sizes={COMMON_SIZES}
                selected={selectedSize}
                onSelect={setSelectedSize}
              />
              <ColorSelector
                colors={COMMON_COLORS}
                selected={selectedColor}
                onSelect={setSelectedColor}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <Button size="lg" className="flex-1">
                Agregar al carrito
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className={`flex-1 gap-2 ${has(id) ? 'border-[var(--color-gold)] text-[var(--color-gold)]' : ''}`}
                onClick={() => toggle(product)}
              >
                <Heart size={16} className={has(id) ? 'fill-current' : ''} />
                {has(id) ? 'En favoritos' : 'Lista de deseos'}
              </Button>
            </div>

            {/* Description */}
            {description && (
              <div className="border-t border-[var(--color-border)] pt-8">
                <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-3">
                  Descripción
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                  {description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20">
          <ReviewSection productId={id} />
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <section className="mt-20 pt-16 border-t border-[var(--color-border)]">
            <div className="mb-10">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">
                También te puede gustar
              </p>
              <h2 className="text-2xl font-black uppercase">Productos relacionados</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
