import openApiSpec from 'dina-schema/build/openApi.json'
import { createSystemModelSchemaValidator } from 'coreModules/error/utilities'

const createBodyValidator = require('./createBodyValidator')

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
    console.warn(`Operation id: ${operationId} unknown`) // eslint-disable-line no-console
  }

  const { methodSpecification, pathname } = map[operationId] || {}

  return {
    operationId,
    pathname,
    validateBody: createBodyValidator({
      createSystemModelSchemaValidator,
      methodSpecification,
    }),
    ...rest,
  }
}
