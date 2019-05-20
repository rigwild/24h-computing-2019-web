'use strict'

import express from 'express'
import boom from '@hapi/boom'

import { asyncMiddleware, checkRequiredParameters } from '../functions'
import DataController from '../database/controllers/Data'
import { DB_API_SENT_EXAMPLE } from '../../config.messagesId'

const router = express.Router()

// A simple route to add anything in database
router.post('/:dataToAdd', asyncMiddleware(async (req, res) => {
  // Check the request contains all the required parameters
  checkRequiredParameters(['dataToAdd'], req.params)

  const { dataToAdd } = req.params

  // Throw an error if dataToAdd = '42'
  if (dataToAdd === '42') throw boom.badRequest('"dataToAdd" should not be 42.')

  const obj = { data: dataToAdd, msgId: DB_API_SENT_EXAMPLE }
  DataController.add(obj)

  res.json({ data: obj })
}))

export default router
