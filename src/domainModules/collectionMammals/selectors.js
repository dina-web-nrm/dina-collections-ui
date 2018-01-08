export const getLocalState = state => {
  return state.collectionMammals
}

export const getFeatureTypeNameSearchQueries = state => {
  return state.featureTypeNameSearchQueries
}

export const getFeatureTypeNameSearchQuery = (state, inputName) => {
  const individualGroups = getFeatureTypeNameSearchQueries(state)
  return individualGroups[inputName]
}

export const getLookupResult = state => {
  return state.lookup.result
}

export const getLookupSearch = state => {
  return state.lookup.search
}

export const getIndividualGroups = state => {
  return state.individualGroups
}

export const getIndividualGroupByCatalogNumber = (state, catalogNumber) => {
  const individualGroups = getIndividualGroups(state)
  return individualGroups[catalogNumber]
}
