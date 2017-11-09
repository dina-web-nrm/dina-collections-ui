import { createSystemSchemaValidator } from 'coreModules/error/utilities'
import createMockDataFromSchema from 'utilities/createMockDataFromSchema'
import { user, loginRequest, loginResponse } from './schemas'

export const LOG_IN = {
  bodyFormatter: inputBody => {
    return {
      ...inputBody,
      client_id: 'dina-rest',
      grant_type: 'password',
    }
  },
  inputValidation: createSystemSchemaValidator(loginRequest),
  key: 'LOG_IN',
  mock: () => createMockDataFromSchema(loginResponse),
  outputValidation: createSystemSchemaValidator(loginResponse),
  resultParser: result => {
    return {
      accessToken: result.access_token,
    }
  },
}

export const GET_USER = {
  key: 'GET_USER',
  mock: () => createMockDataFromSchema(user),
  outputValidation: createSystemSchemaValidator(user),
  resultParser: result => {
    return {
      email: result.email,
      username: result.preferred_username,
    }
  },
}
