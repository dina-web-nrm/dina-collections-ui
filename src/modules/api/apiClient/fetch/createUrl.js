import interpolateUrl from './interpolateUrl'
import createQueryString from './createQueryString'

export default function createUrl({ apiConfig, endpointConfig, requestData }) {
  const { endpointKeyPathnameMap } = apiConfig
  const { key } = endpointConfig

  const { userInput: { queryParams, pathParams } } = requestData

  const url = interpolateUrl(endpointKeyPathnameMap[key], pathParams)

  return queryParams ? `${url}?${createQueryString(queryParams)}` : url
}
