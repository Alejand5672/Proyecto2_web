import app from './app.js'
import { env } from './config/env.js'
import { inicializarBaseDeDatos } from './db/schema.js'

try {
  await inicializarBaseDeDatos()

  app.listen(env.port, () => {
    console.log(`Backend escuchando en http://localhost:${env.port}`)
  })
} catch (error) {
  console.error('No se pudo inicializar la base de datos', error)
  process.exit(1)
}
