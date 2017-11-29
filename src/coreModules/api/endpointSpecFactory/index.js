import openApiSpec from 'dina-schema/build/openApi.json'

const buildOperationIdPathnameMap = () => {
  const map = {}
  Object.keys(openApiSpec.paths).forEach(pathname => {
    const methods = openApiSpec.paths[pathname]
    Object.keys(methods).forEach(methodName => {
      const methodSpecification = methods[methodName]
      if (methodSpecification.operationId)
        map[methodSpecification.operationId] = {
          methodName,
          methodSpecification,
          pathname,
        }
    })
  })

  return map
}

const map = buildOperationIdPathnameMap()

export const buildEndpointSpec = ({ operationId, ...rest }) => {
  if (!map[operationId]) {
    throw new Error(`Operation id: ${operationId} unknown`)
  }
  const { pathname } = map[operationId]

  return {
    key: operationId,
    pathname,
    ...rest,
  }
}
