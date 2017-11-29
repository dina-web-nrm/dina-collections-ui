import validateResponse from '../validateResponse'

export default function createResponse({ endpointConfig, responseData }) {
  const { responseParser } = endpointConfig

  return Promise.resolve(
    responseParser ? responseParser(responseData) : responseData
  ).then(response => {
    return validateResponse({ endpointConfig, response }).then(() => {
      return response
    })
  })
}
