import { useCallback, useMemo, useState } from 'react'
import {
  guardarDestinos,
  obtenerDestinosGuardados,
} from '../services/destinosStorage'
import { MODO_STORAGE_KEY, StorageContext } from './storageContext'

const MODOS_VALIDOS = ['api', 'local']

function tieneLocalStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

function obtenerModoGuardado() {
  if (!tieneLocalStorage()) {
    return 'local'
  }

  const modoGuardado = window.localStorage.getItem(MODO_STORAGE_KEY)
  return MODOS_VALIDOS.includes(modoGuardado) ? modoGuardado : 'local'
}

function persistirModo(modo) {
  if (!tieneLocalStorage()) {
    return
  }

  window.localStorage.setItem(MODO_STORAGE_KEY, modo)
}

function guardarItemLocal(item) {
  const destinos = obtenerDestinosGuardados()
  const existeItem = destinos.some((destino) => destino.id === item.id)
  const destinosActualizados = existeItem
    ? destinos.map((destino) => (destino.id === item.id ? item : destino))
    : [item, ...destinos]

  guardarDestinos(destinosActualizados)
  return item
}

function eliminarItemLocal(id) {
  const destinos = obtenerDestinosGuardados()
  const destinosActualizados = destinos.map((destino) =>
    destino.id === id
      ? {
          ...destino,
          activo: false,
        }
      : destino,
  )

  guardarDestinos(destinosActualizados)
  return destinosActualizados.find((destino) => destino.id === id) ?? null
}

export function StorageProvider({ children }) {
  const [modoActual, setModoActual] = useState(obtenerModoGuardado)

  const setModo = useCallback((modo) => {
    if (!MODOS_VALIDOS.includes(modo)) {
      return
    }

    setModoActual(modo)
    persistirModo(modo)
  }, [])

  const obtenerItems = useCallback(async () => obtenerDestinosGuardados(), [])

  const guardarItem = useCallback(async (item) => guardarItemLocal(item), [])

  const eliminarItem = useCallback(async (id) => eliminarItemLocal(id), [])

  const value = useMemo(
    () => ({
      modo: modoActual,
      setModo,
      obtenerItems,
      guardarItem,
      eliminarItem,
    }),
    [eliminarItem, guardarItem, modoActual, obtenerItems, setModo],
  )

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  )
}
