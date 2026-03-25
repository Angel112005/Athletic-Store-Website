import { useState, useEffect, createContext, useContext, useCallback } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

/**
 * Toast notification system — sin dependencias externas
 */

const ToastContext = createContext(null)

const ICONS = {
  success: <CheckCircle size={18} className="text-green-400 shrink-0" />,
  error:   <XCircle    size={18} className="text-[var(--color-error)] shrink-0" />,
  info:    <AlertCircle size={18} className="text-[var(--color-gold)] shrink-0" />,
}

function ToastItem({ id, type, message, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(id), 4000)
    return () => clearTimeout(timer)
  }, [id, onRemove])

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 bg-[var(--color-surface-2)] border border-[var(--color-border-2)] rounded-sm shadow-xl max-w-sm w-full"
      style={{ animation: 'fadeInUp 0.25s ease' }}
    >
      {ICONS[type] ?? ICONS.info}
      <p className="text-sm text-white flex-1 leading-relaxed">{message}</p>
      <button
        onClick={() => onRemove(id)}
        className="text-[var(--color-text-faint)] hover:text-white shrink-0 mt-0.5"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const add = useCallback((type, message) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, type, message }])
  }, [])

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ add }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-[100]">
        {toasts.map((t) => (
          <ToastItem key={t.id} {...t} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')

  return {
    success: (msg) => ctx.add('success', msg),
    error:   (msg) => ctx.add('error', msg),
    info:    (msg) => ctx.add('info', msg),
  }
}
