export default function createBody({ requestData, endpointConfig }) {
  const { userInput: { body } } = requestData

  const { inputValidation, bodyFormatter } = endpointConfig

  if (body && inputValidation) {
    const error = inputValidation(body)
    if (error) {
      throw error
    }
  }

  return bodyFormatter && body ? bodyFormatter(body) : body
}
