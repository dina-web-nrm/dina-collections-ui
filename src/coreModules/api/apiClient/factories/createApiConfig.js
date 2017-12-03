const apiConfigSchema = {
  additionalProperties: false,
  properties: {
    baseUrl: {
      type: 'string',
    },
    cache: {
      type: 'object',
    },
    debug: {
      type: 'boolean',
    },
    enableEndpointMocks: {
      type: 'boolean',
    },
    mapHeaders: {
      not: {
        type: 'string',
      },
    },
    mapResponse: {
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

module.exports = function createApiConfig(apiConfigInput = {}) {
  const { systemValidate } = apiConfigInput

  const error =
    systemValidate && systemValidate(apiConfigInput, apiConfigSchema)
  if (error) {
    throw error
  }
  return apiConfigInput
}
