import createApiConfig from './factories/createApiConfig'
import createApiMethod from './createApiMethod'

export default function createApiClient(options) {
  const apiConfig = createApiConfig(options)
  return {
    formPost: createApiMethod(apiConfig, {
      method: 'POST',
      requestContentType: 'form',
    }),

    httpDelete: createApiMethod(apiConfig, {
      method: 'delete',
    }),

    httpGet: createApiMethod(apiConfig, {
      method: 'GET',
    }),

    httpPatch: createApiMethod(apiConfig, {
      method: 'PATCH',
    }),

    httpPost: createApiMethod(apiConfig, {
      method: 'POST',
    }),

    httpPut: createApiMethod(apiConfig, {
      method: 'PUT',
    }),
  }
}
