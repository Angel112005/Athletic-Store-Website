/**
 * Domain Types / Constantes de dominio
 *
 * Centraliza los valores permitidos para evitar magic strings.
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

export const COMMON_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL']

export const COMMON_SHOE_SIZES = [
  '36', '37', '38', '39', '40', '41', '42', '43', '44', '45',
]

export const COMMON_COLORS = [
  { label: 'Negro',   hex: '#000000' },
  { label: 'Blanco',  hex: '#FFFFFF' },
  { label: 'Rojo',    hex: '#EF4444' },
  { label: 'Azul',    hex: '#3B82F6' },
  { label: 'Verde',   hex: '#22C55E' },
  { label: 'Amarillo',hex: '#EAB308' },
  { label: 'Naranja', hex: '#F97316' },
  { label: 'Morado',  hex: '#A855F7' },
  { label: 'Rosa',    hex: '#EC4899' },
  { label: 'Gris',    hex: '#6B7280' },
  { label: 'Dorado',  hex: '#C9A84C' },
]
