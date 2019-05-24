'use strict'

import express from 'express'
import boom from '@hapi/boom'

import { asyncMiddleware } from '../functions'
import db from '../database/controllers'
import { checkJwt } from '../middlewares/auth'


const router = express.Router()

// Get the profile of the current user
router.get('/profile', checkJwt, asyncMiddleware(async (req, res) => {
  let data
  data = await db.Exporter.find(req.user.id)
    .catch(err => {
      if (err.message === 'User not found.') return
      throw boom.boomify(err, { statusCode: 404 })
    })

  if (!data)
    data = await db.Importer.find(req.user.id)
      .catch(err => {
        throw boom.boomify(err, { statusCode: 404 })
      })


  res.json({ data })
}))

// Get the profile of any user
router.get('/profile/:id', checkJwt, asyncMiddleware(async (req, res) => {
  let data

  data = await db.Exporter.find(req.params.id)
    .catch(err => {
      if (err.message === 'User not found.') return
      throw boom.boomify(err, { statusCode: 404 })
    })

  if (!data)
    data = await db.Importer.find(req.params.id)
      .catch(err => {
        throw boom.boomify(err, { statusCode: 404 })
      })

  res.json({ data })
}))

export default router
