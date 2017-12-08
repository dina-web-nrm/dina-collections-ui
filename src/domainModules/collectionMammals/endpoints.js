import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'
import { createSystemSchemaValidator } from 'utilities/error'
import { createLookupMammalsResponse, getIndividualGroup } from './mockData'

import { lookupMammalsResponse, registerMammalResponse } from './schemas'

export const GET_INDIVIDUAL_GROUP_BY_CATALOG_NUMBER = buildEndpointSpec({
  mapHeaders: userInputHeaders => {
    return {
      ...userInputHeaders,
      'Content-Type': 'application/json',
    }
  },
  mapResponse: json => {
    return json.data[0] // should only be one result, which holds for mammals
  },
  mock: ({ request: { queryParams } }) => {
    return { data: [getIndividualGroup(queryParams)] }
  },
  operationId: 'getIndividualGroups',
  validateResponse: createSystemSchemaValidator(lookupMammalsResponse),
})

export const LOOKUP_MAMMALS = buildEndpointSpec({
  mapHeaders: userInputHeaders => {
    return {
      ...userInputHeaders,
      'Content-Type': 'application/json',
    }
  },
  mock: createLookupMammalsResponse,
  operationId: 'getIndividualGroups',
  validateResponse: createSystemSchemaValidator(lookupMammalsResponse),
})

export const REGISTER_MAMMAL = buildEndpointSpec({
  mock: ({ request }) => request.body,
  operationId: 'createIndividualGroup',
  validateResponse: createSystemSchemaValidator(registerMammalResponse),
})

export const UPDATE_INDIVIDUAL_GROUP = buildEndpointSpec({
  mapHeaders: userInputHeaders => {
    return {
      ...userInputHeaders,
      'Content-Type': 'application/json',
    }
  },
  mock: ({ request }) => request.body,
  operationId: 'updateIndividualGroup',
})
