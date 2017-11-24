export default function createBody({ requestData, endpointConfig }) {
  const { userInput: { body } } = requestData

  const { inputBodyValidation, bodyFormatter } = endpointConfig

  if (body && inputBodyValidation) {
    const error = inputBodyValidation(body)
    if (error) {
      throw error
    }
  }

  return bodyFormatter && body ? bodyFormatter(body) : body
}
