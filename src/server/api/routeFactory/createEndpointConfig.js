const createEndpointConfigObject = require('../../../coreModules/api/apiClient/factories/createEndpointConfig')

module.exports = function createEndpointConfig({
  methodSpecification,
  operationId,
  pathname,
  routeHandler,
  routeMock,
  verbName,
}) {
  return createEndpointConfigObject(
    {
      handler: routeHandler,
      mock: routeMock,
      operationId,
      pathname,
      verbName,
    },
    {}
  )
}
