export const user = {
  additionalProperties: false,
  properties: {
    email: {
      faker: 'internet.email',
      type: 'string',
    },
    username: {
      faker: 'name.findName',
      type: 'string',
    },
  },
  required: ['username', 'email'],
}

export const loginRequest = {
  additionalProperties: false,
  properties: {
    password: {
      maxLength: 10,
      minLength: 5,
      type: 'string',
    },
    username: {
      maxLength: 10,
      minLength: 0,
      type: 'string',
    },
  },
  required: ['username', 'password'],
  type: 'object',
}

export const loginResponse = {
  additionalProperties: true,
  properties: {
    access_token: {
      type: 'string',
    },
  },
  required: ['access_token'],
}
