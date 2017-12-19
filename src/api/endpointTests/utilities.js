const createApiClient = require('../../coreModules/api/apiClient')
const defaultBuildEndpointSpec = require('../../coreModules/api/endpointSpecFactory/server')

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
    .formPost(
      defaultBuildEndpointSpec({
        mapResponse: json => {
          return {
            accessToken: json.access_token,
          }
        },
        operationId: 'loginUser',
      }),
      {
        body: {
          client_id: 'dina-rest',
          grant_type: 'password',
          password,
          username,
        },
      }
    )
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
    mapResponse: ({ json }) => {
      return json
    },
    validateInput: false,
    validateOutput: false,
  })
}

const createHandleResolveForError = (
  operationId,
  testDescription,
  statusCode
) => {
  return () => {
    throw new Error(
      `${operationId}/${testDescription} resolved, but expected statusCode ${
        statusCode
      }`
    )
  }
}

const createHandleRejectForError = (
  operationId,
  testDescription,
  statusCode
) => apiClient => {
  return error => {
    if (error instanceof Error) {
      throw error
    }

    if (error.status === statusCode) {
      console.log(`Success: ${operationId}/${testDescription}`) // eslint-disable-line no-console
      return apiClient
    }

    throw new Error(
      `${operationId}/${testDescription} expected status ${
        statusCode
      }, but got ${error ? JSON.stringify(error, null, 2) : error}`
    )
  }
}

const createHandleResolveForSuccess = (
  operationId,
  testDescription
) => collectionsClient => {
  return () => {
    console.log(`Success: ${operationId}/${testDescription}`) // eslint-disable-line no-console
    return collectionsClient
  }
}

const createHandleRejectForSuccess = (operationId, testDescription) => {
  return error => {
    throw new Error(
      `${operationId}/${testDescription}: ${
        error ? JSON.stringify(error, null, 2) : error
      }`
    )
  }
}

const createErrorRequestTestFactory = operationId => {
  return function createErrorRequestTest(
    testDescription,
    { pathParams, queryParams, statusCode, body = {} }
  ) {
    const handleResolve = createHandleResolveForError(
      operationId,
      testDescription,
      statusCode
    )
    const handleReject = createHandleRejectForError(
      operationId,
      testDescription,
      statusCode
    )

    return function requestErrorTest(
      collectionsClient,
      buildEndpointSpec = defaultBuildEndpointSpec
    ) {
      return collectionsClient
        .call(
          buildEndpointSpec({
            operationId,
          }),
          { body, pathParams, queryParams }
        )
        .then(handleResolve)
        .catch(handleReject(collectionsClient))
    }
  }
}

const createSuccessRequestTestFactory = operationId => {
  return function createSuccessRequestTest(
    testDescription,
    { body, pathParams, queryParams }
  ) {
    const handleResolve = createHandleResolveForSuccess(
      operationId,
      testDescription
    )
    const handleReject = createHandleRejectForSuccess(
      operationId,
      testDescription
    )

    return function requestSuccessTest(
      collectionsClient,
      buildEndpointSpec = defaultBuildEndpointSpec
    ) {
      return collectionsClient
        .call(
          buildEndpointSpec({
            operationId,
          }),
          { body, pathParams, queryParams }
        )
        .then(handleResolve(collectionsClient))
        .catch(handleReject)
    }
  }
}

module.exports = {
  createAuthClient,
  createCollectionsClient,
  createErrorRequestTestFactory,
  createSuccessRequestTestFactory,
  login,
}
