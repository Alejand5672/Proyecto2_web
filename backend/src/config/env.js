import 'dotenv/config'

function leerListaEnv(valor, respaldo) {
  return (valor ?? respaldo)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

export const env = {
  port: Number(process.env.PORT ?? 3000),
  frontendUrls: leerListaEnv(
    process.env.FRONTEND_URL,
    'http://localhost:5173,http://127.0.0.1:5173',
  ),
  databasePath: process.env.DATABASE_PATH ?? './data/viajes_lugares.sqlite',
}
