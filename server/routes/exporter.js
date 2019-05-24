'use strict'

import express from 'express'
import boom from '@hapi/boom'

import { asyncMiddleware, checkRequiredParameters } from '../functions'
import db from '../database/controllers'
import { checkJwt, checkJwtRole } from '../middlewares/auth'


const router = express.Router()

router.get('/offers', checkJwt, checkJwtRole('exporter'), asyncMiddleware(async (req, res) => {
  const data = await db.Exporter.listOffers(req.user.id)
    .catch(err => {
      throw boom.badRequest(`Could not get the list of offers. ${err.message}`)
    })

  res.json({ data })
}))

router.post('/offers', checkJwt, checkJwtRole('exporter'), asyncMiddleware(async (req, res) => {
  checkRequiredParameters(['coffeeType', 'originCountryCode', 'amount', 'bagPrice'], req.body)

  const { coffeeType, originCountryCode, amount, bagPrice } = req.body

  const data = await db.Exporter.createOffer(req.user.id, coffeeType, originCountryCode, amount, bagPrice)
    .catch(err => {
      throw boom.badRequest(`Could not create the offer. ${err.message}`)
    })

  res.json({ data })
}))


router.get('/orders', checkJwt, checkJwtRole('exporter'), asyncMiddleware(async (req, res) => {
  const data = await db.Exporter.listOrders(req.user.id)
    .catch(err => {
      throw boom.badRequest(`Could not get the list of orders. ${err.message}`)
    })

  res.json({ data })
}))

router.post('/order/:orderId/progress', checkJwt, checkJwtRole('exporter'), asyncMiddleware(async (req, res) => {
  checkRequiredParameters(['newProgressState'], req.body)
  checkRequiredParameters(['orderId'], req.params)

  const { orderId } = req.params
  const { newProgressState } = req.body

  const data = await db.Exporter.updateOrderState(req.user.id, orderId, newProgressState)
    .catch(err => {
      throw boom.badRequest(`Could not update the order state. ${err.message}`)
    })

  res.json({ data })
}))

export default router
