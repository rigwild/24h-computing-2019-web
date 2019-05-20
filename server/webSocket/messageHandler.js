'use strict'

import { formatLog } from '../functions'
import { TEST_MODE } from '../../config'
import { wsLogger } from '../winston.config'
// import DataController from '../database/controllers/Data'

/**
 * @typedef {Function} MessageHandler
 * @param {string} data a message received from a client
 */
/**
 * Treat received message from a WebSocket client
 * @param {object} ws a WebSocket connected client
 * @returns {MessageHandler} the message handler
 */
const messageHandler = ws => async data => {
  let json
  try {
    json = JSON.parse(data)
  }
  catch (err) {
    throw new Error('Invalid JSON data.')
  }

  if (!TEST_MODE) wsLogger.info(formatLog(json, 'message'))

  // Here you can do whatever you want with the message!

  // Add message to database
  // await DataController.add(json)

  ws.send('{"message":"ok"}')
}

export default messageHandler
