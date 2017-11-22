import createBody from './createBody'
import createHeaders from './createHeaders'
import createPathParams from './createPathParams'
import createQueryParams from './createQueryParams'

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

  const pathParams = createPathParams({
    apiConfig,
    endpointConfig,
    methodConfig,
    requestData,
  })

  const queryParams = createQueryParams({
    apiConfig,
    endpointConfig,
    methodConfig,
    requestData,
  })

  return Promise.resolve({
    ...requestData,
    body,
    headers,
    pathParams,
    queryParams,
  })
}
