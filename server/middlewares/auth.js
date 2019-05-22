'use strict'

import boom from '@hapi/boom'
import expressJwt from 'express-jwt'
import { jwtSecret } from '../../config'

// Turning of valid-jsdoc rule for this file
/* eslint valid-jsdoc: 0 */

/**
 * Check the request contains a valid JWT.
 *
 * Will set the content of the JWT in `req.user`.
 */
export const checkJwt = expressJwt({ secret: jwtSecret })

/**
 * Check the request does not contain a Authorization header.
 * @throws The Authorization header is set
 */
export const checkNoJwt = (req, res, next) => {
  if (req.headers.authorization)
    throw boom.conflict('You can\'t access this resource with a authorization header token set.')
  next()
}

/**
 * Check the JWT `role` property matches the needed role
 *
 * You must call the `checkJwt` middleware before this middleware.
 *
 * @param {String} neededRole The role needed to access the route
 * @returns {Function} The middleware
 * @throws The JWT role does not match with the needed role
 */
export const checkJwtRole = neededRole => (req, res, next) => {
  console.log(req.user)
  if (req.user && req.user.role === neededRole)
    return next()
  throw boom.forbidden(`You need the "${neededRole}" role to access this resource.`)
}
