import { randomUUID } from 'node:crypto'

export function mapearItem(row) {
  if (!row) {
    return null
  }

  return {
    id: row.id,
    nombre: row.nombre,
    categoriaId: row.categoriaId,
    pais: row.pais,
    ciudad: row.ciudad,
    estado: row.estado,
    calificacion: row.calificacion,
    puntuacion: row.puntuacion,
    fechaRegistro: row.fechaRegistro,
    fechaActividad: row.fechaActividad,
    notas: row.notas,
    atributos: JSON.parse(row.atributos),
    activo: Boolean(row.activo),
  }
}

export function prepararItem(datos) {
  const ahora = new Date().toISOString()
  const atributos = datos.atributos ?? {}
  const fechaRegistro = datos.fechaRegistro ?? ahora

  return {
    id: datos.id ?? randomUUID(),
    nombre: datos.nombre,
    categoriaId: datos.categoriaId,
    pais: datos.pais,
    ciudad: datos.ciudad,
    estado: datos.estado,
    calificacion: Number(datos.calificacion),
    puntuacion: Number(datos.calificacion),
    fechaRegistro,
    fechaActividad: ahora,
    notas: atributos.notas ?? datos.notas ?? '',
    atributos: JSON.stringify(atributos),
    activo: datos.activo ? 1 : 0,
  }
}
