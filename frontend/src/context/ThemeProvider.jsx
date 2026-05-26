import { useCallback, useEffect, useMemo, useState } from 'react'
import { THEME_STORAGE_KEY, ThemeContext } from './themeContext'

const TEMAS_VALIDOS = ['claro', 'oscuro']

function tieneLocalStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

function obtenerTemaGuardado() {
  if (!tieneLocalStorage()) {
    return 'claro'
  }

  const temaGuardado = window.localStorage.getItem(THEME_STORAGE_KEY)
  return TEMAS_VALIDOS.includes(temaGuardado) ? temaGuardado : 'claro'
}

function persistirTema(tema) {
  if (!tieneLocalStorage()) {
    return
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, tema)
}

export function ThemeProvider({ children }) {
  const [temaActual, setTemaActual] = useState(obtenerTemaGuardado)

  useEffect(() => {
    document.body.setAttribute('data-theme', temaActual)
    persistirTema(temaActual)
  }, [temaActual])

  const setTema = useCallback((tema) => {
    if (!TEMAS_VALIDOS.includes(tema)) {
      return
    }

    setTemaActual(tema)
  }, [])

  const alternarTema = useCallback(() => {
    setTemaActual((tema) => (tema === 'claro' ? 'oscuro' : 'claro'))
  }, [])

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
