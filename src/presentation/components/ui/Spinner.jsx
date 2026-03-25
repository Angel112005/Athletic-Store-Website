/**
 * Spinner — loading indicator
 */

export default function Spinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' }

  return (
    <div
      role="status"
      aria-label="Cargando..."
      className={`${sizes[size]} rounded-full border-2 border-[var(--color-border-2)] border-t-[var(--color-gold)] ${className}`}
      style={{ animation: 'spin 0.7s linear infinite' }}
    />
  )
}

/**
 * Full-page loading screen
 */
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[var(--color-bg)] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-[var(--color-text-muted)] text-sm tracking-widest uppercase">
          Cargando
        </p>
      </div>
    </div>
  )
}

/**
 * Inline section loader
 */
export function SectionLoader({ text = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Spinner size="md" />
      <p className="text-[var(--color-text-muted)] text-sm">{text}</p>
    </div>
  )
}
