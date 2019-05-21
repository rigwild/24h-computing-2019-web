'use strict'

import mongoose from 'mongoose'
import { mongoDatabaseURI, TEST_MODE } from '../../config'
import { dbLogger } from '../winston.config'
import { formatLog, formatError } from '../functions'

const connectDb = async () => {
  await mongoose.connect(mongoDatabaseURI, { useNewUrlParser: true, useFindAndModify: false })
  mongoose.connection.on('error', err => dbLogger.error(formatError(err)))

  if (!TEST_MODE) dbLogger.info(formatLog('The database connection was established.'))

  return mongoose.connection
}

export default connectDb
