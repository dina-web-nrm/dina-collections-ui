import interpolateUrl from './interpolateUrl'
import createQueryString from './createQueryString'

export default function createUrl({ apiConfig, endpointConfig, request }) {
  const { baseUrl: apiBaseUrl } = apiConfig
  const { baseUrl: endpointBaseUrl } = endpointConfig

  const baseUrl = endpointBaseUrl || apiBaseUrl

  const { queryParams, pathParams } = request

  const pathname = interpolateUrl(endpointConfig.pathname, pathParams)
  const url = queryParams
    ? `${pathname}?${createQueryString(queryParams)}`
    : pathname

  return baseUrl ? `${baseUrl}${url}` : url
}
