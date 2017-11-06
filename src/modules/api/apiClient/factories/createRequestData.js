export const requestDataSchema = {
  additionalProperties: false,
  properties: {
    body: {
      type: 'object',
    },
    headers: {
      type: 'string',
    },
    pathParams: {
      type: 'object',
    },
    queryParams: {
      type: 'object',
    },
    url: {
      type: 'string',
    },
    userInput: {
      additionalProperties: false,
      properties: {
        body: {
          type: 'object',
        },
        headers: {
          type: 'string',
        },
        pathParams: {
          type: 'object',
        },
        queryParams: {
          type: 'object',
        },
      },
      required: [],
      type: 'object',
    },
  },
  required: ['headers', 'pathParams', 'queryParams', 'url', 'userInput'],
}

export default function createRequestData(userInput, apiConfigInput) {
  const requestData = {
    body: undefined,
    headers: '',
    pathParams: {},
    queryParams: {},
    url: '',
    userInput,
  }
  const { systemValidate } = apiConfigInput

  const error = systemValidate && systemValidate(requestData, requestDataSchema)
  if (error) {
    throw error
  }
  return requestData
}
