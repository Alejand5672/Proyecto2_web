import { run } from './connection.js'

export async function inicializarBaseDeDatos() {
  await run(`
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      categoriaId TEXT NOT NULL,
      pais TEXT NOT NULL,
      ciudad TEXT NOT NULL,
      estado TEXT NOT NULL,
      calificacion INTEGER NOT NULL,
      atributos TEXT NOT NULL,
      activo INTEGER NOT NULL DEFAULT 1,
      creadoEn TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      actualizadoEn TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `)

  await run(`
    CREATE TABLE IF NOT EXISTS registros (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      itemId INTEGER NOT NULL,
      fecha TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      diasEnDestino INTEGER NOT NULL,
      notas TEXT,
      FOREIGN KEY (itemId) REFERENCES items(id) ON DELETE CASCADE
    )
  `)
}
