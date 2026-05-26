import { createContext, useContext } from 'react'

export const ThemeContext = createContext(null)
export const THEME_STORAGE_KEY = 'viajes_lugares_tema'

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme debe usarse dentro de ThemeProvider')
  }

  return context
}
