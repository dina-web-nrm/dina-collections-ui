export default function createHeaders({
  apiConfig,
  methodConfig,
  requestData,
}) {
  const { requestContentType } = methodConfig

  const { userInput: { headers: userHeaders = {} } } = requestData

  let contentHeaders = {}
  if (requestContentType === 'form') {
    contentHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }

  const authHeaders = apiConfig.buildAuthHeaders
    ? apiConfig.buildAuthHeaders({ requestData })
    : {}

  return {
    ...contentHeaders,
    ...userHeaders,
    ...authHeaders,
  }
}
