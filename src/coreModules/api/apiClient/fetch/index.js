import createFormBody from './createFormBody'
import createJsonBody from './createJsonBody'
import createUrl from './createUrl'
import parseResponse from './parseResponse'

export default function wrappedFetch({
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
