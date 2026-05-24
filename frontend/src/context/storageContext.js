import { createContext, useContext } from 'react'

export const StorageContext = createContext(null)
export const MODO_STORAGE_KEY = 'viajes_lugares_modo'

export function useStorage() {
  const context = useContext(StorageContext)

  if (!context) {
    throw new Error('useStorage debe usarse dentro de StorageProvider')
  }

  return context
}
