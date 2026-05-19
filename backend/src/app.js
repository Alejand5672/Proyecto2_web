import express from 'express'
import { corsMiddleware } from './config/cors.js'

const app = express()

app.use(corsMiddleware)
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'viajes-lugares-backend',
  })
})

export default app
