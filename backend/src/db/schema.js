import { randomUUID } from 'node:crypto'
import { all, get, run } from './connection.js'
import { destinosIniciales } from './seedData.js'

async function tablaExiste(nombre) {
  const row = await get(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?",
    [nombre],
  )

  return Boolean(row)
}

async function recrearSiEsEsquemaAnterior() {
  if (!(await tablaExiste('items'))) {
    return
  }

  const columnas = await all('PRAGMA table_info(items)')
  const columnaId = columnas.find((columna) => columna.name === 'id')
  const total = await get('SELECT COUNT(*) AS total FROM items')

  if (columnaId?.type !== 'TEXT' && total.total === 0) {
    await run('DROP TABLE IF EXISTS registros')
    await run('DROP TABLE IF EXISTS items')
  }
}

async function insertarDestinosIniciales() {
  const total = await get('SELECT COUNT(*) AS total FROM items')

  if (total.total > 0) {
    return
  }

  for (const destino of destinosIniciales) {
    const fecha = new Date().toISOString()

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
        destino.id,
        destino.nombre,
        destino.categoriaId,
        destino.pais,
        destino.ciudad,
        destino.estado,
        destino.calificacion,
        destino.calificacion,
        fecha,
        fecha,
        destino.atributos.notas,
        JSON.stringify(destino.atributos),
        destino.activo ? 1 : 0,
      ],
    )
  }
}

export async function inicializarBaseDeDatos() {
  await recrearSiEsEsquemaAnterior()

  await run(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      categoriaId TEXT NOT NULL,
      pais TEXT NOT NULL,
      ciudad TEXT NOT NULL,
      estado TEXT NOT NULL,
      calificacion INTEGER NOT NULL,
      puntuacion REAL,
      fechaRegistro TEXT NOT NULL,
      fechaActividad TEXT NOT NULL,
      notas TEXT,
      atributos TEXT NOT NULL,
      activo INTEGER NOT NULL DEFAULT 1,
      creadoEn TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      actualizadoEn TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await run(`
    CREATE TABLE IF NOT EXISTS registros (
      id TEXT PRIMARY KEY,
      itemId TEXT NOT NULL,
      fecha TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      valor REAL,
      diasEnDestino INTEGER NOT NULL,
      notas TEXT,
      FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE
    )
  `)

  await insertarDestinosIniciales()
}

export function crearIdRegistro() {
  return randomUUID()
}
