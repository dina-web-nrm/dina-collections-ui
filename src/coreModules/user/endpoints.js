import { createSystemSchemaValidator } from 'coreModules/error/utilities'
import createMockDataFromSchema from 'utilities/createMockDataFromSchema'
import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'

import { user, loginRequest, loginResponse } from './schemas'

export const LOG_IN = buildEndpointSpec({
  bodyFormatter: inputBody => {
    return {
      ...inputBody,
      client_id: 'dina-rest',
      grant_type: 'password',
    }
  },
  inputBodyValidation: createSystemSchemaValidator(loginRequest),
  mock: () => createMockDataFromSchema(loginResponse),
  operationId: 'loginUser',
  outputValidation: createSystemSchemaValidator(loginResponse),
  resultParser: result => {
    return {
      accessToken: result.access_token,
    }
  },
})

export const GET_USER = buildEndpointSpec({
  mock: () => createMockDataFromSchema(user),
  operationId: 'getUser',
  outputValidation: createSystemSchemaValidator(user),
  pathname: '/auth/realms/dina/protocol/openid-connect/userinfo',
  resultParser: result => {
    return {
      email: result.email,
      username: result.preferred_username,
    }
  },
})
