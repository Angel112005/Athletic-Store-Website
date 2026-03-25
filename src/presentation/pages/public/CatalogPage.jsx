import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react'
import { useProducts } from '@/application/hooks/useProducts'
import ProductGrid from '@/presentation/components/product/ProductGrid'
import { SORT_LABELS, PRODUCT_SORT_OPTIONS } from '@/domain/types/index'

// ─── Accordion section ────────────────────────────────────
function AccordionSection({ title, children, count }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-[var(--color-border)]">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-between w-full py-4 group"
      >
        <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/80 group-hover:text-white transition-colors">
          {title}
          {count > 0 && (
            <span className="ml-2 px-1.5 py-0.5 bg-[var(--color-gold)] text-black text-[9px] font-black rounded-full leading-none">
              {count}
            </span>
          )}
        </span>
        {open
          ? <ChevronUp  size={13} className="text-[var(--color-text-muted)] group-hover:text-white transition-colors" />
          : <ChevronDown size={13} className="text-[var(--color-text-muted)] group-hover:text-white transition-colors" />
        }
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  )
}

// ─── Price Filter — extracted to avoid remount on parent re-render ─
function PriceFilter({ enabled, onToggle, range, onRangeChange }) {
  // Local string state so typing isn't interrupted by re-renders
  const [localMin, setLocalMin] = useState(String(range[0]))
  const [localMax, setLocalMax] = useState(String(range[1]))

  // Sync when external range resets (e.g. "Limpiar filtros")
  useEffect(() => { setLocalMin(String(range[0])) }, [range[0]])
  useEffect(() => { setLocalMax(String(range[1])) }, [range[1]])

  const commitMin = () => {
    const v = Math.max(0, Math.min(parseInt(localMin) || 0, range[1]))
    setLocalMin(String(v))
    onRangeChange([v, range[1]])
  }
  const commitMax = () => {
    const v = Math.max(range[0], parseInt(localMax) || range[1])
    setLocalMax(String(v))
    onRangeChange([range[0], v])
  }
  const handleKey = (commit) => (e) => { if (e.key === 'Enter') commit() }

  return (
    <div className="space-y-4">
      {/* Toggle */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full group"
      >
        <span className="text-xs text-[var(--color-text-muted)] group-hover:text-white transition-colors">
          {enabled ? 'Filtro activo' : 'Activar filtro'}
        </span>
        <span
          className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors duration-200 ${
            enabled ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-surface-2)] border border-[var(--color-border-2)]'
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
              enabled ? 'translate-x-4' : 'translate-x-0.5'
            }`}
          />
        </span>
      </button>

      {enabled && (
        <>
          {/* Sliders */}
          <div className="space-y-2 pt-1">
            <input
              type="range" min="0" max="500"
              value={range[0]}
              onChange={(e) => onRangeChange([Math.min(+e.target.value, range[1]), range[1]])}
              className="w-full h-1 rounded-full appearance-none cursor-pointer accent-[var(--color-gold)] bg-[var(--color-surface-2)]"
            />
            <input
              type="range" min="0" max="500"
              value={range[1]}
              onChange={(e) => onRangeChange([range[0], Math.max(+e.target.value, range[0])])}
              className="w-full h-1 rounded-full appearance-none cursor-pointer accent-[var(--color-gold)] bg-[var(--color-surface-2)]"
            />
          </div>

          {/* Min / Max inputs */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="text-[9px] tracking-widest uppercase text-[var(--color-text-faint)] block mb-1">Mín</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)]">$</span>
                <input
                  type="number"
                  value={localMin}
                  onChange={(e) => setLocalMin(e.target.value)}
                  onBlur={commitMin}
                  onKeyDown={handleKey(commitMin)}
                  className="w-full pl-6 pr-2 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-sm text-white text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
              </div>
            </div>
            <span className="text-[var(--color-text-faint)] mt-5 text-xs">—</span>
            <div className="flex-1">
              <label className="text-[9px] tracking-widest uppercase text-[var(--color-text-faint)] block mb-1">Máx</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-muted)]">$</span>
                <input
                  type="number"
                  value={localMax}
                  onChange={(e) => setLocalMax(e.target.value)}
                  onBlur={commitMax}
                  onKeyDown={handleKey(commitMax)}
                  className="w-full pl-6 pr-2 py-2 bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-sm text-white text-sm focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
              </div>
            </div>
          </div>

          <p className="text-[10px] text-[var(--color-gold)] font-semibold tracking-wide">
            ${range[0]} — ${range[1]}
          </p>
        </>
      )}
    </div>
  )
}

// ─── Filter Sidebar — extracted outside parent to preserve input focus ─
function FilterSidebar({
  categories, filters, updateFilter,
  priceRange, setPriceRange,
  priceFilterEnabled, setPriceFilterEnabled,
  hasActiveFilters, onClearAll,
}) {
  const activeCount =
    (filters.categoryId ? 1 : 0) + (priceFilterEnabled ? 1 : 0)

  return (
    <div>
      {/* Active filters summary */}
      {hasActiveFilters && (
        <div className="mb-5 pb-5 border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-text-muted)]">
              Filtros activos
            </span>
            <button
              onClick={onClearAll}
              className="text-[10px] text-[var(--color-error)] hover:text-red-400 transition-colors font-semibold tracking-wide"
            >
              Limpiar
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.categoryId && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-gold-muted)] border border-[var(--color-gold)]/30 rounded-sm text-[10px] font-semibold text-[var(--color-gold)]">
                {categories.find((c) => c.id === filters.categoryId)?.name ?? 'Categoría'}
                <button onClick={() => updateFilter('categoryId', '')} className="hover:text-white transition-colors">
                  <X size={10} />
                </button>
              </span>
            )}
            {priceFilterEnabled && (
              <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[var(--color-gold-muted)] border border-[var(--color-gold)]/30 rounded-sm text-[10px] font-semibold text-[var(--color-gold)]">
                ${priceRange[0]} – ${priceRange[1]}
                <button
                  onClick={() => { setPriceFilterEnabled(false); setPriceRange([0, 500]) }}
                  className="hover:text-white transition-colors"
                >
                  <X size={10} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Precio */}
      <AccordionSection title="Precio" count={priceFilterEnabled ? 1 : 0}>
        <PriceFilter
          enabled={priceFilterEnabled}
          onToggle={() => setPriceFilterEnabled((p) => !p)}
          range={priceRange}
          onRangeChange={setPriceRange}
        />
      </AccordionSection>

      {/* Categorías */}
      {categories.length > 0 && (
        <AccordionSection title="Categoría" count={filters.categoryId ? 1 : 0}>
          <ul className="space-y-0.5">
            <li>
              <button
                onClick={() => updateFilter('categoryId', '')}
                className={`w-full flex items-center justify-between text-sm py-2 px-2 rounded-sm transition-colors ${
                  !filters.categoryId
                    ? 'text-[var(--color-gold)] bg-[var(--color-gold-muted)]'
                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                }`}
              >
                <span>Todos</span>
                {!filters.categoryId && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                )}
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => updateFilter('categoryId', cat.id)}
                  className={`w-full flex items-center justify-between text-sm py-2 px-2 rounded-sm transition-colors ${
                    filters.categoryId === cat.id
                      ? 'text-[var(--color-gold)] bg-[var(--color-gold-muted)]'
                      : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{cat.name}</span>
                  {filters.categoryId === cat.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-gold)]" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </AccordionSection>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────
export default function CatalogPage() {
  const [searchParams] = useSearchParams()
  const [sidebarOpen,        setSidebarOpen]        = useState(false)
  const [sortOpen,           setSortOpen]           = useState(false)
  const [priceRange,         setPriceRange]         = useState([0, 500])
  const [priceFilterEnabled, setPriceFilterEnabled] = useState(false)

  const { products, categories, filters, loading, error, updateFilter, clearFilters } =
    useProducts({
      search:     searchParams.get('search') ?? '',
      categoryId: searchParams.get('category') ?? '',
      sort:       PRODUCT_SORT_OPTIONS.NEWEST,
    })

  const hasActiveFilters = !!(filters.categoryId || filters.search || priceFilterEnabled)

  const visibleProducts = priceFilterEnabled
    ? products.filter((p) => p.finalPrice >= priceRange[0] && p.finalPrice <= priceRange[1])
    : products

  const handleClearAll = () => {
    clearFilters()
    setPriceRange([0, 500])
    setPriceFilterEnabled(false)
  }

  const sidebarProps = {
    categories, filters, updateFilter,
    priceRange, setPriceRange,
    priceFilterEnabled, setPriceFilterEnabled,
    hasActiveFilters, onClearAll: handleClearAll,
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-[var(--color-gold)] mb-2">
            Colección
          </p>
          <h1 className="text-3xl md:text-4xl font-black uppercase">Catálogo</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={filters.search ?? ''}
              onChange={(e) => updateFilter('search', e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 text-sm bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm text-white placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
            />
            {filters.search && (
              <button
                onClick={() => updateFilter('search', '')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((p) => !p)}
                className="hidden md:flex items-center gap-2 px-4 py-2.5 text-sm border border-[var(--color-border)] rounded-sm text-[var(--color-text-muted)] hover:border-[var(--color-border-2)] hover:text-white transition-colors"
              >
                {SORT_LABELS[filters.sort] ?? 'Ordenar'}
                <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>

              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-52 bg-[var(--color-surface-2)] border border-[var(--color-border-2)] rounded-sm shadow-xl z-20">
                    {Object.entries(SORT_LABELS).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => { updateFilter('sort', key); setSortOpen(false) }}
                        className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          filters.sort === key
                            ? 'text-[var(--color-gold)] bg-[var(--color-gold-muted)]'
                            : 'text-[var(--color-text-muted)] hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Filters toggle (mobile) */}
            <button
              onClick={() => setSidebarOpen((p) => !p)}
              className="md:hidden flex items-center gap-2 px-4 py-2.5 text-sm border border-[var(--color-border)] rounded-sm text-[var(--color-text-muted)] hover:text-white transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filtros
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[var(--color-gold)]" />}
            </button>

            {/* Count */}
            <span className="hidden md:block text-xs text-[var(--color-text-faint)] whitespace-nowrap">
              {visibleProducts.length} productos
            </span>
          </div>
        </div>

        {/* Body — items-start is required for sticky sidebar to work */}
        <div className="flex gap-10 items-start">
          {/* Desktop sidebar — sticky */}
          <aside className="hidden md:block w-56 shrink-0 sticky top-24 self-start">
            <FilterSidebar {...sidebarProps} />
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <ProductGrid products={visibleProducts} loading={loading} error={error} />
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black/70" onClick={() => setSidebarOpen(false)} />
          <div className="relative bg-[var(--color-surface)] w-72 h-full overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest">Filtros</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-[var(--color-text-muted)] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <FilterSidebar {...sidebarProps} />
          </div>
        </div>
      )}
    </div>
  )
}
