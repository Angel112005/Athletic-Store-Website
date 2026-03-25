import { useState, useRef, useCallback } from 'react'
import { Upload, X, Star, GripVertical, ImagePlus, AlertCircle } from 'lucide-react'
import { useToast } from '@/presentation/components/ui/Toast'
import Modal from '@/presentation/components/ui/Modal'

/**
 * ImageUploader — Drag & drop + reordenable + imagen principal
 *
 * images: [{ id, file?, url?, preview?, is_main, order }]
 * onChange(images): callback con el estado actualizado
 */

function ImageItem({ image, index, total, onRemove, onSetMain, onDragStart, onDragOver, onDrop }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={(e) => onDragOver(e, index)}
      onDrop={(e) => onDrop(e, index)}
      className={`relative group rounded-sm overflow-hidden border-2 transition-all duration-200 cursor-grab active:cursor-grabbing ${
        image.is_main
          ? 'border-[var(--color-gold)]'
          : 'border-[var(--color-border)] hover:border-[var(--color-border-2)]'
      }`}
      style={{ aspectRatio: '1' }}
    >
      {/* Preview */}
      {(image.preview || image.url) ? (
        <img
          src={image.preview ?? image.url}
          alt=""
          className="w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <div className="w-full h-full bg-[var(--color-surface-2)] flex items-center justify-center">
          <ImagePlus size={24} className="text-[var(--color-text-faint)]" />
        </div>
      )}

      {/* Upload progress */}
      {image.uploading && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center gap-2">
          <div
            className="w-6 h-6 rounded-full border-2 border-[var(--color-gold)] border-t-transparent"
            style={{ animation: 'spin 0.7s linear infinite' }}
          />
          <span className="text-xs text-white">{image.progress ?? 0}%</span>
        </div>
      )}

      {/* Overlay buttons */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
        {/* Set main */}
        {!image.is_main && (
          <button
            type="button"
            onClick={() => onSetMain(index)}
            title="Establecer como principal"
            className="w-8 h-8 bg-[var(--color-gold)] rounded-sm flex items-center justify-center text-black hover:bg-[var(--color-gold-light)] transition-colors"
          >
            <Star size={14} fill="currentColor" />
          </button>
        )}

        {/* Remove */}
        <button
          type="button"
          onClick={() => onRemove(index)}
          title="Eliminar"
          className="w-8 h-8 bg-[var(--color-error)] rounded-sm flex items-center justify-center text-white hover:bg-red-600 transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      {/* Drag handle */}
      <div className="absolute top-1.5 left-1.5 text-white/60 group-hover:text-white">
        <GripVertical size={14} />
      </div>

      {/* Main badge */}
      {image.is_main && (
        <div className="absolute bottom-1.5 right-1.5 flex items-center gap-1 px-1.5 py-0.5 bg-[var(--color-gold)] rounded-sm">
          <Star size={10} fill="currentColor" className="text-black" />
          <span className="text-[10px] font-bold text-black">Principal</span>
        </div>
      )}

      {/* Number */}
      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-sm bg-black/70 flex items-center justify-center text-[10px] text-white font-bold">
        {index + 1}
      </div>
    </div>
  )
}

export default function ImageUploader({ images = [], onChange, maxImages = 6 }) {
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [isDragZone,    setIsDragZone]    = useState(false)
  const [toRemove, setToRemove] = useState(null)
  const dragSrcIndex = useRef(null)
  const fileInputRef = useRef(null)
  const toast = useToast()

  // ─── File handling ─────────────────────────────────────

  const addFiles = useCallback((files) => {
    const allowed = Array.from(files).filter((f) => {
      // Validar tipo
      if (!f.type.startsWith('image/')) {
        toast.error(`${f.name} no es una imagen válida`)
        return false
      }
      // Validar tamaño (máximo 20MB en navegador)
      const maxSizeMB = 20
      if (f.size > maxSizeMB * 1024 * 1024) {
        toast.error(`${f.name} es muy grande (máx ${maxSizeMB}MB)`)
        return false
      }
      return true
    })

    const slots   = maxImages - images.length
    const toAdd   = allowed.slice(0, slots)

    if (!toAdd.length) return

    if (toAdd.length < allowed.length) {
      toast.warning(`Solo se pueden agregar ${slots} imágenes más`)
    }

    const newImages = toAdd.map((file, i) => ({
      id:       `new-${Date.now()}-${i}`,
      file,
      preview:  URL.createObjectURL(file),
      is_main:  images.length === 0 && i === 0,
      order:    images.length + i,
      uploading: false,
      progress:  0,
    }))

    onChange([...images, ...newImages])
    toast.success(`${toAdd.length} imagen(es) agregada(s)`)
  }, [images, maxImages, onChange, toast])

  // ─── Drop zone ──────────────────────────────────────────

  const handleZoneDrop = (e) => {
    e.preventDefault()
    setIsDragZone(false)
    addFiles(e.dataTransfer.files)
  }

  // ─── Item drag & drop (reorder) ─────────────────────────

  const handleItemDragStart = (e, index) => {
    dragSrcIndex.current = index
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleItemDragOver = (e, index) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleItemDrop = (e, dropIndex) => {
    e.preventDefault()
    setDragOverIndex(null)
    const srcIndex = dragSrcIndex.current
    if (srcIndex === null || srcIndex === dropIndex) return

    const reordered = [...images]
    const [moved] = reordered.splice(srcIndex, 1)
    reordered.splice(dropIndex, 0, moved)

    // Re-asignar orden y asegurar que el primero sea is_main si era antes
    const updated = reordered.map((img, i) => ({ ...img, order: i }))
    onChange(updated)
    dragSrcIndex.current = null
  }

  // ─── Actions ────────────────────────────────────────────

  const handleRemove = (index) => {
    setToRemove(index)
  }

  const confirmRemove = () => {
    if (toRemove === null) return
    const updated = images.filter((_, i) => i !== toRemove)
    // Si se elimina la principal, marcar la primera como principal
    const hasMain = updated.some((img) => img.is_main)
    if (!hasMain && updated.length) {
      updated[0] = { ...updated[0], is_main: true }
    }
    onChange(updated.map((img, i) => ({ ...img, order: i })))
    toast.success('Imagen eliminada')
    setToRemove(null)
  }

  const handleSetMain = (index) => {
    const updated = images.map((img, i) => ({ ...img, is_main: i === index }))
    onChange(updated)
  }

  const canAddMore = images.length < maxImages

  return (
    <div>
      <label className="text-xs font-semibold tracking-widest uppercase text-[var(--color-text-muted)] block mb-3">
        Imágenes del producto
        <span className="ml-2 text-[var(--color-text-faint)] normal-case font-normal tracking-normal">
          ({images.length}/{maxImages}) — Arrastra para reordenar, ★ para principal
        </span>
      </label>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
        {/* Existing images */}
        {images.map((img, i) => (
          <ImageItem
            key={img.id ?? i}
            image={img}
            index={i}
            total={images.length}
            onRemove={handleRemove}
            onSetMain={handleSetMain}
            onDragStart={handleItemDragStart}
            onDragOver={handleItemDragOver}
            onDrop={handleItemDrop}
          />
        ))}

        {/* Add zone */}
        {canAddMore && (
          <div
            onDragEnter={(e) => { e.preventDefault(); setIsDragZone(true) }}
            onDragLeave={() => setIsDragZone(false)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleZoneDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative rounded-sm border-2 border-dashed cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 p-4
              ${isDragZone
                ? 'border-[var(--color-gold)] bg-[var(--color-gold-muted)]'
                : 'border-[var(--color-border)] hover:border-[var(--color-gold)]/50 hover:bg-white/[0.02]'
              }`}
            style={{ aspectRatio: '1', minHeight: '80px' }}
          >
            <Upload size={20} className={isDragZone ? 'text-[var(--color-gold)]' : 'text-[var(--color-text-faint)]'} />
            <span className="text-[10px] text-center text-[var(--color-text-faint)] leading-tight">
              {isDragZone ? 'Suelta aquí' : 'Agregar'}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => addFiles(e.target.files)}
            />
          </div>
        )}
      </div>

      {images.length === 0 && (
        <p className="text-xs text-[var(--color-text-faint)] mt-2">
          Sube al menos una imagen. La primera imagen marcada como principal se mostrará en el catálogo.
        </p>
      )}

      {/* Modal de confirmación para eliminar */}
      <Modal isOpen={toRemove !== null} onClose={() => setToRemove(null)}>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-error)]/10 flex items-center justify-center">
              <AlertCircle size={20} className="text-[var(--color-error)]" />
            </div>
            <h3 className="text-lg font-bold">Eliminar imagen</h3>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            ¿Estás seguro de que deseas eliminar esta imagen? Esta acción no se puede deshacer.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setToRemove(null)}
              className="px-4 py-2 rounded-sm border border-[var(--color-border)] text-white hover:bg-white/5 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmRemove}
              className="px-4 py-2 rounded-sm bg-[var(--color-error)] text-white hover:bg-red-600 transition-colors font-medium"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
