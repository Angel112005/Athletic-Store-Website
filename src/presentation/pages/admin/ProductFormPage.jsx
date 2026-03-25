import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import { useAdminProducts } from '@/application/hooks/useAdminProducts'
import { useToast } from '@/presentation/components/ui/Toast'
import Button from '@/presentation/components/ui/Button'
import Input, { Textarea, Select } from '@/presentation/components/ui/Input'
import ImageUploader from '@/presentation/components/admin/ImageUploader'
import { PageLoader } from '@/presentation/components/ui/Spinner'
import { COMMON_SIZES, COMMON_COLORS } from '@/domain/types/index'

// Estado inicial del formulario
const EMPTY_FORM = {
  name:               '',
  description:        '',
  brand:              '',
  categoryName:       '',
  price:              '',
  discountPercentage: '',
  isActive:           true,
  images:             [],
}

export default function ProductFormPage() {
  const { id }  = useParams()         // undefined = crear, string = editar
  const isEdit  = !!id
  const navigate = useNavigate()
  const toast    = useToast()

  const { save, categories, fetchProductForEdit } = useAdminProducts()

  const [form,    setForm]    = useState(EMPTY_FORM)
  const [errors,  setErrors]  = useState({})
  const [saving,  setSaving]  = useState(false)
  const [loading, setLoading] = useState(isEdit)

  // Cargar producto para edición
  useEffect(() => {
    if (!isEdit) return
    setLoading(true)
    fetchProductForEdit(id)
      .then((product) => {
        setForm({
          name:               product.name,
          description:        product.description,
          brand:              product.brand,
          categoryName:       product.category?.name ?? '',
          price:              String(product.price),
          discountPercentage: product.discountPercentage ? String(product.discountPercentage) : '',
          isActive:           product.isActive,
          images:             product.images.map((img, i) => ({
            id:      img.id,
            url:     img.url,
            is_main: img.is_main,
            order:   i,
          })),
        })
      })
      .catch(() => toast.error('Error al cargar el producto'))
      .finally(() => setLoading(false))
  }, [id, isEdit])

  // ─── Validación ─────────────────────────────────────────

  const validate = () => {
    const e = {}

    // Validar campos básicos
    if (!form.name.trim())
      e.name  = 'El nombre es obligatorio'

    if (form.name.trim().length < 3)
      e.name = 'El nombre debe tener al menos 3 caracteres'

    if (!form.price || isNaN(parseFloat(form.price)) || parseFloat(form.price) <= 0)
      e.price = 'El precio debe ser un número positivo'

    // Validar descuento
    if (form.discountPercentage) {
      const d = parseInt(form.discountPercentage)
      if (isNaN(d) || d < 0 || d > 99)
        e.discountPercentage = 'El descuento debe estar entre 0 y 99'
    }

    // Validar imágenes
    if (!form.images || form.images.length === 0) {
      e.images = 'El producto debe tener al menos una imagen'
    } else if (!form.images.some(img => img.is_main)) {
      e.images = 'Debe haber una imagen principal marcada'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  // ─── Submit ─────────────────────────────────────────────

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) {
      toast.error('Por favor completa todos los campos requeridos')
      return
    }

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

  // ─── Helpers ────────────────────────────────────────────

  const set = (key) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const setImages = (imgs) => setForm((prev) => ({ ...prev, images: imgs }))

  if (loading) return <PageLoader />

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/productos"
          className="text-[var(--color-text-muted)] hover:text-white transition-colors"
        >
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

      <form onSubmit={handleSubmit} className="space-y-8">
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
              placeholder="Ej: Camiseta Dry-Fit Performance"
              error={errors.name}
              className="md:col-span-2"
            />

            <Textarea
              label="Descripción"
              value={form.description}
              onChange={set('description')}
              placeholder="Describe el producto: materiales, características, uso..."
              rows={4}
              className="md:col-span-2"
            />

            <Input
              label="Marca"
              value={form.brand}
              onChange={set('brand')}
              placeholder="Ej: Nike, Adidas, Under Armour"
            />

            {/* Categoría con opción de crear nueva */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)]">
                Categoría
              </label>
              <div className="flex gap-2">
                <input
                  list="category-list"
                  value={form.categoryName}
                  onChange={set('categoryName')}
                  placeholder="Selecciona o escribe una nueva..."
                  className="flex-1 px-4 py-3 rounded-sm text-sm text-white bg-[var(--color-surface-2)] border border-[var(--color-border)] placeholder:text-[var(--color-text-faint)] focus:outline-none focus:border-[var(--color-gold)] transition-colors"
                />
                <datalist id="category-list">
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name} />
                  ))}
                </datalist>
              </div>
              <p className="text-xs text-[var(--color-text-faint)]">
                Escribe una categoría nueva para crearla automáticamente.
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
              label="Precio original (USD)"
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

              {/* Preview precio final */}
              {form.price && form.discountPercentage && !isNaN(parseFloat(form.price)) && !isNaN(parseInt(form.discountPercentage)) && (
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

        {/* ── IMÁGENES ── */}
        <section className={`bg-[var(--color-surface)] border rounded-sm p-6 transition-colors ${
          errors.images
            ? 'border-[var(--color-error)]/30 bg-[var(--color-error)]/5'
            : 'border-[var(--color-border)]'
        }`}>
          <ImageUploader
            images={form.images}
            onChange={setImages}
            maxImages={6}
          />

          {/* Error de validación de imágenes */}
          {errors.images && (
            <div className="mt-4 p-3 bg-[var(--color-error)]/10 border border-[var(--color-error)]/30 rounded-sm flex items-start gap-3">
              <svg className="w-5 h-5 text-[var(--color-error)] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-xs text-[var(--color-error)]">{errors.images}</p>
            </div>
          )}
        </section>

        {/* ── ESTADO ── */}
        <section className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-sm p-6">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] mb-4">
            Visibilidad
          </h2>

          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div className="relative">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={set('isActive')}
                className="sr-only"
              />
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
            <Button type="button" variant="ghost">
              Cancelar
            </Button>
          </Link>

          <div className="flex items-center gap-3">
            {/* Save as inactive */}
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

            {/* Submit */}
            <Button type="submit" loading={saving}>
              {isEdit ? 'Guardar cambios' : 'Publicar producto'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
