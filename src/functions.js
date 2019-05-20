import { apiPrefix } from '../config'

export const API_PREFIX = apiPrefix

export const API_ROUTES = {
  ping: `${API_PREFIX}/`,
  example: (queryParam1, queryParam2 = false) => `${API_PREFIX}/example?${new URLSearchParams({ queryParam1, queryParam2 })}`,
  exampleInsertDb: dataToAdd => `${API_PREFIX}/exampleInsertDb/${dataToAdd}`
}

export const delay = ms => new Promise(res => setTimeout(res, ms))

// Build an HTTP URI
export const buildURI = (ssl, host, port, route = '') => `${ssl ? 'https' : 'http'}://${host}:${port}${route}`

// Build a WS URI
export const buildWsURI = (ssl, host, port) => `${ssl ? 'wss' : 'ws'}://${host}:${port}`
