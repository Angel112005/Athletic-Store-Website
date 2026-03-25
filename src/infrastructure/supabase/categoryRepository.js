/**
 * Category Repository
 */

import { supabase } from './client'
import { fromSupabase } from '@/domain/entities/category'

/**
 * Obtiene todas las categorías activas (cara pública).
 * @returns {Promise<object[]>}
 */
export async function getPublicCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, is_active, created_at')
    .eq('is_active', true)
    .order('name')

  if (error) throw error
  return (data ?? []).map(fromSupabase)
}

/**
 * Obtiene todas las categorías (admin).
 * @returns {Promise<object[]>}
 */
export async function getAllCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, is_active, created_at')
    .order('name')

  if (error) throw error
  return (data ?? []).map(fromSupabase)
}

/**
 * Crea una categoría nueva o retorna la existente (upsert por nombre).
 * @param {string} name
 * @returns {Promise<object>}
 */
export async function getOrCreateCategory(name) {
  const trimmed = name.trim()

  // Buscar existente (case-insensitive)
  const { data: existing } = await supabase
    .from('categories')
    .select('id, name, is_active, created_at')
    .ilike('name', trimmed)
    .single()

  if (existing) return fromSupabase(existing)

  // Crear nueva
  const { data, error } = await supabase
    .from('categories')
    .insert([{ name: trimmed }])
    .select()
    .single()

  if (error) throw error
  return fromSupabase(data)
}

/**
 * Elimina una categoría.
 * @param {string} id
 */
export async function deleteCategory(id) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) throw error
}
