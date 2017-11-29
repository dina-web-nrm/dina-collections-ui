import { createSystemSchemaValidator } from 'coreModules/error/utilities'
import createMockDataFromSchema from 'utilities/createMockDataFromSchema'
import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'

import { user, loginResponse } from './schemas'

export const LOG_IN = buildEndpointSpec({
  bodyFormatter: inputBody => {
    return {
      ...inputBody,
      client_id: 'dina-rest',
      grant_type: 'password',
    }
  },
  headerFormatter: userInputHeaders => {
    return {
      ...userInputHeaders,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  },
  mock: () => createMockDataFromSchema(loginResponse),
  operationId: 'loginUser',
  responseParser: result => {
    return {
      accessToken: result.access_token,
    }
  },
  responseValidation: createSystemSchemaValidator(loginResponse),
})

export const GET_USER = buildEndpointSpec({
  mock: () => createMockDataFromSchema(user),
  operationId: 'getUser',
  pathname: '/auth/realms/dina/protocol/openid-connect/userinfo',
  responseParser: result => {
    return {
      email: result.email,
      username: result.preferred_username,
    }
  },
  responseValidation: createSystemSchemaValidator(user),
})
