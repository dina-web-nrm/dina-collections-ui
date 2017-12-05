import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'
import { createSystemSchemaValidator } from 'coreModules/error/utilities'
import { createLookupMammalsResponse } from './mockData'

import {
  lookupMammalsRequest,
  lookupMammalsResponse,
  registerMammalResponse,
} from './schemas'

export const GET_INDIVIDUAL_GROUP_BY_CATALOG_NUMBER = buildEndpointSpec({
  mapBody: userBodyInput => {
    return {
      data: {
        attributes: userBodyInput,
      },
    }
  },
  mapHeaders: userInputHeaders => {
    return {
      ...userInputHeaders,
      'Content-Type': 'application/json',
    }
  },
  mapResponse: json => json[0], // should only be one result
  mock: ({ request: { queryParams } }) => {
    return [
      {
        featureObservations: [
          {
            featureObservationText: 'female',
            featureObservationType: {
              featureObservationTypeName: 'sex',
              id: 1,
            },
          },
        ],
        identifications: [
          {
            identificationText: 'Water opossum',
            identifiedByAgentText: 'Doe, J.',
            identifiedTaxonNameStandardized: 'Chironectes minimus',
          },
        ],
        occurrences: [{ id: 1, localityText: 'Hemsö' }],
        physicalUnits: [
          {
            catalogedUnit: {
              catalogNumber: queryParams['filter[catalogNumber]'],
            },
          },
        ],
      },
    ]
  },
  operationId: 'getIndividualGroups',
  pathname: '/collections/api/v01/individualGroups',
  validateResponse: createSystemSchemaValidator(lookupMammalsResponse),
})

export const LOOKUP_MAMMALS = {
  mock: createLookupMammalsResponse,
  validateBody: createSystemSchemaValidator(lookupMammalsRequest),
  validateResponse: createSystemSchemaValidator(lookupMammalsResponse),
}

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
  pathname: '/collections/api/v01/individualGroups',
})
