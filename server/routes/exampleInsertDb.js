'use strict'

import express from 'express'

import { asyncMiddleware, checkRequiredParameters } from '../functions'
import DataController from '../database/controllers/Data'
import { DB_API_SENT_EXAMPLE } from '../../config.messagesId'

const router = express.Router()

// A simple route to add anything in database
router.post('/:dataToAdd', asyncMiddleware(async (req, res) => {
  // Check the request contains all the required parameters
  checkRequiredParameters(['dataToAdd'], req.params)

  const { dataToAdd } = req.params
  const obj = { data: dataToAdd, msgId: DB_API_SENT_EXAMPLE }
  DataController.add(obj)

  res.json(obj)
}))

export default router
