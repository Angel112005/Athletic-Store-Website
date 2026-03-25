/**
 * Auth Repository
 *
 * Solo login/logout de admin. Sin registro público.
 */

import { supabase } from './client'

/**
 * Inicia sesión con email y contraseña.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>} session
 */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data.session
}

/**
 * Cierra la sesión actual.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Obtiene la sesión activa.
 * @returns {Promise<object|null>}
 */
export async function getSession() {
  const { data } = await supabase.auth.getSession()
  return data.session
}

/**
 * Suscribe a cambios de estado de autenticación.
 * @param {Function} callback
 * @returns {Function} unsubscribe
 */
export function onAuthStateChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
  return data.subscription.unsubscribe
}
