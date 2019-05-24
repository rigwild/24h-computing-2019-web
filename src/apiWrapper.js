import { apiPrefix, serverPort } from '../config'
import { buildURI } from './functions'

const host = '172.16.97.58'

export const API_PREFIX = apiPrefix
export const API_ROUTES = {
  ping: `${API_PREFIX}/`,
  login: `${API_PREFIX}/login`,
  countries: `${API_PREFIX}/countries`,
  register: `${API_PREFIX}/register`,
  profile: id => `${API_PREFIX}/profile${id ? `/${id}` : ''}`,

  // Examples
  example: (queryParam1, queryParam2 = false) => `${API_PREFIX}/example?${new URLSearchParams({ queryParam1, queryParam2 })}`,
  exampleInsertDb: dataToAdd => `${API_PREFIX}/exampleInsertDb/${dataToAdd}`
}

const tokenStorageKey = 'login-token'
const setToken = token => localStorage.setItem(tokenStorageKey, token)
const delToken = () => localStorage.removeItem(tokenStorageKey)
const getToken = () => localStorage.getItem(tokenStorageKey)
export const isLoggedIn = () => !!getToken()

/**
 * Make a call to the API. Extracts the `data` property if call was successful.
 * @param {String} URI The API route
 * @param {Object} options Fetch options object
 * @returns {Promise<Object>} The API's response
 */
export const API_CALL = async (URI, options = {}) => {
  if (!options.headers) options.headers = {}

  // Set JSON Content-Type
  if (!options.headers['Content-Type'])
    options.headers['Content-Type'] = 'application/json'

  // Set login token if available
  const token = getToken()
  if (token) options.headers.authorization = `Bearer ${token}`

  // Do the actual request, extracting the `data` property from the response
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
  const URI = buildURI(host, serverPort, route)

  return API_CALL(URI, { method: 'POST' })
}

/**
 * Logout from the API (It just destroy the JWT locally!!)
 * @returns {void}
 */
export const logout = () => delToken()

/**
 * Login to the API
 * @param {String} username The username of the user
 * @param {String} password The password of the user
 * @returns {Promise<Object>} The login object (some data on the user)
 * @throws Invalid username or password
 */
export const login = async (username, password) => {
  if (isLoggedIn()) throw new Error('You are already logged in.')

  const data = await API_CALL(buildURI(host, serverPort, API_ROUTES.login), {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
  setToken(data.token)
  return data
}

/**
 * Register a new user
 * @param {String} username The username of the new user
 * @param {String} password The password of the new user
 * @returns {Promise<Object>} The username of the new user
 * @throws The username is already taken
 */
export const register = (username, password) => {
  if (isLoggedIn()) throw new Error('You are already logged in.')
  return API_CALL(buildURI(host, serverPort, API_ROUTES.register), {
    method: 'POST',
    body: JSON.stringify({ username, password })
  })
}

/**
 * Get profile data
 * @param {String} id User's id to get profile data from
 * @returns {Promise<Object>} The profile data of the user
 * @throws The user was not found
 */
export const profile = id => {
  if (!isLoggedIn()) throw new Error('You need to be logged in.')
  return API_CALL(buildURI(host, serverPort, API_ROUTES.profile(id)))
}

export const countries = () => {
  return API_CALL(buildURI(host, serverPort, API_ROUTES.countries))
}


export default {
  API_CALL,
  exampleInsertDb,
  login,
  logout,
  register,
  profile,
  countries
}
