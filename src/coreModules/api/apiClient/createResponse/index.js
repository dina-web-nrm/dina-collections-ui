const chainPromises = require('../../../../utilities/chainPromises')

const extractMethodsFromConfigs = (configs, key) => {
  return configs.map(config => config[key])
}

module.exports = function createResponse({
  apiConfig,
  endpointConfig,
  methodConfig,
  responseData,
}) {
  const configs = [apiConfig, endpointConfig, methodConfig]

  return Promise.all([
    chainPromises(
      extractMethodsFromConfigs(configs, 'validateResponse'),
      responseData
    ),
  ]).then(() => {
    return Promise.all([
      chainPromises(
        extractMethodsFromConfigs(configs, 'mapResponse'),
        responseData || {}
      ),
    ]).then(([response]) => {
      return response
    })
  })
}
