import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Plus, X, Trash2, ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useAdminProducts } from '@/application/hooks/useAdminProducts'
import { useToast } from '@/presentation/components/ui/Toast'
import Button from '@/presentation/components/ui/Button'
import Input, { Textarea } from '@/presentation/components/ui/Input'
import ImageUploader from '@/presentation/components/admin/ImageUploader'
import { PageLoader } from '@/presentation/components/ui/Spinner'
import { PRODUCT_TEMPLATES, COMMON_COLORS } from '@/domain/types/index'

/* ─────────────────────────────────────────────────────────────
   PRODUCT TYPE SELECTOR
───────────────────────────────────────────────────────────── */
function ProductTypeSelector({ selected, onSelect }) {
  return (
    <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6">
      <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-5">
        Tipo de producto
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {Object.values(PRODUCT_TEMPLATES).map((tpl) => {
          const active = selected === tpl.key
          return (
            <button
              key={tpl.key}
              type="button"
              onClick={() => onSelect(tpl.key)}
              className={`flex flex-col items-center gap-2 py-5 px-3 rounded-sm border-2 transition-all duration-200 ${
                active
                  ? 'border-[var(--color-gold)] bg-[var(--color-gold-muted)] text-white'
                  : 'border-[var(--color-border)] hover:border-[var(--color-border-2)] text-[var(--color-text-muted)]'
              }`}
            >
              <span className="text-2xl leading-none">{tpl.emoji}</span>
              <span className="text-[11px] font-bold tracking-widest uppercase">{tpl.label}</span>
              {active && (
                <div className="w-4 h-4 rounded-full bg-[var(--color-gold)] flex items-center justify-center">
                  <Check size={10} className="text-black" />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   COLOR PICKER PALETTE
───────────────────────────────────────────────────────────── */
function ColorPicker({ usedColors, onAdd, onClose }) {
  const [custom, setCustom] = useState({ label: '', hex: '#ffffff' })

  const available = COMMON_COLORS.filter(
    (c) => !usedColors.includes(c.label)
  )

  return (
    <div className="absolute top-full left-0 mt-2 z-30 bg-[var(--color-surface-2)] border border-[var(--color-border-2)] rounded-sm p-4 shadow-xl min-w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold tracking-widest uppercase text-[var(--color-text-muted)]">
          Seleccionar color
        </span>
        <button type="button" onClick={onClose} className="text-[var(--color-text-faint)] hover:text-white">
          <X size={14} />
        </button>
      </div>

      {/* Palette */}
      <div className="flex flex-wrap gap-2 mb-4">
        {available.map((c) => (
          <button
            key={c.label}
            type="button"
            title={c.label}
            onClick={() => { onAdd(c.label, c.hex); onClose() }}
            className="w-8 h-8 rounded-full border-2 border-white/10 hover:border-[var(--color-gold)] hover:scale-110 transition-all duration-150"
            style={{ backgroundColor: c.hex }}
          />
        ))}
        {available.length === 0 && (
          <p className="text-xs text-[var(--color-text-faint)] py-1">
            Todos los colores ya fueron agregados.
          </p>
        )}
      </div>

      {/* Custom color */}
      <div className="border-t border-[var(--color-border)] pt-3">
        <p className="text-[10px] text-[var(--color-text-faint)] uppercase tracking-widest mb-2">
          Color personalizado
        </p>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={custom.hex}
            onChange={(e) => setCustom((p) => ({ ...p, hex: e.target.value }))}
            className="w-9 h-9 rounded-sm border border-[var(--color-border)] cursor-pointer bg-transparent"
          />
          <input
            type="text"
            value={custom.label}
            onChange={(e) => setCustom((p) => ({ ...p, label: e.target.value }))}
            placeholder="Nombre del color"
            className="flex-1 px-3 py-2 text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm text-white placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-gold)]"
          />
          <button
            type="button"
            onClick={() => {
              if (!custom.label.trim()) return
              onAdd(custom.label.trim(), custom.hex)
              onClose()
            }}
            className="px-3 py-2 text-xs font-bold bg-[var(--color-gold)] text-black rounded-sm hover:bg-[var(--color-gold-light)] transition-colors"
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   VARIANT CARD — one color with its sizes & quantities
───────────────────────────────────────────────────────────── */
function VariantCard({ variant, availableSizes, sizeLabel, onUpdate, onRemove }) {
  const [expanded, setExpanded] = useState(true)

  const enabledSizes = Object.keys(variant.sizes)
  const totalStock   = Object.values(variant.sizes).reduce((s, q) => s + (parseInt(q) || 0), 0)

  const toggleSize = (size) => {
    const next = { ...variant.sizes }
    if (size in next) {
      delete next[size]
    } else {
      next[size] = 0
    }
    onUpdate({ ...variant, sizes: next })
  }

  const setQty = (size, val) => {
    const qty = Math.max(0, parseInt(val) || 0)
    onUpdate({ ...variant, sizes: { ...variant.sizes, [size]: qty } })
  }

  const selectAll = () => {
    const next = {}
    availableSizes.forEach((s) => { next[s] = variant.sizes[s] ?? 0 })
    onUpdate({ ...variant, sizes: next })
  }

  const clearAll = () => onUpdate({ ...variant, sizes: {} })

  return (
    <div className="border border-[var(--color-border)] rounded-sm overflow-hidden">
      {/* Card header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[var(--color-surface-2)]">
        <div
          className="w-6 h-6 rounded-full border-2 border-white/20 shrink-0"
          style={{ backgroundColor: variant.colorHex }}
        />
        <span className="font-semibold text-sm text-white flex-1">{variant.colorLabel}</span>
        <span className="text-xs text-[var(--color-text-faint)]">
          {enabledSizes.length} talla{enabledSizes.length !== 1 ? 's' : ''} · {totalStock} uds
        </span>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="text-[var(--color-text-muted)] hover:text-white transition-colors ml-1"
        >
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="text-[var(--color-text-faint)] hover:text-red-400 transition-colors"
          title="Eliminar variación"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {expanded && (
        <div className="p-4 space-y-4">
          {/* Size toggles */}
          {availableSizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)]">
                  {sizeLabel} — selecciona las disponibles
                </span>
                <div className="flex gap-3">
                  <button type="button" onClick={selectAll} className="text-[10px] text-[var(--color-gold)] hover:underline">
                    Todas
                  </button>
                  <button type="button" onClick={clearAll} className="text-[10px] text-[var(--color-text-faint)] hover:underline">
                    Ninguna
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map((size) => {
                  const on = size in variant.sizes
                  return (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-sm border transition-all duration-150 ${
                        on
                          ? 'border-[var(--color-gold)] bg-[var(--color-gold-muted)] text-[var(--color-gold)]'
                          : 'border-[var(--color-border)] text-[var(--color-text-faint)] hover:border-[var(--color-border-2)]'
                      }`}
                    >
                      {size}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Quantity inputs for enabled sizes */}
          {enabledSizes.length > 0 && (
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-text-muted)] block mb-3">
                Cantidad por talla
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {availableSizes.filter((s) => s in variant.sizes).map((size) => (
                  <div key={size} className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white w-8 shrink-0">{size}</span>
                    <div className="flex items-center border border-[var(--color-border)] rounded-sm overflow-hidden flex-1">
                      <button
                        type="button"
                        onClick={() => setQty(size, (variant.sizes[size] || 0) - 1)}
                        className="px-2 py-1.5 text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface-2)] transition-colors text-sm font-bold"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="0"
                        value={variant.sizes[size] ?? 0}
                        onChange={(e) => setQty(size, e.target.value)}
                        className="flex-1 text-center text-sm text-white bg-transparent py-1.5 focus:outline-none w-0 min-w-0"
                      />
                      <button
                        type="button"
                        onClick={() => setQty(size, (variant.sizes[size] || 0) + 1)}
                        className="px-2 py-1.5 text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-surface-2)] transition-colors text-sm font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {availableSizes.length === 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-text-muted)]">Cantidad disponible:</span>
              <div className="flex items-center border border-[var(--color-border)] rounded-sm overflow-hidden w-28">
                <button
                  type="button"
                  onClick={() => setQty('única', (variant.sizes['única'] || 0) - 1)}
                  className="px-2 py-1.5 text-[var(--color-text-muted)] hover:text-white text-sm font-bold"
                >−</button>
                <input
                  type="number"
                  min="0"
                  value={variant.sizes['única'] ?? 0}
                  onChange={(e) => setQty('única', e.target.value)}
                  className="flex-1 text-center text-sm text-white bg-transparent py-1.5 focus:outline-none w-0 min-w-0"
                />
                <button
                  type="button"
                  onClick={() => setQty('única', (variant.sizes['única'] || 0) + 1)}
                  className="px-2 py-1.5 text-[var(--color-text-muted)] hover:text-white text-sm font-bold"
                >+</button>
              </div>
            </div>
          )}

          {enabledSizes.length === 0 && availableSizes.length > 0 && (
            <p className="text-xs text-[var(--color-text-faint)] italic">
              Selecciona al menos una talla para ingresar cantidades.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   VARIANTS MANAGER
───────────────────────────────────────────────────────────── */
function VariantsManager({ template, variants, onChange }) {
  const [pickerOpen, setPickerOpen] = useState(false)

  const tpl         = PRODUCT_TEMPLATES[template]
  const usedColors  = variants.map((v) => v.colorLabel)
  const totalStock  = variants.reduce(
    (sum, v) => sum + Object.values(v.sizes).reduce((s, q) => s + (parseInt(q) || 0), 0), 0
  )

  const addVariant = useCallback((colorLabel, colorHex) => {
    const initial = {}
    if (tpl.sizes.length === 0) initial['única'] = 0
    onChange([...variants, { id: `v-${Date.now()}`, colorLabel, colorHex, sizes: initial }])
  }, [variants, tpl, onChange])

  const updateVariant = useCallback((id, updated) => {
    onChange(variants.map((v) => (v.id === id ? updated : v)))
  }, [variants, onChange])

  const removeVariant = useCallback((id) => {
    onChange(variants.filter((v) => v.id !== id))
  }, [variants, onChange])

  return (
    <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
            {tpl.hasColors ? 'Colores y tallas' : 'Stock'}
          </h2>
          {variants.length > 0 && (
            <p className="text-xs text-[var(--color-text-faint)] mt-0.5">
              {variants.length} color{variants.length !== 1 ? 'es' : ''} ·{' '}
              <span className="text-[var(--color-gold)] font-semibold">{totalStock} unidades en total</span>
            </p>
          )}
        </div>

        {/* Add color button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setPickerOpen((v) => !v)}
            className="inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 border border-[var(--color-gold)]/40 text-[var(--color-gold)] hover:bg-[var(--color-gold-muted)] rounded-sm transition-colors"
          >
            <Plus size={13} />
            {tpl.hasColors ? 'Agregar color' : 'Agregar stock'}
          </button>
          {pickerOpen && tpl.hasColors && (
            <ColorPicker
              usedColors={usedColors}
              onAdd={addVariant}
              onClose={() => setPickerOpen(false)}
            />
          )}
          {pickerOpen && !tpl.hasColors && (
            <div className="hidden" />
          )}
        </div>
      </div>

      {/* Variant cards */}
      {variants.length === 0 ? (
        <div className="mt-5 border-2 border-dashed border-[var(--color-border)] rounded-sm py-10 text-center">
          <p className="text-sm text-[var(--color-text-faint)]">
            {tpl.hasColors
              ? 'Agrega al menos una variación de color para definir el stock.'
              : 'Agrega el stock disponible para este producto.'}
          </p>
          <button
            type="button"
            onClick={() => {
              if (!tpl.hasColors) {
                addVariant('Único', '#6B7280')
                return
              }
              setPickerOpen(true)
            }}
            className="mt-3 text-xs font-bold text-[var(--color-gold)] hover:underline"
          >
            + {tpl.hasColors ? 'Agregar primer color' : 'Agregar stock'}
          </button>
        </div>
      ) : (
        <div className="mt-5 space-y-3">
          {variants.map((v) => (
            <VariantCard
              key={v.id}
              variant={v}
              availableSizes={tpl.sizes}
              sizeLabel={tpl.sizeLabel}
              onUpdate={(updated) => updateVariant(v.id, updated)}
              onRemove={() => removeVariant(v.id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   FORM STATE
───────────────────────────────────────────────────────────── */
const EMPTY_FORM = {
  productType:        'footwear',
  name:               '',
  description:        '',
  brand:              '',
  categoryName:       '',
  price:              '',
  discountPercentage: '',
  isActive:           true,
  images:             [],
  variants:           [],
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function ProductFormPage() {
  const { id }   = useParams()
  const isEdit   = !!id
  const navigate = useNavigate()
  const toast    = useToast()

  const { save, categories, fetchProductForEdit } = useAdminProducts()

  const [form,    setForm]    = useState(EMPTY_FORM)
  const [errors,  setErrors]  = useState({})
  const [saving,  setSaving]  = useState(false)
  const [loading, setLoading] = useState(isEdit)

  // Auto-fill category when product type changes
  const handleTypeChange = (typeKey) => {
    const tpl = PRODUCT_TEMPLATES[typeKey]
    setForm((prev) => ({
      ...prev,
      productType:  typeKey,
      categoryName: prev.categoryName || tpl.category,
      variants:     [],
    }))
  }

  // Load product for edit
  useEffect(() => {
    if (!isEdit) return
    setLoading(true)
    fetchProductForEdit(id)
      .then((product) => {
        setForm({
          productType:        product.productType ?? 'footwear',
          name:               product.name,
          description:        product.description,
          brand:              product.brand,
          categoryName:       product.category?.name ?? '',
          price:              String(product.price),
          discountPercentage: product.discountPercentage ? String(product.discountPercentage) : '',
          isActive:           product.isActive,
          images:             product.images.map((img, i) => ({
            id: img.id, url: img.url, is_main: img.is_main, order: i,
          })),
          variants: product.variants ?? [],
        })
      })
      .catch(() => toast.error('Error al cargar el producto'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  // ── Validation ─────────────────────────────────────────
  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = 'El nombre debe tener al menos 3 caracteres'
    if (!form.price || isNaN(parseFloat(form.price)) || parseFloat(form.price) <= 0)
      e.price = 'El precio debe ser un número positivo'
    if (form.discountPercentage) {
      const d = parseInt(form.discountPercentage)
      if (isNaN(d) || d < 0 || d > 99)
        e.discountPercentage = 'El descuento debe estar entre 0 y 99'
    }
    if (!form.images?.length)
      e.images = 'El producto debe tener al menos una imagen'
    else if (!form.images.some((img) => img.is_main))
      e.images = 'Debe haber una imagen principal marcada'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ── Submit ─────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) { toast.error('Revisa los campos requeridos'); return }
    setSaving(true)
    try {
      await save(form, isEdit ? id : null)
      toast.success(isEdit ? 'Producto actualizado' : 'Producto creado')
      navigate('/admin/productos')
    } catch (err) {
      toast.error(err.message ?? 'Error al guardar el producto')
    } finally {
      setSaving(false)
    }
  }

  // ── Helpers ────────────────────────────────────────────
  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const setImages   = (imgs)     => setForm((prev) => ({ ...prev, images: imgs }))
  const setVariants = (variants) => setForm((prev) => ({ ...prev, variants }))

  if (loading) return <PageLoader />

  const tpl = PRODUCT_TEMPLATES[form.productType] ?? PRODUCT_TEMPLATES.footwear

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/productos" className="text-[var(--color-text-muted)] hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-wide">
            {isEdit ? 'Editar producto' : 'Nuevo producto'}
          </h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-0.5">
            {isEdit ? 'Modifica los datos del producto' : 'Completa el formulario para crear un producto'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* ── TIPO DE PRODUCTO ── */}
        <ProductTypeSelector selected={form.productType} onSelect={handleTypeChange} />

        {/* ── INFORMACIÓN BÁSICA ── */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-6">
            Información básica
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Nombre del producto"
              required
              value={form.name}
              onChange={set('name')}
              placeholder={`Ej: ${tpl.emoji} Adidas Ultraboost 5`}
              error={errors.name}
              className="md:col-span-2"
            />

            <Textarea
              label="Descripción"
              value={form.description}
              onChange={set('description')}
              placeholder="Materiales, características, uso recomendado..."
              rows={3}
              className="md:col-span-2"
            />

            <Input
              label="Marca"
              value={form.brand}
              onChange={set('brand')}
              placeholder="Nike, Adidas, Under Armour..."
            />

            {/* Categoría */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
                Categoría
              </label>
              <input
                list="category-list"
                value={form.categoryName}
                onChange={set('categoryName')}
                placeholder="Selecciona o escribe nueva..."
                className="px-4 py-3 rounded-sm text-sm text-white bg-[var(--color-surface-2)] border border-[var(--color-border)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
              />
              <datalist id="category-list">
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name} />
                ))}
              </datalist>
              <p className="text-xs text-[var(--color-text-faint)]">
                Pre-llenado según el tipo · escribe para cambiar o crear una nueva.
              </p>
            </div>
          </div>
        </section>

        {/* ── PRECIO ── */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-6">
            Precio
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Precio (MXN)"
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={set('price')}
              placeholder="0.00"
              error={errors.price}
            />
            <div>
              <Input
                label="Descuento (%)"
                type="number"
                min="0"
                max="99"
                step="1"
                value={form.discountPercentage}
                onChange={set('discountPercentage')}
                placeholder="0"
                error={errors.discountPercentage}
                helper="Opcional. Entre 0 y 99."
              />
              {form.price && form.discountPercentage &&
               !isNaN(parseFloat(form.price)) && !isNaN(parseInt(form.discountPercentage)) && (
                <div className="mt-3 p-3 bg-[var(--color-gold-muted)] rounded-sm border border-[var(--color-gold)]/20">
                  <p className="text-xs text-[var(--color-text-muted)]">Precio final:</p>
                  <p className="text-base font-black text-[var(--color-gold)]">
                    ${(parseFloat(form.price) * (1 - parseInt(form.discountPercentage) / 100)).toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── VARIANTES (COLORES + TALLAS + STOCK) ── */}
        <VariantsManager
          template={form.productType}
          variants={form.variants}
          onChange={setVariants}
        />

        {/* ── IMÁGENES ── */}
        <section className={`bg-[var(--color-surface)] border rounded-sm p-6 transition-colors ${
          errors.images ? 'border-[var(--color-error)]/30' : 'border-[var(--color-border)]'
        }`}>
          <ImageUploader images={form.images} onChange={setImages} maxImages={6} />
          {errors.images && (
            <p className="mt-3 text-xs text-[var(--color-error)]">{errors.images}</p>
          )}
        </section>

        {/* ── VISIBILIDAD ── */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-4">
            Visibilidad
          </h2>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input type="checkbox" checked={form.isActive} onChange={set('isActive')} className="sr-only" />
              <div className={`w-10 h-6 rounded-full transition-colors duration-200 ${form.isActive ? 'bg-[var(--color-gold)]' : 'bg-[var(--color-surface-3)]'}`}>
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form.isActive ? 'translate-x-5' : 'translate-x-1'}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {form.isActive ? 'Activo — visible en la tienda' : 'Inactivo — oculto en la tienda'}
              </p>
              <p className="text-xs text-[var(--color-text-faint)]">
                Los productos inactivos no aparecen en el catálogo público.
              </p>
            </div>
          </label>
        </section>

        {/* ── ACTIONS ── */}
        <div className="flex items-center justify-between pt-2 pb-10">
          <Link to="/admin/productos">
            <Button type="button" variant="ghost">Cancelar</Button>
          </Link>
          <div className="flex items-center gap-3">
            {!isEdit && (
              <Button
                type="button"
                variant="secondary"
                loading={saving}
                onClick={() => {
                  setForm((p) => ({ ...p, isActive: false }))
                  setTimeout(() => document.querySelector('form').requestSubmit(), 0)
                }}
              >
                Guardar borrador
              </Button>
            )}
            <Button type="submit" loading={saving}>
              {isEdit ? 'Guardar cambios' : 'Publicar producto'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
