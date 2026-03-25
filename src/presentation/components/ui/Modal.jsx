import { useEffect } from 'react'
import { X } from 'lucide-react'

/**
 * Modal — overlay dialog
 */

export default function Modal({ isOpen, onClose, title, children, size = 'md' }) {
  const sizes = {
    sm:  'max-w-md',
    md:  'max-w-2xl',
    lg:  'max-w-4xl',
    xl:  'max-w-6xl',
    full: 'max-w-[95vw]',
  }

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Bloquear scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.15s ease' }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`relative w-full ${sizes[size]} bg-[var(--color-surface)] border border-[var(--color-border-2)] rounded-sm shadow-2xl max-h-[90vh] flex flex-col`}
        style={{ animation: 'fadeInUp 0.2s ease' }}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
            <h3 className="text-base font-semibold tracking-wide">{title}</h3>
            <button
              onClick={onClose}
              className="text-[var(--color-text-muted)] hover:text-white transition-colors p-1 rounded-sm hover:bg-white/5"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">{children}</div>
      </div>
    </div>
  )
}

/**
 * Confirm dialog
 */
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmLabel = 'Confirmar', variant = 'danger' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-6">{message}</p>
      <div className="flex gap-3 justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm text-[var(--color-text-muted)] hover:text-white border border-[var(--color-border)] rounded-sm transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={() => { onConfirm(); onClose() }}
          className={`px-4 py-2 text-sm font-semibold rounded-sm transition-colors ${
            variant === 'danger'
              ? 'bg-[var(--color-error)] text-white hover:bg-red-600'
              : 'bg-[var(--color-gold)] text-black hover:bg-[var(--color-gold-light)]'
          }`}
        >
          {confirmLabel}
        </button>
      </div>
    </Modal>
  )
}
