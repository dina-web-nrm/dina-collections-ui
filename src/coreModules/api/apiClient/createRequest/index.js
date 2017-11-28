import validateRequest from '../validateRequest'

const formatInput = (input, formatter) => {
  return formatter ? formatter(input) : input
}

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
    Promise.resolve(formatInput(userInputBody, bodyFormatter)),
    Promise.resolve(
      headerFormatters.reduce((sequence, headerFormatter) => {
        return sequence.then(headers => {
          return Promise.resolve(formatInput(headers, headerFormatter))
        })
      }, Promise.resolve(userInputHeaders))
    ),
    Promise.resolve(formatInput(userInputPathParams, pathFormatter)),
    Promise.resolve(formatInput(userInputQueryParams, queryFormatter)),
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
