export default function validateResponse({ endpointConfig, response }) {
  const { responseValidation } = endpointConfig

  return Promise.resolve(
    responseValidation ? responseValidation(response) : response
  )
}
