import openApiSpec from 'dina-schema/build/openApi.json'

import { createSystemModelSchemaValidator } from 'coreModules/error/utilities'

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

const getModelNameFromParameter = ({ schema }) => {
  if (!schema) {
    return null
  }

  const segments = schema.$ref.split('/')

  return segments[segments.length - 1]
}

const getBodyValidator = ({ methodSpecification }) => {
  const { parameters } = methodSpecification

  if (!parameters) {
    return null
  }

  const bodyParameter = parameters.find(parameterSpecification => {
    return parameterSpecification.in === 'body'
  })

  if (bodyParameter) {
    const modelName = getModelNameFromParameter(bodyParameter)
    return createSystemModelSchemaValidator({
      model: modelName,
      throwOnError: true,
    })
  }

  return null
}

export const buildEndpointSpec = ({ operationId, ...rest }) => {
  if (!map[operationId]) {
    throw new Error(`Operation id: ${operationId} unknown`)
  }
  const { methodName, methodSpecification, pathname } = map[operationId]

  return {
    operationId,
    pathname,
    validateBody: getBodyValidator({
      methodName,
      methodSpecification,
      pathname,
    }),
    ...rest,
  }
}
