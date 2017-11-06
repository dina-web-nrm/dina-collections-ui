export default function intercept({
  apiConfig,
  endpointConfig,
  methodConfig,
  requestData,
}) {
  return Promise.resolve().then(() => {
    const { mock: apiMock, cache, enableEndpointMocks } = apiConfig
    const { mock: endpointMock } = endpointConfig

    if (apiMock) {
      const mockResult = apiMock({
        apiConfig,
        endpointConfig,
        methodConfig,
        requestData,
      })
      if (mockResult) {
        return mockResult
      }
    }

    if (enableEndpointMocks && endpointMock) {
      const mockResult = endpointMock({
        apiConfig,
        endpointConfig,
        methodConfig,
        requestData,
      })
      if (mockResult) {
        return mockResult
      }
    }

    if (cache) {
      return null
    }

    return null
  })
}
