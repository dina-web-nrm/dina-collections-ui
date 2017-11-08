export const endpointConfigSchema = {
  additionalProperties: false,
  properties: {
    bodyFormatter: {
      not: {
        type: 'string',
      },
    },
    inputValidation: {
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
    outputValidation: {
      not: {
        type: 'string',
      },
    },
    resultParser: {
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
