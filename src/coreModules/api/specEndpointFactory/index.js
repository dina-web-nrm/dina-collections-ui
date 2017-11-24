import openApi from 'dina-schema/build/openApi.json'

const buildOperationIdPathnameMap = openApiSpec => {
  const map = {}
  Object.keys(openApiSpec.paths).forEach(pathname => {
    const verbs = openApiSpec.paths[pathname]
    Object.keys(verbs).forEach(verbName => {
      const verb = verbs[verbName]
      if (verb.operationId)
        map[verb.operationId] = {
          pathname,
          verbName,
        }
    })
  })
  return map
}

const map = buildOperationIdPathnameMap(openApi)

export const buildEndpointSpec = ({ operationId, ...rest }) => {
  if (!map[operationId]) {
    throw new Error(`Operation id: ${operationId} unknown`)
  }
  const { pathname } = map[operationId]

  return {
    key: operationId,
    pathname,
    ...rest,
  }
}

export { openApi }
