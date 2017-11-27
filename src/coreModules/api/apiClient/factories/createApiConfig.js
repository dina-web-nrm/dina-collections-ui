export const apiConfigSchema = {
  additionalProperties: false,
  properties: {
    cache: {
      type: 'object',
    },
    debug: {
      type: 'boolean',
    },
    enableEndpointMocks: {
      type: 'boolean',
    },
    headerFormatter: {
      not: {
        type: 'string',
      },
    },
    mock: {
      type: 'object',
    },
    systemValidate: {
      not: {
        type: 'string',
      },
    },
    throwOnValidationErrors: {
      type: 'boolean',
    },
  },
  required: [],
}

export default function createApiConfig(apiConfigInput = {}) {
  const { systemValidate } = apiConfigInput

  const error =
    systemValidate && systemValidate(apiConfigInput, apiConfigSchema)
  if (error) {
    throw error
  }
  return apiConfigInput
}
