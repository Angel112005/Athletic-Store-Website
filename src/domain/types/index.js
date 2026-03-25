/**
 * Domain Types / Constantes de dominio
 */

export const PRODUCT_SORT_OPTIONS = {
  NEWEST:     'newest',
  PRICE_ASC:  'price_asc',
  PRICE_DESC: 'price_desc',
  NAME_AZ:    'name_az',
}

export const SORT_LABELS = {
  [PRODUCT_SORT_OPTIONS.NEWEST]:     'Más recientes',
  [PRODUCT_SORT_OPTIONS.PRICE_ASC]:  'Precio: menor a mayor',
  [PRODUCT_SORT_OPTIONS.PRICE_DESC]: 'Precio: mayor a menor',
  [PRODUCT_SORT_OPTIONS.NAME_AZ]:    'Nombre: A-Z',
}

// ── Colores disponibles ─────────────────────────────────────
export const COMMON_COLORS = [
  { label: 'Negro',      hex: '#111111' },
  { label: 'Blanco',     hex: '#F5F5F5' },
  { label: 'Rojo',       hex: '#EF4444' },
  { label: 'Azul marino',hex: '#1E3A8A' },
  { label: 'Azul cielo', hex: '#3B82F6' },
  { label: 'Verde',      hex: '#22C55E' },
  { label: 'Amarillo',   hex: '#EAB308' },
  { label: 'Naranja',    hex: '#F97316' },
  { label: 'Rosa',       hex: '#EC4899' },
  { label: 'Gris',       hex: '#6B7280' },
  { label: 'Dorado',     hex: '#C9A84C' },
  { label: 'Morado',     hex: '#A855F7' },
  { label: 'Café',       hex: '#92400E' },
  { label: 'Verde olivo',hex: '#4D7C0F' },
]

// ── Plantillas de producto ──────────────────────────────────
export const PRODUCT_TEMPLATES = {
  footwear: {
    key:        'footwear',
    label:      'Calzado',
    emoji:      '👟',
    category:   'Calzado',
    sizeLabel:  'Talla EU',
    sizes:      ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48'],
    hasColors:  true,
  },
  clothing: {
    key:        'clothing',
    label:      'Ropa',
    emoji:      '👕',
    category:   'Ropa',
    sizeLabel:  'Talla',
    sizes:      ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    hasColors:  true,
  },
  socks: {
    key:        'socks',
    label:      'Calcetas',
    emoji:      '🧦',
    category:   'Accesorios',
    sizeLabel:  'Talla',
    sizes:      ['CH', 'M', 'G', 'XG'],
    hasColors:  true,
  },
  shinguards: {
    key:        'shinguards',
    label:      'Espinilleras',
    emoji:      '🦺',
    category:   'Protección',
    sizeLabel:  'Talla',
    sizes:      ['XS', 'S', 'M', 'L', 'XL'],
    hasColors:  true,
  },
  gloves: {
    key:        'gloves',
    label:      'Guantes',
    emoji:      '🧤',
    category:   'Portero',
    sizeLabel:  'Talla',
    sizes:      ['5', '6', '7', '8', '9', '10', '11'],
    hasColors:  true,
  },
  other: {
    key:        'other',
    label:      'Otro',
    emoji:      '📦',
    category:   '',
    sizeLabel:  'Talla',
    sizes:      [],
    hasColors:  false,
  },
}

// Legacy — kept for public catalog/detail page compatibility
export const COMMON_SIZES      = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
export const COMMON_SHOE_SIZES = ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45']
