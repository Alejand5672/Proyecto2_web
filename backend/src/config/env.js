import 'dotenv/config'

export const env = {
  port: Number(process.env.PORT ?? 3000),
  frontendUrl: process.env.FRONTEND_URL ?? 'http://127.0.0.1:5173',
  databasePath: process.env.DATABASE_PATH ?? './data/viajes_lugares.sqlite',
}
