import buildEndpointSpec from 'coreModules/api/endpointSpecFactory/client'
import { createLookupMammalsResponse, getIndividualGroup } from './mockData'

const extractData = result => result.data
const flattenDataAttributes = data => {
  if (!data) {
    return data
  }

  if (Array.isArray(data)) {
    return data.map(dataItem => flattenDataAttributes(dataItem))
  }

  const { attributes, id, type } = data

  return {
    id,
    type,
    ...attributes,
  }
}

export const GET_INDIVIDUAL_GROUP_BY_CATALOG_NUMBER = buildEndpointSpec({
  mapResponse: result => {
    const firstDataItem = extractData(result)[0] // should only be one result, which holds for mammals
    return flattenDataAttributes(firstDataItem)
  },
  mock: ({ request: { queryParams } }) => {
    return { data: [getIndividualGroup(queryParams)] }
  },
  operationId: 'getIndividualGroups',
})

export const LOOKUP_MAMMALS = buildEndpointSpec({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  mock: createLookupMammalsResponse,
  operationId: 'getIndividualGroups',
})

export const REGISTER_MAMMAL = buildEndpointSpec({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  operationId: 'createIndividualGroup',
})

export const UPDATE_INDIVIDUAL_GROUP = buildEndpointSpec({
  mapResponse: result => flattenDataAttributes(extractData(result)),
  operationId: 'updateIndividualGroup',
})
