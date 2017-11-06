import checkStatus from './checkStatus'
import createFormBody from './createFormBody'
import createJsonBody from './createJsonBody'
import createUrl from './createUrl'
import parseJSON from './parseJSON'

export default function wrappedFetch({
  apiConfig,
  endpointConfig,
  methodConfig,
  requestData,
}) {
  const { requestContentType, method } = methodConfig
  const { body, headers } = requestData

  let formattedBody
  if (requestContentType === 'json') {
    formattedBody = createJsonBody(body)
  } else if (requestContentType === 'form') {
    formattedBody = createFormBody(body)
  }

  const url = createUrl({
    apiConfig,
    endpointConfig,
    methodConfig,
    requestData,
  })
  return fetch(url, {
    body: formattedBody,
    headers,
    method,
  })
    .then(parseJSON)
    .then(checkStatus)
}
