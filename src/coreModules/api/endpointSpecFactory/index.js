import openApiSpec from 'dina-schema/build/openApi.json'
import { createSystemModelSchemaValidator } from 'utilities/error'
import createMockGenerator from 'utilities/jsonSchema/createMockGenerator'

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

const getModelNameFromSchema = schema => {
  if (!schema) {
    return null
  }

  if (!schema.$ref) {
    return null
  }

  const segments = schema.$ref.split('/')

  return segments[segments.length - 1]
}

const getSchemaFromResponse = response => {
  return (
    response &&
    response.content &&
    response.content['application/json'] &&
    response.content['application/json'].schema
  )
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
    const modelName = getModelNameFromSchema(bodyParameter.schema)
    return createSystemModelSchemaValidator({
      model: modelName,
      throwOnError: true,
    })
  }

  return null
}

const getResponseValidator = ({ methodSpecification }) => {
  const schema = getSchemaFromResponse(methodSpecification.responses[200])
  if (schema) {
    const modelName = getModelNameFromSchema(schema)
    if (modelName) {
      return createSystemModelSchemaValidator({
        dataPath: 'json',
        model: modelName,
        throwOnError: true,
      })
    }
    return createSystemModelSchemaValidator({
      dataPath: 'json',
      schema,
      throwOnError: true,
    })
  }

  return null
}

const createMockData = ({ methodSpecification }) => {
  const schema = getSchemaFromResponse(methodSpecification.responses[200])
  if (schema) {
    const modelName = getModelNameFromSchema(schema)
    if (modelName) {
      return createMockGenerator({
        model: modelName,
      })
    }
    return createMockGenerator({
      schema,
    })
  }

  return null
}

export const buildEndpointSpec = ({ operationId, ...rest }) => {
  if (!map[operationId]) {
    console.warn(`Operation id: ${operationId} unknown`) // eslint-disable-line no-console
  }

  const { methodName, methodSpecification, pathname } = map[operationId] || {}
  return {
    methodName,
    mock: createMockData({
      methodSpecification,
    }),
    operationId,
    pathname,
    validateBody: getBodyValidator({
      methodSpecification,
    }),
    validateResponse: getResponseValidator({
      methodSpecification,
    }),
    ...rest,
  }
}
