import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight } from 'lucide-react'

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate  = useNavigate()

  // Focus input when opens, reset query
  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  const handleSubmit = (e) => {
    e?.preventDefault()
    if (!query.trim()) return
    navigate(`/catalogo?search=${encodeURIComponent(query.trim())}`)
    onClose()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ animation: 'fadeIn 0.15s ease' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-xl mx-4 bg-[var(--color-surface)] border border-[var(--color-border-2)] rounded-sm shadow-2xl overflow-hidden"
        style={{ animation: 'fadeInUp 0.2s ease' }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-4 px-5 py-4 border-b border-[var(--color-border)]">
            <Search size={18} className="text-[var(--color-gold)] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos, marcas..."
              className="flex-1 bg-transparent text-white text-base placeholder:text-[var(--color-text-faint)] focus:outline-none"
            />
            <button
              type="button"
              onClick={query ? () => setQuery('') : onClose}
              className="text-[var(--color-text-muted)] hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </form>

        <div className="px-5 py-3 flex items-center justify-between">
          <p className="text-xs text-[var(--color-text-faint)]">
            Presiona{' '}
            <kbd className="px-1.5 py-0.5 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded text-[10px] font-mono">
              Enter
            </kbd>{' '}
            para buscar
          </p>
          <button
            onClick={handleSubmit}
            disabled={!query.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-gold)] text-black text-xs font-bold tracking-widest uppercase rounded-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--color-gold-light)] transition-colors"
          >
            Buscar
            <ArrowRight size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}
