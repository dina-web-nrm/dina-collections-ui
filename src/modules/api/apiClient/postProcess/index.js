export default function postProcess({
  endpointConfig,
  // requestData,
  // methodConfig,
  requestResult,
}) {
  // implement cache set
  const { outputValidation, resultParser } = endpointConfig

  const parsedResult = resultParser
    ? resultParser(requestResult)
    : requestResult

  if (outputValidation) {
    const error = outputValidation(parsedResult)
    if (error) {
      throw error
    }
  }

  return parsedResult
}
