'use strict'

import express from 'express'
import boom from '@hapi/boom'

import { asyncMiddleware, checkRequiredParameters } from '../functions'
import db from '../database/controllers'
import { checkJwt, checkJwtRole } from '../middlewares/auth'


const router = express.Router()

router.get('/orders', checkJwt, checkJwtRole('importer'), asyncMiddleware(async (req, res) => {
  const data = await db.Importer.listOrders(req.user.id)
    .catch(err => {
      throw boom.badRequest(`Could not get the list of orders. ${err.message}`)
    })

  res.json({ data })
}))

router.post('/buy', checkJwt, checkJwtRole('importer'), asyncMiddleware(async (req, res) => {
  checkRequiredParameters(['offerId', 'quantity'], req.body)
  const { offerId, quantity } = req.body

  const data = await db.Importer.buy(req.user.id, offerId, quantity)
    .catch(err => {
      throw boom.badRequest(`${err.message}`)
    })

  res.json({ data })
}))

export default router
