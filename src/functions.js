export const delay = ms => new Promise(res => setTimeout(res, ms))

// Build an HTTP URI
export const buildURI = (ssl, host, port, route = '') => `${ssl ? 'https' : 'http'}://${host}:${port}${route}`

// Build a WS URI
export const buildWsURI = (ssl, host, port) => `${ssl ? 'wss' : 'ws'}://${host}:${port}`
