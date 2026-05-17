import { destinosIniciales } from './destinosIniciales'

const STORAGE_KEY = 'viajes_lugares_destinos'

function tieneLocalStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

export function obtenerDestinosGuardados() {
  if (!tieneLocalStorage()) {
    return destinosIniciales
  }

  const destinosGuardados = window.localStorage.getItem(STORAGE_KEY)

  if (!destinosGuardados) {
    return destinosIniciales
  }

  try {
    const destinos = JSON.parse(destinosGuardados)
    return Array.isArray(destinos) && destinos.length > 0
      ? destinos
      : destinosIniciales
  } catch {
    return destinosIniciales
  }
}

export function guardarDestinos(destinos) {
  if (!tieneLocalStorage()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(destinos))
}

export { STORAGE_KEY }
