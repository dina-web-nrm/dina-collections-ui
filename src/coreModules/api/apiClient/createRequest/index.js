import chainPromises from 'utilities/chainPromises'

const extractMethodsFromConfigs = (configs, key) => {
  return configs.map(config => config[key])
}

export default function createRequest({
  apiConfig,
  endpointConfig,
  methodConfig,
  userInput,
}) {
  const configs = [apiConfig, endpointConfig, methodConfig]

  return Promise.all([
    chainPromises(
      extractMethodsFromConfigs(configs, 'bodyFormatter'),
      userInput.body || {}
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'headerFormatter'),
      userInput.headers || {}
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'pathParamsFormatter'),
      userInput.pathParams || {}
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'queryParamsFormatter'),
      userInput.queryParams || {}
    ),
  ]).then(([body, headers, pathParams, queryParams]) => {
    const request = {
      body,
      headers,
      pathParams,
      queryParams,
    }

    return Promise.all([
      chainPromises(
        extractMethodsFromConfigs(configs, 'bodyValidation'),
        request.body
      ),
      chainPromises(
        extractMethodsFromConfigs(configs, 'headerValidation'),
        request.headers
      ),
      chainPromises(
        extractMethodsFromConfigs(configs, 'pathParamsValidation'),
        request.pathParams
      ),
      chainPromises(
        extractMethodsFromConfigs(configs, 'queryParamsValidation'),
        request.queryParams
      ),
    ]).then(() => {
      return request
    })
  })
}
