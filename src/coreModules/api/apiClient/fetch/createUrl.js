import interpolateUrl from './interpolateUrl'
import createQueryString from './createQueryString'

export default function createUrl({ endpointConfig, request }) {
  const { queryParams, pathParams } = request

  const url = interpolateUrl(endpointConfig.pathname, pathParams)

  return queryParams ? `${url}?${createQueryString(queryParams)}` : url
}
