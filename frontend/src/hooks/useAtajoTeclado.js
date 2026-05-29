import { useEffect } from 'react'

function estaEscribiendo(elemento) {
  const etiqueta = elemento?.tagName

  return (
    elemento?.isContentEditable ||
    etiqueta === 'INPUT' ||
    etiqueta === 'SELECT' ||
    etiqueta === 'TEXTAREA'
  )
}

/**
 * Ejecuta una accion cuando se presiona un atajo de teclado.
 *
 * @param {string} tecla Tecla que activa el atajo.
 * @param {Function} callback Funcion que se ejecuta al detectar el atajo.
 * @param {{ ctrlKey?: boolean, ignorarInputs?: boolean }} opciones Configuracion del atajo.
 * @returns {void}
 */
export function useAtajoTeclado(tecla, callback, opciones = {}) {
  const { ctrlKey = false, ignorarInputs = true } = opciones

  useEffect(() => {
    const teclaNormalizada = tecla.toLowerCase()

    function manejarKeydown(evento) {
      if (ctrlKey && !evento.ctrlKey) {
        return
      }

      if (!ctrlKey && evento.ctrlKey) {
        return
      }

      if (ignorarInputs && estaEscribiendo(evento.target)) {
        return
      }

      if (evento.key.toLowerCase() !== teclaNormalizada) {
        return
      }

      evento.preventDefault()
      callback(evento)
    }

    window.addEventListener('keydown', manejarKeydown)
    return () => window.removeEventListener('keydown', manejarKeydown)
  }, [callback, ctrlKey, ignorarInputs, tecla])
}
