import intercept from './intercept'
import wrappedFetch from './fetch'
import handleError from './error'

import createEndpointConfig from './factories/createEndpointConfig'
import createMethodConfig from './factories/createMethodConfig'
import createResponse from './createResponse'
import createRequest from './createRequest'

export default function createApiMethod(apiConfig, methodConfigInput) {
  const methodConfig = createMethodConfig(methodConfigInput, apiConfig)

  return function apiMethod(endpointConfigInput, userInput = {}) {
    const endpointConfig = createEndpointConfig(endpointConfigInput, apiConfig)

    return createRequest({
      apiConfig,
      endpointConfig,
      methodConfig,
      userInput,
    })
      .then(request => {
        return intercept({
          apiConfig,
          endpointConfig,
          methodConfig,
          request,
        })
          .then(interceptResult => {
            if (interceptResult) {
              return interceptResult
            }
            return wrappedFetch({
              apiConfig,
              endpointConfig,
              methodConfig,
              request,
            })
          })
          .then(responseData => {
            return createResponse({
              endpointConfig,
              responseData,
            })
          })
      })
      .catch(handleError)
  }
}
