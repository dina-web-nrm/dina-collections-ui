export default function createPathParams({ requestData, endpointConfig }) {
  const { userInput: { pathParams } } = requestData

  const { inputPathParamsValidation, pathFormatter } = endpointConfig

  if (pathParams && inputPathParamsValidation) {
    const error = inputPathParamsValidation(pathParams)
    if (error) {
      throw error
    }
  }

  return pathFormatter && pathParams ? pathFormatter(pathParams) : pathParams
}
