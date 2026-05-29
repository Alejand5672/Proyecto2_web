import { useEffect, useState } from 'react'

function puedeUsarLocalStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

function leerValorInicial(key, valorInicial) {
  if (!puedeUsarLocalStorage()) {
    return valorInicial
  }

  const valorGuardado = window.localStorage.getItem(key)

  if (valorGuardado === null) {
    return valorInicial
  }

  try {
    return JSON.parse(valorGuardado)
  } catch {
    return valorGuardado
  }
}

/**
 * Sincroniza un estado de React con una clave de LocalStorage.
 *
 * @param {string} key Clave donde se guarda el valor en LocalStorage.
 * @param {*} valorInicial Valor usado cuando no existe nada guardado.
 * @returns {[*, Function]} Valor actual y funcion para actualizarlo.
 */
export function useLocalStorage(key, valorInicial) {
  const [valor, setValor] = useState(() => leerValorInicial(key, valorInicial))

  useEffect(() => {
    if (!puedeUsarLocalStorage()) {
      return
    }

    window.localStorage.setItem(key, JSON.stringify(valor))
  }, [key, valor])

  return [valor, setValor]
}
