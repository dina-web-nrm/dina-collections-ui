import interpolateUrl from './interpolateUrl'
import createQueryString from './createQueryString'

export default function createUrl({ endpointConfig, requestData }) {
  const { userInput: { queryParams, pathParams } } = requestData

  const url = interpolateUrl(endpointConfig.pathname, pathParams)

  return queryParams ? `${url}?${createQueryString(queryParams)}` : url
}
