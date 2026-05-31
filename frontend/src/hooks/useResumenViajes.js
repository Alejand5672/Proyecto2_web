import { useMemo } from 'react'
import { CATEGORIAS } from '../utils/categorias'

const MS_POR_DIA = 24 * 60 * 60 * 1000

function normalizarTexto(texto) {
  return texto.toLowerCase().trim()
}

function crearDiasActividad() {
  const hoy = new Date()

  return Array.from({ length: 7 }, (_, index) => {
    const fecha = new Date(hoy.getTime() - (6 - index) * MS_POR_DIA)
    const clave = fecha.toISOString().slice(0, 10)

    return {
      clave,
      dia: fecha.toLocaleDateString('es-MX', {
        day: '2-digit',
        month: 'short',
      }),
      actividad: 0,
    }
  })
}

/**
 * Calcula el resumen de viajes, filtros aplicados y datos para graficas.
 *
 * @param {{ destinos: Array, actividad: Array, busqueda: string, filtroCategoria: string, filtroEstado: string }} destinosState Estado actual del reducer de destinos.
 * @returns {{ destinosFiltrados: Array, actividadPorDia: Array, destinosPorCategoria: Array, diasPorCategoria: Array, totalDiasFiltrados: number }} Datos derivados del log de viajes.
 */
export function useResumenViajes(destinosState) {
  const {
    actividad,
    busqueda,
    destinos,
    filtroCategoria,
    filtroEstado,
  } = destinosState

  const destinosFiltrados = useMemo(() => {
    const busquedaNormalizada = normalizarTexto(busqueda)

    return destinos.filter(
      (destino) =>
        (filtroCategoria === 'todas' ||
          destino.categoriaId === filtroCategoria) &&
        (filtroEstado === 'todos' ||
          (filtroEstado === 'activos' && destino.activo) ||
          (filtroEstado === 'inactivos' && !destino.activo)) &&
        destino.nombre.toLowerCase().includes(busquedaNormalizada),
    )
  }, [busqueda, destinos, filtroCategoria, filtroEstado])

  const destinosFiltradosIds = useMemo(
    () => new Set(destinosFiltrados.map((destino) => destino.id)),
    [destinosFiltrados],
  )

  const actividadPorDia = useMemo(() => {
    const dias = crearDiasActividad()
    const diasPorClave = new Map(dias.map((dia) => [dia.clave, dia]))

    actividad.forEach((registro) => {
      if (!destinosFiltradosIds.has(registro.destinoId)) {
        return
      }

      const dia = diasPorClave.get(registro.fecha.slice(0, 10))

      if (dia) {
        dia.actividad += 1
      }
    })

    return dias
  }, [actividad, destinosFiltradosIds])

  const destinosPorCategoria = useMemo(
    () =>
      CATEGORIAS.map((categoria) => ({
        categoriaId: categoria.id,
        categoria: categoria.nombre,
        color: categoria.color,
        total: destinosFiltrados.filter(
          (destino) => destino.categoriaId === categoria.id,
        ).length,
      })).filter((categoria) => categoria.total > 0),
    [destinosFiltrados],
  )

  const diasPorCategoria = useMemo(
    () =>
      CATEGORIAS.map((categoria) => ({
        categoriaId: categoria.id,
        categoria: categoria.nombre,
        color: categoria.color,
        dias: destinosFiltrados
          .filter((destino) => destino.categoriaId === categoria.id)
          .reduce(
            (total, destino) => total + destino.atributos.diasEnDestino,
            0,
          ),
      })).filter((categoria) => categoria.dias > 0),
    [destinosFiltrados],
  )

  const totalDiasFiltrados = useMemo(
    () =>
      destinosFiltrados.reduce(
        (total, destino) => total + destino.atributos.diasEnDestino,
        0,
      ),
    [destinosFiltrados],
  )

  return {
    actividadPorDia,
    destinosFiltrados,
    destinosPorCategoria,
    diasPorCategoria,
    totalDiasFiltrados,
  }
}
