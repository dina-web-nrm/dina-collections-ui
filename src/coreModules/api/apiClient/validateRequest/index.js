export default function validateRequest({ endpointConfig, request }) {
  const { body, headers, pathParams, queryParams } = request

  const {
    bodyValidation,
    headerValidation,
    pathParamsValidation,
    queryParamsValidation,
  } = endpointConfig

  return Promise.all([
    Promise.resolve(bodyValidation ? bodyValidation(body) : body),
    Promise.resolve(headerValidation ? headerValidation(headers) : headers),
    Promise.resolve(
      pathParamsValidation ? pathParamsValidation(pathParams) : pathParams
    ),
    Promise.resolve(
      queryParamsValidation ? queryParamsValidation(queryParams) : queryParams
    ),
  ])
}
