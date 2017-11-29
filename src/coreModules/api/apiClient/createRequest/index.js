import validateRequest from '../validateRequest'

export default function createRequest({
  apiConfig,
  endpointConfig,
  userInput,
}) {
  const {
    body: userInputBody = {},
    headers: userInputHeaders = {},
    pathParams: userInputPathParams = {},
    queryParams: userInputQueryParams = {},
  } = userInput
  const { headerFormatter: apiHeaderFormatter } = apiConfig

  const {
    bodyFormatter,
    headerFormatter,
    pathFormatter,
    queryFormatter,
  } = endpointConfig

  return Promise.all([
    Promise.resolve(
      bodyFormatter ? bodyFormatter(userInputBody) : userInputBody
    ),
    Promise.resolve(
      headerFormatter ? headerFormatter(userInputHeaders) : userInputHeaders
    ).then(headers => {
      return apiHeaderFormatter ? apiHeaderFormatter(headers) : headers
    }),
    Promise.resolve(
      pathFormatter ? pathFormatter(userInputPathParams) : userInputPathParams
    ),
    Promise.resolve(
      queryFormatter
        ? queryFormatter(userInputQueryParams)
        : userInputQueryParams
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
