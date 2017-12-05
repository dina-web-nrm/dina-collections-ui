const createApiConfig = require('./factories/createApiConfig')
const createApiMethod = require('./createApiMethod')

module.exports = function createApiClient(options) {
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
