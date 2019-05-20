'use strict'

import path from 'path'
import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'
import bodyParser from 'body-parser'

import routes from './routes'
import { errorHandler, formatLog } from './functions'
import { apiPrefix, serverPort, serveClient } from '../config'
import { logger } from './winston.config'
import startWebSocketServer from './webSocket'
import connectDb from './database'
const morgan = require('morgan')

const app = express()

// Activating logging
app.use(morgan('combined', {
  stream: { write: message => logger.info(message) }
}))

// Use gzip compression to improve performance
app.use(compression())

// Enhance the app security by setting some HTTP headers
app.use(helmet())

// Turn "Cross-origin resource sharing" on to allow remote clients to connect to the API
app.use(cors())

// Parse JSON body
app.use(bodyParser.json())

// Load all the API routes in the server
app.use(apiPrefix, routes)

// Serve client files
if (serveClient) app.use('/', express.static(path.resolve(__dirname, '../dist')))
else app.get('*', (req, res) => res.status(404).send('Client is not served.'))

// Error handler (Middleware called when throwing in another middleware)
app.use(errorHandler)

const setup = async () => {
  // Connect to the MongoDB database
  await connectDb()

  // Start the server on the configured port
  const server = app.listen(serverPort, () => logger.info(formatLog(`The server was started on http://localhost:${serverPort}`)))

  // Start the WebSocket server on top of the started HTTP server
  startWebSocketServer(server)
}

setup()
