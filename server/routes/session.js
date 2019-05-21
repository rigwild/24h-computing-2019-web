'use strict'

import express from 'express'
import boom from '@hapi/boom'

import { asyncMiddleware, checkRequiredParameters } from '../functions'
import db from '../database/controllers'

const router = express.Router()

router.post('/register', asyncMiddleware(async (req, res) => {
  // Check the request contains all the required parameters
  checkRequiredParameters(['username', 'password'], req.body)

  const { username, password } = req.body

  const _username = await db.User.register(username, password)
    .catch(err => {
      throw boom.boomify(err, { statusCode: 400 })
    })

  res.json({
    data: {
      username: _username
    }
  })
}))


router.post('/login', asyncMiddleware(async (req, res) => {
  // Check the request contains all the required parameters
  checkRequiredParameters(['username', 'password'], req.body)

  const { username, password } = req.body

  const loginObj = await db.User.login(username, password)
    .catch(err => {
      throw boom.boomify(err, { statusCode: 401 })
    })

  res.json({
    data: {
      ...loginObj
    }
  })
}))

export default router
