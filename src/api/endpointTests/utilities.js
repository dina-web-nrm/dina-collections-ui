const createApiClient = require('../../coreModules/api/apiClient')
const {
  buildEndpointSpec: defaultBuildEndpointSpec,
} = require('../../coreModules/api/endpointSpecFactory')

require('isomorphic-fetch')

const {
  REACT_APP_TEST_API_URL: defaultApiUrl,
  REACT_APP_TEST_AUTH_URL: defaultAuthUrl,
  REACT_APP_TEST_PASSWORD: defaultPassword,
  REACT_APP_TEST_USERNAME: defaultUsername,
} = process.env

const createAuthClient = ({ baseUrl = defaultAuthUrl } = {}) => {
  return createApiClient({
    baseUrl,
    mapResponse: ({ json }) => json,
  })
}

const login = (
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

const createCollectionsClient = (
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
module.exports = {
  createAuthClient,
  createCollectionsClient,
  login,
}
