import { apiPrefix } from '../config'

export const API_PREFIX = apiPrefix

export const API_ROUTES = {
  ping: `${API_PREFIX}/`,
  example: (queryParam1, queryParam2 = false) => `${API_PREFIX}/example?${new URLSearchParams({ queryParam1, queryParam2 })}`,
  exampleInsertDb: dataToAdd => `${API_PREFIX}/exampleInsertDb/${dataToAdd}`
}

export const API_CALL = async (URI, options = {}) => {
  const { data } = await fetch(URI, options)
    .then(async res => {
      // Add the JSON output to the HTTP response instance
      res.json = await res.json()
      return res
    })
    .then(res => {
      if (!res.ok) throw new Error(`${res.json.message}${res.json.data ? ' ' + res.json.data : ''}`)
      return res.json
    })
  return data
}

export const delay = ms => new Promise(res => setTimeout(res, ms))

// Build an HTTP URI
export const buildURI = (ssl, host, port, route = '') => `${ssl ? 'https' : 'http'}://${host}:${port}${route}`

// Build a WS URI
export const buildWsURI = (ssl, host, port) => `${ssl ? 'wss' : 'ws'}://${host}:${port}`
