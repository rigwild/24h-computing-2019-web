'use strict'

import express from 'express'
import boom from '@hapi/boom'

import { asyncMiddleware, checkRequiredParameters } from '../functions'
import { checkNoJwt } from '../middlewares/auth'
import db from '../database/controllers'

const router = express.Router()

router.post('/register', checkNoJwt, asyncMiddleware(async (req, res) => {
  // Check the request contains all the required parameters
  checkRequiredParameters(['username', 'password', 'role', 'address', 'phone'], req.body)

  const { username, password, role, address, phone } = req.body

  if (!['importer', 'exporter'].some(x => role === x))
    throw boom.badRequest('You can only choose the role "importer" or "exporter".')

  const customModel = role === 'importer' ? db.Importer : db.Exporter
  const userObj = await customModel.register(username, password, role, address, phone)
    .catch(err => {
      throw boom.boomify(err, { statusCode: 400 })
    })

  res.json({
    data: userObj
  })
}))


router.post('/login', checkNoJwt, asyncMiddleware(async (req, res) => {
  // Check the request contains all the required parameters
  checkRequiredParameters(['username', 'password'], req.body)

  const { username, password } = req.body

  let loginObj

  loginObj = await db.Exporter.login(username, password)
    .catch(err => {
      if (err.message === 'Invalid username or password.') return
      throw boom.boomify(err, { statusCode: 401 })
    })

  if (!loginObj)
    loginObj = await db.Importer.login(username, password)
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
