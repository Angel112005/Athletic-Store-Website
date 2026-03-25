/**
 * Input Component — form inputs premium
 */

export default function Input({
  label,
  error,
  helper,
  className = '',
  inputClassName = '',
  required = false,
  ...props
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
          {label}
          {required && <span className="text-[var(--color-gold)] ml-1">*</span>}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-sm text-sm text-white
          bg-[var(--color-surface-2)] border transition-colors duration-200
          placeholder:text-[var(--color-text-faint)]
          focus:outline-none focus:border-[var(--color-gold)] focus:bg-[var(--color-surface-3)]
          ${error
            ? 'border-[var(--color-error)]/60'
            : 'border-[var(--color-border)] hover:border-[var(--color-border-2)]'
          }
          ${inputClassName}
        `}
        {...props}
      />
      {error && (
        <p className="text-xs text-[var(--color-error)]">{error}</p>
      )}
      {helper && !error && (
        <p className="text-xs text-[var(--color-text-faint)]">{helper}</p>
      )}
    </div>
  )
}

/**
 * Textarea version
 */
export function Textarea({ label, error, helper, className = '', ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-3 rounded-sm text-sm text-white resize-none
          bg-[var(--color-surface-2)] border transition-colors duration-200
          placeholder:text-[var(--color-text-faint)]
          focus:outline-none focus:border-[var(--color-gold)] focus:bg-[var(--color-surface-3)]
          ${error
            ? 'border-[var(--color-error)]/60'
            : 'border-[var(--color-border)] hover:border-[var(--color-border-2)]'
          }
        `}
        rows={4}
        {...props}
      />
      {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
      {helper && !error && <p className="text-xs text-[var(--color-text-faint)]">{helper}</p>}
    </div>
  )
}

/**
 * Select version
 */
export function Select({ label, error, helper, className = '', children, ...props }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
          {label}
        </label>
      )}
      <select
        className={`
          w-full px-4 py-3 rounded-sm text-sm text-white
          bg-[var(--color-surface-2)] border transition-colors duration-200
          focus:outline-none focus:border-[var(--color-gold)]
          ${error
            ? 'border-[var(--color-error)]/60'
            : 'border-[var(--color-border)] hover:border-[var(--color-border-2)]'
          }
        `}
        {...props}
      >
        {children}
      </select>
      {error && <p className="text-xs text-[var(--color-error)]">{error}</p>}
    </div>
  )
}
