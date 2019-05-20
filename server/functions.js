'use strict'

import boom from '@hapi/boom'
import { logger } from './winston.config'

/**
 * Call the error handler if a middleware function throw an error
 *
 * @param {Function} fn original middleware function of the route
 * @returns {Promise<Function>} the same middleware function of the route but error handled
 */
export const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    next(err)
  })
}

// Middleware to handle middleware errors
export const errorHandler = (err, req, res, next) => {
  // Check whether the error is a boom error
  if (!err.isBoom) {
    // Check if error is invalid JSON body
    if (err instanceof SyntaxError && err.status === 400 && err.hasOwnProperty('body'))
      err = boom.badRequest(err)
    else {
      // The error was not recognized, send a 500 HTTP error
      err = boom.internal(err)
    }
  }

  const { output: { payload } } = err

  // Pass the error to the logging handler
  let errorLogged = new Error(`Error ${payload.statusCode} - ${payload.error} - Message :\n${payload.message}`)
  errorLogged.stack = err.stack
  logger.error(formatError(errorLogged, err.data))

  // Send the error to the client
  res.status(payload.statusCode).json({
    message: err.message || payload.message,
    data: err.data || undefined
  })

  next()
}


/**
 * Check the request contains all the required parameters
 *
 * @param {string[]} requiredParameters list of all required parameters
 * @param {object} parameters parameters provided in the request (req.query)
 * @returns {void}
 * @throws missing parameters
 */
export const checkRequiredParameters = (requiredParameters, parameters) => {
  if (!requiredParameters.every(aRequiredParameter => parameters.hasOwnProperty(aRequiredParameter)))
    throw boom.badRequest(`Missing parameter(s). Required parameters : ${requiredParameters.join(', ')}.`)
}


/**
 * Format a string or object to a log object
 *
 * @param {object|string} data any message or object
 * @param {('info'|'message'|'error'|any|undefined)} event the type of event
 * @returns {string} the log object stringified
 */
export const formatLog = (data, event = undefined) => (({
  event,
  log: data,
  date: new Date()
}))

/**
 * Format an error object
 *
 * @param {Error} errObj an Error object
 * @param {any} data any data to pass to the formatter
 * @returns {string} formatted log object stringified
 */
export const formatError = (errObj, data = undefined) => formatLog({ error: errObj.message, stack: errObj.stack, data })
