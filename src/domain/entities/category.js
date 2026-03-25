/**
 * Category Entity
 */

/**
 * Transforma el raw de Supabase a la entidad de dominio.
 * @param {object} raw
 * @returns {object}
 */
export function fromSupabase(raw) {
  return {
    id: raw.id,
    name: raw.name,
    isActive: raw.is_active,
    createdAt: raw.created_at,
  }
}
