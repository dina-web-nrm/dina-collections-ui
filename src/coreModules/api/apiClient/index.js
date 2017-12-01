import createApiConfig from './factories/createApiConfig'
import createApiMethod from './createApiMethod'

export default function createApiClient(options) {
  const apiConfig = createApiConfig(options)
  return {
    formPost: createApiMethod(apiConfig, {
      mapHeaders: userInputHeaders => {
        return {
          ...userInputHeaders,
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      },
      method: 'POST',
    }),

    httpDelete: createApiMethod(apiConfig, {
      method: 'delete',
    }),

    httpGet: createApiMethod(apiConfig, {
      method: 'GET',
    }),

    httpPatch: createApiMethod(apiConfig, {
      mapHeaders: userInputHeaders => {
        return {
          ...userInputHeaders,
          'Content-Type': 'application/json',
        }
      },
      method: 'PATCH',
    }),

    httpPost: createApiMethod(apiConfig, {
      mapHeaders: userInputHeaders => {
        return {
          ...userInputHeaders,
          'Content-Type': 'application/json',
        }
      },
      method: 'POST',
    }),

    httpPut: createApiMethod(apiConfig, {
      mapHeaders: userInputHeaders => {
        return {
          ...userInputHeaders,
          'Content-Type': 'application/json',
        }
      },
      method: 'PUT',
    }),
  }
}
