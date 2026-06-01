import { all, get, run } from '../db/connection.js'
import { crearIdRegistro } from '../db/schema.js'
import { mapearItem, prepararItem } from '../utils/itemsMapper.js'

export async function obtenerItems() {
  const rows = await all('SELECT * FROM items ORDER BY fechaRegistro DESC')
  return rows.map(mapearItem)
}

export async function obtenerItemPorId(id) {
  const row = await get('SELECT * FROM items WHERE id = ?', [id])
  return mapearItem(row)
}

export async function crearItem(datos) {
  const item = prepararItem(datos)

  await run(
    `INSERT INTO items (
      id,
      nombre,
      categoriaId,
      pais,
      ciudad,
      estado,
      calificacion,
      puntuacion,
      fechaRegistro,
      fechaActividad,
      notas,
      atributos,
      activo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      item.id,
      item.nombre,
      item.categoriaId,
      item.pais,
      item.ciudad,
      item.estado,
      item.calificacion,
      item.puntuacion,
      item.fechaRegistro,
      item.fechaActividad,
      item.notas,
      item.atributos,
      item.activo,
    ],
  )

  return obtenerItemPorId(item.id)
}

export async function actualizarItem(id, datos) {
  const item = prepararItem(datos)

  const resultado = await run(
    `UPDATE items
    SET
      nombre = ?,
      categoriaId = ?,
      pais = ?,
      ciudad = ?,
      estado = ?,
      calificacion = ?,
      puntuacion = ?,
      fechaActividad = ?,
      notas = ?,
      atributos = ?,
      activo = ?,
      actualizadoEn = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [
      item.nombre,
      item.categoriaId,
      item.pais,
      item.ciudad,
      item.estado,
      item.calificacion,
      item.puntuacion,
      item.fechaActividad,
      item.notas,
      item.atributos,
      item.activo,
      id,
    ],
  )

  if (resultado.changes === 0) {
    return null
  }

  return obtenerItemPorId(id)
}

export async function eliminarItem(id) {
  const resultado = await run('DELETE FROM items WHERE id = ?', [id])

  return resultado.changes > 0
}

export async function crearRegistro(itemId, datos) {
  const id = crearIdRegistro()
  const valor = Number(datos.valor ?? datos.diasEnDestino ?? 0)

  await run(
    `INSERT INTO registros (
      id,
      itemId,
      valor,
      diasEnDestino,
      notas
    ) VALUES (?, ?, ?, ?, ?)`,
    [
      id,
      itemId,
      valor,
      Number(datos.diasEnDestino ?? valor),
      datos.notas ?? null,
    ],
  )

  return get('SELECT * FROM registros WHERE id = ?', [id])
}
