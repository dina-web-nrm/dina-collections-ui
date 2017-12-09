import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'

export const LOG_IN = buildEndpointSpec({
  mapResponse: json => {
    return {
      accessToken: json.access_token,
    }
  },
  operationId: 'loginUser',
})

export const GET_USER = buildEndpointSpec({
  mapResponse: json => {
    return {
      email: json.email,
      username: json.preferred_username,
    }
  },
  operationId: 'getUser',
  pathname: '/auth/realms/dina/protocol/openid-connect/userinfo',
})
