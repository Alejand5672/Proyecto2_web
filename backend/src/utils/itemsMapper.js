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
    atributos: JSON.parse(row.atributos),
    activo: Boolean(row.activo),
  }
}

export function prepararItem(datos) {
  return {
    nombre: datos.nombre,
    categoriaId: datos.categoriaId,
    pais: datos.pais,
    ciudad: datos.ciudad,
    estado: datos.estado,
    calificacion: Number(datos.calificacion),
    atributos: JSON.stringify(datos.atributos ?? {}),
    activo: datos.activo ? 1 : 0,
  }
}
