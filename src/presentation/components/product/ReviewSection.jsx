import { useState } from 'react'
import { Star, ThumbsUp } from 'lucide-react'
import Button from '@/presentation/components/ui/Button'

/**
 * ReviewSection — Sistema de reseñas para productos
 */

function StarRating({ rating, onRate, interactive = false }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          onClick={() => interactive && onRate?.(i + 1)}
          className={`transition-all duration-200 ${interactive ? 'cursor-pointer hover:scale-110' : ''}`}
          disabled={!interactive}
        >
          <Star
            size={16}
            className={`${
              i < rating
                ? 'fill-[var(--color-gold)] text-[var(--color-gold)]'
                : 'text-[var(--color-border)]'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function RatingDistribution({ ratings = { 5: 45, 4: 20, 3: 15, 2: 10, 1: 10 } }) {
  const total = Object.values(ratings).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = ratings[star] || 0
        const percentage = total > 0 ? (count / total) * 100 : 0

        return (
          <div key={star} className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 w-12">
              <span className="text-xs font-semibold text-white">{star}</span>
              <Star size={12} className="fill-[var(--color-gold)] text-[var(--color-gold)]" />
            </div>
            <div className="flex-1 h-2 bg-[var(--color-surface-2)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-gold)] rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-xs text-[var(--color-text-muted)] w-12 text-right">{count}</span>
          </div>
        )
      })}
    </div>
  )
}

function ReviewCard({ review }) {
  const [helpful, setHelpful] = useState(false)

  return (
    <div className="border border-[var(--color-border)] rounded-sm p-6 hover:border-[var(--color-gold)]/30 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={review.rating} />
            <span className="text-xs text-[var(--color-text-muted)]">{review.date}</span>
          </div>
          <p className="font-semibold text-white text-sm">{review.author}</p>
          <p className="text-xs text-[var(--color-text-muted)]">{review.verified && '✓ Comprador verificado'}</p>
        </div>
      </div>

      {/* Review title and text */}
      {review.title && (
        <p className="font-semibold text-white text-sm mb-2">{review.title}</p>
      )}
      <p className="text-sm text-white/80 leading-relaxed mb-4">{review.text}</p>

      {/* Helpful button */}
      <button
        onClick={() => setHelpful(!helpful)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[var(--color-text-muted)] border border-[var(--color-border)] rounded-sm hover:border-[var(--color-gold)] hover:text-white transition-all duration-200"
      >
        <ThumbsUp size={13} className={helpful ? 'fill-[var(--color-gold)]' : ''} />
        <span>Útil ({review.helpful})</span>
      </button>
    </div>
  )
}

export default function ReviewSection({ productId = null }) {
  const [showForm, setShowForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')

  // Mock data - en producción vendría de la API
  const reviews = [
    {
      id: 1,
      author: 'Juan Pérez',
      rating: 5,
      title: 'Excelente calidad',
      text: 'Producto de muy buena calidad, llegó en perfecto estado. Muy recomendado, cumplió todas mis expectativas.',
      date: 'Hace 2 semanas',
      verified: true,
      helpful: 23
    },
    {
      id: 2,
      author: 'María González',
      rating: 5,
      title: 'Perfecto para entrenar',
      text: 'Los usé en mi primer maratón y no tuve problemas. Son muy cómodos y el material es de primera.',
      date: 'Hace 3 semanas',
      verified: true,
      helpful: 18
    },
    {
      id: 3,
      author: 'Carlos López',
      rating: 4,
      title: 'Buen producto, envío rápido',
      text: 'Llegó rápido, bien empacado. Solo hubiera preferido una caja mejor pero en general muy satisfecho.',
      date: 'Hace 1 mes',
      verified: true,
      helpful: 12
    },
  ]

  const averageRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section className="border-t border-[var(--color-border)] pt-12">
      {/* Header */}
      <div className="mb-12">
        <h2 className="text-2xl md:text-3xl font-black uppercase mb-8">Reseñas & Opiniones</h2>

        {/* Rating summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Overall rating */}
          <div className="flex items-start gap-4">
            <div>
              <div className="text-4xl font-black text-white">{averageRating}</div>
              <StarRating rating={Math.round(averageRating)} />
              <p className="text-xs text-[var(--color-text-muted)] mt-2">{reviews.length} reseñas</p>
            </div>
          </div>

          {/* Rating distribution */}
          <div className="md:col-span-3">
            <RatingDistribution />
          </div>
        </div>
      </div>

      {/* Write review button */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-4 border border-[var(--color-border)] rounded-sm text-white font-semibold hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/5 transition-all duration-300 mb-10"
        >
          Escribe una reseña
        </button>
      ) : (
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-8 mb-10">
          <h3 className="text-lg font-bold text-white mb-6">Comparte tu experiencia</h3>

          {/* Rating selector */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-white mb-3">Calificación</p>
            <StarRating rating={rating} onRate={setRating} interactive={true} />
          </div>

          {/* Title */}
          <div className="mb-6">
            <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] block mb-2">
              Título (opcional)
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Producto excelente"
              className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-sm text-white placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
            />
          </div>

          {/* Review text */}
          <div className="mb-6">
            <label className="text-xs font-semibold uppercase text-[var(--color-text-muted)] block mb-2">
              Tu reseña
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Cuéntanos tu experiencia con este producto..."
              rows={5}
              className="w-full px-4 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-sm text-white placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-gold)] transition-colors resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              disabled={!rating || !review.trim()}
              className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publicar reseña
            </Button>
            <button
              onClick={() => {
                setShowForm(false)
                setRating(0)
                setTitle('')
                setReview('')
              }}
              className="px-6 py-3 border border-[var(--color-border)] text-white rounded-sm hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((rev) => <ReviewCard key={rev.id} review={rev} />)
        ) : (
          <p className="text-[var(--color-text-muted)] text-center py-8">
            No hay reseñas aún. ¡Sé el primero en reseñar este producto!
          </p>
        )}
      </div>
    </section>
  )
}
