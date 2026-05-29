import cors from 'cors'
import { env } from './env.js'

const origenesPermitidos = [
  env.frontendUrl,
  'http://localhost:5173',
  'http://127.0.0.1:5173',
]

export const corsMiddleware = cors({
  origin(origin, callback) {
    if (!origin || origenesPermitidos.includes(origin)) {
      callback(null, true)
      return
    }

    callback(new Error(`Origen no permitido por CORS: ${origin}`))
  },
})
