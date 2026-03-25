/**
 * Badge Component — pequeño indicador visual
 */

const VARIANTS = {
  gold:    'bg-[var(--color-gold-muted)] text-[var(--color-gold)] border border-[var(--color-gold)]/20',
  success: 'bg-green-500/10 text-green-400 border border-green-500/20',
  error:   'bg-red-500/10 text-red-400 border border-red-500/20',
  muted:   'bg-white/5 text-[var(--color-text-muted)] border border-[var(--color-border)]',
}

export default function Badge({ children, variant = 'muted', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-sm text-xs font-semibold tracking-wider uppercase ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
