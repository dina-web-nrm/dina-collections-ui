export default function createQueryParams({ requestData, endpointConfig }) {
  const { userInput: { queryParams } } = requestData

  const { inputQueryParamsValidation, queryFormatter } = endpointConfig

  if (queryParams && inputQueryParamsValidation) {
    const error = inputQueryParamsValidation(queryParams)
    if (error) {
      throw error
    }
  }

  return queryFormatter && queryParams
    ? queryFormatter(queryParams)
    : queryParams
}
