import { all, get, run } from '../db/connection.js'
import { mapearItem, prepararItem } from '../utils/itemsMapper.js'

export async function obtenerItems() {
  const rows = await all('SELECT * FROM items ORDER BY id DESC')
  return rows.map(mapearItem)
}

export async function obtenerItemPorId(id) {
  const row = await get('SELECT * FROM items WHERE id = ?', [id])
  return mapearItem(row)
}

export async function crearItem(datos) {
  const item = prepararItem(datos)

  const resultado = await run(
    `INSERT INTO items (
      nombre,
      categoriaId,
      pais,
      ciudad,
      estado,
      calificacion,
      atributos,
      activo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      item.nombre,
      item.categoriaId,
      item.pais,
      item.ciudad,
      item.estado,
      item.calificacion,
      item.atributos,
      item.activo,
    ],
  )

  return obtenerItemPorId(resultado.id)
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
  const resultado = await run(
    `INSERT INTO registros (
      itemId,
      diasEnDestino,
      notas
    ) VALUES (?, ?, ?)`,
    [itemId, Number(datos.diasEnDestino), datos.notas ?? null],
  )

  return get('SELECT * FROM registros WHERE id = ?', [resultado.id])
}
