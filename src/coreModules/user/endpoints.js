import { createSystemSchemaValidator } from 'coreModules/error/utilities'
import createMockDataFromSchema from 'utilities/createMockDataFromSchema'
import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'

import { user, loginResponse } from './schemas'

export const LOG_IN = buildEndpointSpec({
  mapResponse: json => {
    return {
      accessToken: json.access_token,
    }
  },
  mock: () => createMockDataFromSchema(loginResponse),
  operationId: 'loginUser',
  validateResponse: createSystemSchemaValidator(loginResponse),
})

export const GET_USER = buildEndpointSpec({
  mapResponse: json => {
    return {
      email: json.email,
      username: json.preferred_username,
    }
  },
  mock: () => createMockDataFromSchema(user),
  operationId: 'getUser',
  pathname: '/auth/realms/dina/protocol/openid-connect/userinfo',
  validateResponse: createSystemSchemaValidator(user),
})
