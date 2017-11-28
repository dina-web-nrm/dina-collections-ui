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

  const headerFormatters = [
    apiHeaderFormatter,
    endpointHeaderFormatter,
    methodHeaderFormatter,
  ]

  return Promise.all([
    Promise.resolve(
      bodyFormatter ? bodyFormatter(userInputBody) : userInputBody
    ),
    Promise.resolve(
      headerFormatters.reduce((sequence, formatter) => {
        return sequence.then(headers => {
          return Promise.resolve(formatter ? formatter(headers) : headers)
        })
      }, Promise.resolve(userInputHeaders))
    ),
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
