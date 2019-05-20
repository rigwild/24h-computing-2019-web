import { apiPrefix, serverPort } from '../config'
import { buildURI } from './functions'

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


/**
 * Insert a message in the database
 * @param {String} message The message to be inserted
 * @returns {Promise<Object>} The API's response
 */
export const exampleInsertDb = message => {
  const route = API_ROUTES.exampleInsertDb(message)
  const URI = buildURI(false, 'localhost', serverPort, route)

  return API_CALL(URI, { method: 'POST' })
}
