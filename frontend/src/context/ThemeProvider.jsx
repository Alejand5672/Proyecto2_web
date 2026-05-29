import { useCallback, useEffect, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { THEME_STORAGE_KEY, ThemeContext } from './themeContext'

const TEMAS_VALIDOS = ['claro', 'oscuro']

export function ThemeProvider({ children }) {
  const [temaGuardado, setTemaGuardado] = useLocalStorage(
    THEME_STORAGE_KEY,
    'claro',
  )
  const temaActual = TEMAS_VALIDOS.includes(temaGuardado)
    ? temaGuardado
    : 'claro'

  useEffect(() => {
    document.body.setAttribute('data-theme', temaActual)
  }, [temaActual])

  useEffect(() => {
    if (temaGuardado !== temaActual) {
      setTemaGuardado(temaActual)
    }
  }, [setTemaGuardado, temaActual, temaGuardado])

  const setTema = useCallback((tema) => {
    if (!TEMAS_VALIDOS.includes(tema)) {
      return
    }

    setTemaGuardado(tema)
  }, [setTemaGuardado])

  const alternarTema = useCallback(() => {
    setTemaGuardado((tema) => (tema === 'claro' ? 'oscuro' : 'claro'))
  }, [setTemaGuardado])

  const value = useMemo(
    () => ({
      tema: temaActual,
      setTema,
      alternarTema,
    }),
    [alternarTema, setTema, temaActual],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
