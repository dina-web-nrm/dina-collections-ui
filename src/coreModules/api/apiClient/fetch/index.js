const createFormBody = require('./createFormBody')
const createJsonBody = require('./createJsonBody')
const createUrl = require('./createUrl')
const parseResponse = require('./parseResponse')

module.exports = function wrappedFetch({
  apiConfig,
  endpointConfig,
  methodConfig,
  request,
}) {
  const { method } = methodConfig
  const { body, headers } = request

  let formattedBody
  if (Object.keys(body).length) {
    if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      formattedBody = createFormBody(body)
    } else {
      formattedBody = createJsonBody(body)
    }
  }

  const url = createUrl({
    apiConfig,
    endpointConfig,
    methodConfig,
    request,
  })
  return fetch(url, {
    body: formattedBody,
    headers,
    method,
  }).then(parseResponse)
}
