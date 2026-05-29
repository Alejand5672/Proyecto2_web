import { useCallback, useEffect, useState } from 'react'

const OPCIONES_FETCH_VACIAS = {}

/**
 * Ejecuta una peticion fetch con estados de carga, datos y error.
 *
 * @param {string} url URL que se consulta con fetch.
 * @param {RequestInit} opciones Opciones enviadas a fetch.
 * @returns {{ data: *, loading: boolean, error: Error | null, refetch: Function }} Estado de la peticion y funcion para repetirla.
 */
export function useFetch(url, opciones = OPCIONES_FETCH_VACIAS) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [refetchKey, setRefetchKey] = useState(0)

  const refetch = useCallback(() => {
    setRefetchKey((key) => key + 1)
  }, [])

  useEffect(() => {
    if (!url) {
      return
    }

    const controller = new AbortController()

    async function cargarDatos() {
      try {
        setLoading(true)
        setError(null)

        const respuesta = await fetch(url, {
          ...opciones,
          signal: controller.signal,
        })

        if (!respuesta.ok) {
          throw new Error(`Error HTTP ${respuesta.status}`)
        }

        const resultado = respuesta.status === 204
          ? null
          : await respuesta.json()

        setData(resultado)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    cargarDatos()

    return () => controller.abort()
  }, [opciones, refetchKey, url])

  return {
    data,
    loading,
    error,
    refetch,
  }
}
