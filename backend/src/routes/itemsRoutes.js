import { Router } from 'express'
import {
  actualizarItem,
  crearItem,
  crearRegistro,
  eliminarItem,
  obtenerItemPorId,
  obtenerItems,
} from '../repositories/itemsRepository.js'

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const items = await obtenerItems()
    res.json(items)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const item = await crearItem(req.body)
    res.status(201).json(item)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const item = await actualizarItem(req.params.id, req.body)

    if (!item) {
      res.status(404).json({ mensaje: 'Item no encontrado' })
      return
    }

    res.json(item)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const eliminado = await eliminarItem(req.params.id)

    if (!eliminado) {
      res.status(404).json({ mensaje: 'Item no encontrado' })
      return
    }

    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

router.post('/:id/registro', async (req, res, next) => {
  try {
    const item = await obtenerItemPorId(req.params.id)

    if (!item) {
      res.status(404).json({ mensaje: 'Item no encontrado' })
      return
    }

    const registro = await crearRegistro(req.params.id, req.body)
    res.status(201).json(registro)
  } catch (error) {
    next(error)
  }
})

export default router
