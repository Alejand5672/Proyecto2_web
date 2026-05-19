import express from 'express'
import { corsMiddleware } from './config/cors.js'
import itemsRoutes from './routes/itemsRoutes.js'

const app = express()

app.use(corsMiddleware)
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'viajes-lugares-backend',
  })
})

app.use('/api/items', itemsRoutes)

app.use((error, req, res, next) => {
  console.error(error)
  res.status(500).json({
    mensaje: 'Error interno del servidor',
  })
})

export default app
