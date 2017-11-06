export const getLocalState = state => {
  return state.api
}

export const getEndpoints = state => {
  return state.endpoints
}

export const getEndpointByKey = (state, key) => {
  const endpoints = getEndpoints(state)
  return (endpoints && endpoints[key]) || null
}
