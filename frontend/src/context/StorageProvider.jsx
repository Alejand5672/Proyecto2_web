import { useCallback, useEffect, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import {
  guardarDestinos,
  obtenerDestinosGuardados,
} from '../services/destinosStorage'
import {
  archivarDestinoApi,
  guardarDestinoApi,
  obtenerDestinosApi,
} from '../services/destinosApi'
import { MODO_STORAGE_KEY, StorageContext } from './storageContext'

const MODOS_VALIDOS = ['api', 'local']

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
  const [modoGuardado, setModoGuardado] = useLocalStorage(
    MODO_STORAGE_KEY,
    'local',
  )
  const modoActual = MODOS_VALIDOS.includes(modoGuardado)
    ? modoGuardado
    : 'local'

  useEffect(() => {
    if (modoGuardado !== modoActual) {
      setModoGuardado(modoActual)
    }
  }, [modoActual, modoGuardado, setModoGuardado])

  const setModo = useCallback((modo) => {
    if (!MODOS_VALIDOS.includes(modo)) {
      return
    }

    setModoGuardado(modo)
  }, [setModoGuardado])

  const obtenerItems = useCallback(
    async () =>
      modoActual === 'api' ? obtenerDestinosApi() : obtenerDestinosGuardados(),
    [modoActual],
  )

  const guardarItem = useCallback(
    async (item) =>
      modoActual === 'api' ? guardarDestinoApi(item) : guardarItemLocal(item),
    [modoActual],
  )

  const eliminarItem = useCallback(
    async (id) =>
      modoActual === 'api' ? archivarDestinoApi(id) : eliminarItemLocal(id),
    [modoActual],
  )

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
