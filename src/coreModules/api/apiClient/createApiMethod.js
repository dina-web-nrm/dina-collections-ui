import intercept from './intercept'
import postProcess from './postProcess'
import preProcess from './preProcess'
import wrappedFetch from './fetch'
import handleError from './error'

import createEndpointConfig from './factories/createEndpointConfig'
import createMethodConfig from './factories/createMethodConfig'
import createRequestData from './factories/createRequestData'

export default function createApiMethod(apiConfig, methodConfigInput) {
  const methodConfig = createMethodConfig(methodConfigInput, apiConfig)

  return function apiMethod(endpointConfigInput, userInput = {}) {
    const endpointConfig = createEndpointConfig(endpointConfigInput, apiConfig)
    const requestData = createRequestData(userInput, apiConfig)

    return intercept({
      apiConfig,
      endpointConfig,
      methodConfig,
      requestData,
    }).then(interceptResult => {
      if (interceptResult) {
        return interceptResult
      }

      return preProcess({
        apiConfig,
        endpointConfig,
        methodConfig,
        requestData,
      })
        .then(processedRequestData => {
          return wrappedFetch({
            apiConfig,
            endpointConfig,
            methodConfig,
            requestData: processedRequestData,
          })
        })
        .then(requestResult => {
          return postProcess({
            apiConfig,
            endpointConfig,
            methodConfig,
            requestData,
            requestResult,
          })
        })
        .then(processedRequestResult => {
          return processedRequestResult
        })
        .catch(handleError)
    })
  }
}
