import createHeaders from './createHeaders'
import createBody from './createBody'

export default function preProcess({
  apiConfig,
  endpointConfig,
  requestData,
  methodConfig,
}) {
  const body = createBody({
    apiConfig,
    endpointConfig,
    methodConfig,
    requestData,
  })
  const headers = createHeaders({
    apiConfig,
    endpointConfig,
    methodConfig,
    requestData,
  })

  return Promise.resolve({
    ...requestData,
    body,
    headers,
  })
}
