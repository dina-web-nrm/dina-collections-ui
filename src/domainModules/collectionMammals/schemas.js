export const mammal = {
  additionalProperties: false,
  properties: {
    catalogNumber: { type: 'string' },
    collectingDate: { type: 'string' },
    collectors: { type: 'string' },
    description: { type: 'string' },
    determination: { type: 'string' },
    locality: { type: 'string' },
    normalStorageLocation: { type: 'string' },
    sex: { type: 'string' },
    taxonName: { type: 'string' },
  },
  required: [],
}

export const lookupMammalsRequest = {
  additionalProperties: false,
  properties: {},
  required: [],
  type: 'object',
}

export const lookupMammalsResponse = {
  additionalProperties: false,
  properties: {
    error: { type: 'object' },
    result: {
      items: [
        {
          ...mammal,
        },
      ],
      type: 'array',
      uniqueItems: true,
    },
  },
  required: ['result'],
}

export const registerMammalRequest = {
  additionalProperties: false,
  properties: {
    catalogNumber: {
      maxLength: 8,
      minLength: 6,
      type: 'string',
    },
    collectingDate: { type: 'string' },
    collectors: { type: 'string' },
    description: { type: 'string' },
    determination: { type: 'string' },
    locality: { type: 'string' },
    normalStorageLocation: { type: 'string' },
    sex: { type: 'string' },
  },
  required: ['catalogNumber'],
  type: 'object',
}

export const registerMammalResponse = {
  additionalProperties: true,
  properties: {},
  required: [],
}
