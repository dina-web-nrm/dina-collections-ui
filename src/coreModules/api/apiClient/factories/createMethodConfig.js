const methodConfigSchema = {
  additionalProperties: false,
  properties: {
    mapHeaders: {
      not: {
        type: 'string',
      },
    },
    method: {
      type: 'string',
    },
    requestContentType: {
      type: 'string',
    },
    responseContentType: {
      type: 'string',
    },
  },
  required: ['method', 'requestContentType', 'responseContentType'],
}

module.exports = function createMethodConfig(
  methodConfigInput,
  apiConfigInput
) {
  const methodConfig = {
    requestContentType: 'json',
    responseContentType: 'json',
    ...methodConfigInput,
  }

  const { systemValidate } = apiConfigInput

  const error =
    systemValidate && systemValidate(methodConfig, methodConfigSchema)
  if (error) {
    throw error
  }
  return methodConfig
}
