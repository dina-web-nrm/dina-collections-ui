import chainPromises from 'utilities/chainPromises'
import validateRequest from '../validateRequest'

const extractFormattersFromConfigs = (configs, key) => {
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
      extractFormattersFromConfigs(configs, 'bodyFormatter'),
      userInput.body || {}
    ),
    chainPromises(
      extractFormattersFromConfigs(configs, 'headerFormatter'),
      userInput.headers || {}
    ),
    chainPromises(
      extractFormattersFromConfigs(configs, 'pathParamsFormatter'),
      userInput.pathParams || {}
    ),
    chainPromises(
      extractFormattersFromConfigs(configs, 'queryParamsFormatter'),
      userInput.queryParams || {}
    ),
  ]).then(([body, headers, pathParams, queryParams]) => {
    const request = {
      body,
      headers,
      pathParams,
      queryParams,
    }

    return validateRequest({ endpointConfig, request }).then(() => {
      return request
    })
  })
}
