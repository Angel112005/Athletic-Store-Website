/**
 * Button Component — Premium design system
 *
 * Variants: primary (gold) | secondary | ghost | danger
 * Sizes: sm | md | lg
 */

const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 ' +
  'cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed focus-ring rounded-sm'

const VARIANTS = {
  primary:
    'bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-light)] ' +
    'active:bg-[var(--color-gold-dark)] shadow-md hover:shadow-[0_0_20px_rgba(201,168,76,0.35)]',
  secondary:
    'bg-transparent border border-[var(--color-border-2)] text-white ' +
    'hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]',
  ghost:
    'bg-transparent text-[var(--color-text-muted)] hover:text-white hover:bg-white/5',
  danger:
    'bg-transparent border border-[var(--color-error)]/30 text-[var(--color-error)] ' +
    'hover:bg-[var(--color-error)]/10',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm tracking-wide',
  md: 'px-6 py-3 text-sm tracking-wider uppercase',
  lg: 'px-8 py-4 text-base tracking-widest uppercase',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <span
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
          style={{ animation: 'spin 0.6s linear infinite' }}
        />
      )}
      {children}
    </button>
  )
}
