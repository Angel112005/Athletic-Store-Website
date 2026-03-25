/**
 * Cloudinary Upload Service
 *
 * Sube imágenes directamente al servidor de Cloudinary
 * usando un Upload Preset sin firma (unsigned).
 * El frontend sube y obtiene la URL pública.
 * La base de datos solo guarda la URL, nunca el archivo.
 */

const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.warn(
    '⚠️ Variables de Cloudinary no configuradas.\n' +
    'Agrega VITE_CLOUDINARY_CLOUD_NAME y VITE_CLOUDINARY_UPLOAD_PRESET en .env'
  )
}

/**
 * Comprime una imagen lo máximo posible manteniendo buena calidad visual.
 * @param {File} file
 * @param {{ maxWidth?: number, quality?: number, onCompressionDone?: Function }} options
 * @returns {Promise<{ file: File, originalSize: number, compressedSize: number, reduction: number }>}
 */
export async function compressImage(file, options = {}) {
  const { maxWidth = 2000, quality = 0.72, onCompressionDone } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      const img = new Image()

      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img

        // Reducir tamaño si es muy grande
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width)
          width = maxWidth
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d', { alpha: false })
        ctx.drawImage(img, 0, 0, width, height)

        // Convertir a JPEG con compresión, excepto si es PNG transparente
        const hasAlpha = file.type === 'image/png'
        const mimeType = hasAlpha ? 'image/jpeg' : 'image/jpeg'
        const compressedQuality = quality

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Error comprimiendo imagen'))
              return
            }

            const compressedFile = new File([blob], file.name, {
              type: mimeType,
              lastModified: Date.now(),
            })

            // Calcular estadísticas de compresión
            const originalSize = file.size
            const compressedSize = blob.size
            const reduction = Math.round(((originalSize - compressedSize) / originalSize) * 100)

            const result = {
              file: compressedFile,
              originalSize,
              compressedSize,
              reduction,
            }

            // Log de reducción de tamaño
            const originalSizeKB = (originalSize / 1024).toFixed(2)
            const compressedSizeKB = (compressedSize / 1024).toFixed(2)

            console.log(
              `📦 ${file.name}: ${originalSizeKB}KB → ${compressedSizeKB}KB (${reduction}% reducido)`
            )

            if (onCompressionDone) {
              onCompressionDone(result)
            }

            resolve(result)
          },
          mimeType,
          compressedQuality
        )
      }

      img.onerror = () => reject(new Error('Error cargando imagen'))
      img.src = e.target.result
    }

    reader.onerror = () => reject(new Error('Error leyendo archivo'))
    reader.readAsDataURL(file)
  })
}

/**
 * Sube un archivo a Cloudinary.
 * @param {File} file
 * @param {{ folder?: string, onProgress?: Function }} options
 * @returns {Promise<{ url: string, publicId: string }>}
 */
export async function uploadImage(file, options = {}) {
  const { folder = 'athletic-store/products', onProgress, onCompressionDone } = options

  // Comprimir imagen antes de subir
  let fileToUpload = file
  try {
    const compressionResult = await compressImage(file, { onCompressionDone })
    fileToUpload = compressionResult.file
  } catch (err) {
    console.warn('⚠️ No se pudo comprimir imagen, usando original:', err.message)
  }

  const formData = new FormData()
  formData.append('file', fileToUpload)
  formData.append('upload_preset', UPLOAD_PRESET)
  formData.append('folder', folder)

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    if (onProgress) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          onProgress(Math.round((e.loaded / e.total) * 100))
        }
      })
    }

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        const res = JSON.parse(xhr.responseText)
        resolve({
          url: res.secure_url,
          publicId: res.public_id,
        })
      } else {
        reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`))
      }
    })

    xhr.addEventListener('error', () => reject(new Error('Network error during upload')))
    xhr.open('POST', endpoint)
    xhr.send(formData)
  })
}

/**
 * Sube múltiples imágenes en paralelo.
 * @param {File[]} files
 * @param {{ folder?: string, onProgress?: Function }} options
 * @returns {Promise<Array<{ url: string, publicId: string }>>}
 */
export async function uploadMultipleImages(files, options = {}) {
  const uploads = files.map((file) => uploadImage(file, options))
  return Promise.all(uploads)
}

/**
 * Genera una URL con transformaciones de Cloudinary.
 * @param {string} publicId
 * @param {{ width?: number, height?: number, quality?: string }} transforms
 * @returns {string}
 */
export function getOptimizedUrl(publicId, transforms = {}) {
  const { width = 800, height, quality = 'auto' } = transforms
  const h = height ? `,h_${height}` : ''
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width}${h},q_${quality},f_auto/${publicId}`
}
