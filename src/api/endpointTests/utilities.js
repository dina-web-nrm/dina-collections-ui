import createApiClient from 'coreModules/api/apiClient'
import * as userEndpoints from 'coreModules/user/endpoints'

require('isomorphic-fetch')

const {
  REACT_APP_TEST_API_URL: defaultApiUrl,
  REACT_APP_TEST_AUTH_URL: defaultAuthUrl,
  REACT_APP_TEST_PASSWORD: defaultPassword,
  REACT_APP_TEST_USERNAME: defaultUsername,
} = process.env

export const createAuthClient = ({ baseUrl = defaultAuthUrl } = {}) => {
  return createApiClient({
    baseUrl,
    mapResponse: ({ json }) => json,
  })
}

export const login = (
  { password = defaultPassword, username = defaultUsername } = {}
) => {
  const authClient = createAuthClient()
  return authClient
    .formPost(userEndpoints.LOG_IN, {
      body: {
        client_id: 'dina-rest',
        grant_type: 'password',
        password,
        username,
      },
    })
    .then(result => {
      return result.accessToken
    })
}

export const createCollectionsClient = (
  { authToken, baseUrl = defaultApiUrl } = {}
) => {
  return createApiClient({
    baseUrl,
    mapHeaders: headers => {
      return {
        ...headers,
        Authorization: `bearer ${authToken}`,
      }
    },
    mapResponse: ({ json }) => json,
  })
}
