'use strict'

import express from 'express'
import boom from '@hapi/boom'

import { asyncMiddleware } from '../functions'
import db from '../database/controllers'
import checkJwt from '../middlewares/auth'


const router = express.Router()

router.get('/profile', checkJwt, asyncMiddleware(async (req, res) => {
  // You access the JWT data with `req.user`!

  const data = await db.User.find(req.user.id)
    .catch(err => {
      throw boom.boomify(err, { statusCode: 500 })
    })

  res.json({ data })
}))

export default router
