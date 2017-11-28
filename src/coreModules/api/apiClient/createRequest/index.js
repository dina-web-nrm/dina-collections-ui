import validateRequest from '../validateRequest'

export default function createRequest({
  apiConfig,
  endpointConfig,
  methodConfig,
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
    headerFormatter: endpointHeaderFormatter,
    pathFormatter,
    queryFormatter,
  } = endpointConfig

  const { headerFormatter: methodHeaderFormatter } = methodConfig

  return Promise.all([
    Promise.resolve(
      bodyFormatter ? bodyFormatter(userInputBody) : userInputBody
    ),
    Promise.resolve(
      apiHeaderFormatter
        ? apiHeaderFormatter(userInputHeaders)
        : userInputHeaders
    )
      .then(headers => {
        return endpointHeaderFormatter
          ? endpointHeaderFormatter(headers)
          : headers
      })
      .then(headers => {
        return methodHeaderFormatter ? methodHeaderFormatter(headers) : headers
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
