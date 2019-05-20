'use strict'

export const PRODUCTION_MODE = process.env.NODE_ENV === 'production'
export const TEST_MODE = process.env.NODE_ENV === 'test'

// The url prefix for the API
export const apiPrefix = '/api'

// The port used by the server
export const serverPort = parseInt(process.env.PORT, 10) || 5000

// MongoDB database connection URI
export const mongoDatabaseURI = process.env.MONGO_URI || 'mongodb://localhost:27017/myappdb'

// Should the server serve client files from the `/dist` directory
export const serveClient = process.env.SERVE_CLIENT === 'true' || true
