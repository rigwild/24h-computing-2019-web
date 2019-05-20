'use strict'

import express from 'express'
import boom from '@hapi/boom'

import { asyncMiddleware, checkRequiredParameters } from '../functions'

const router = express.Router()

// A complete route example

router.post('/', asyncMiddleware(async (req, res) => {
  // Check the request contains all the required query parameters
  checkRequiredParameters(['queryParam1', 'queryParam2'], req.query)

  // Check the request contains all the required body parameters
  checkRequiredParameters(['bodyParam1'], req.body)

  const { queryParam1, queryParam2 } = req.query
  const { bodyParam1 } = req.body

  /* ******************* */
  /* You can check multiple parameters before using them */
  /* ******************* */
  let errorList = []

  // Check `queryParam1` is an integer
  if (!Number.isInteger(parseInt(queryParam1, 10)))
    errorList.push('"queryParam1" is not an integer.')

  // Check `queryParam2` is not 42
  if (queryParam2 === 42)
    errorList.push('"queryParam2" should not be 42.')

  // Check there is no errors with parameters
  if (errorList.length > 0)
    throw boom.badRequest('Invalid query parameter(s).', errorList)


  /* ******************* */
  /* You can check for one parameter only too */
  /* Errors will be automatically catched and sent to the user and logging system */
  /* ******************* */
  if (bodyParam1 === 'fail') throw boom.badRequest('"bodyParam1" failed.')


  res.json({ data: 'example' })
}))

export default router
