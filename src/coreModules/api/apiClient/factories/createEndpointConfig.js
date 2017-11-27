export const endpointConfigSchema = {
  additionalProperties: false,
  properties: {
    bodyFormatter: {
      not: {
        type: 'string',
      },
    },
    bodyValidation: {
      not: {
        type: 'string',
      },
    },
    headerFormatter: {
      not: {
        type: 'string',
      },
    },
    key: {
      type: 'string',
    },
    mock: {
      not: {
        type: 'string',
      },
    },
    pathname: {
      type: 'string',
    },
    responseParser: {
      not: {
        type: 'string',
      },
    },
    responseValidation: {
      not: {
        type: 'string',
      },
    },
  },
  required: ['key'],
}

export default function createEndpointConfig(
  endpointConfigInput,
  apiConfigInput
) {
  const { systemValidate } = apiConfigInput
  const error =
    systemValidate && systemValidate(endpointConfigInput, endpointConfigSchema)
  if (error) {
    throw error
  }
  return endpointConfigInput
}
