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
      extractMethodsFromConfigs(configs, 'mapBody'),
      userInput.body || {}
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'mapHeaders'),
      userInput.headers || {}
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'mapPathParams'),
      userInput.pathParams || {}
    ),
    chainPromises(
      extractMethodsFromConfigs(configs, 'mapQueryParams'),
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
        extractMethodsFromConfigs(configs, 'validateBody'),
        request.body
      ),
      chainPromises(
        extractMethodsFromConfigs(configs, 'validateHeaders'),
        request.headers
      ),
      chainPromises(
        extractMethodsFromConfigs(configs, 'validatePathParams'),
        request.pathParams
      ),
      chainPromises(
        extractMethodsFromConfigs(configs, 'validateQueryParams'),
        request.queryParams
      ),
    ]).then(() => {
      return request
    })
  })
}
