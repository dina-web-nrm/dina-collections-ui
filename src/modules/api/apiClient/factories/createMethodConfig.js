export const methodConfigSchema = {
  additionalProperties: false,
  properties: {
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

export default function createMethodConfig(methodConfigInput, apiConfigInput) {
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
