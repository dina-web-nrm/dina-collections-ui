import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'
import { createSystemSchemaValidator } from 'coreModules/error/utilities'
import { createLookupMammalsResponse } from './mockData'

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

export const LOOKUP_MAMMALS = buildEndpointSpec({
  mapHeaders: userInputHeaders => {
    return {
      ...userInputHeaders,
      'Content-Type': 'application/json',
    }
  },
  mock: createLookupMammalsResponse,
  operationId: 'getIndividualGroups',
  pathname: '/collections/api/v01/individualGroups',
  validateResponse: createSystemSchemaValidator(lookupMammalsResponse),
})

export const REGISTER_MAMMAL = buildEndpointSpec({
  mock: ({ request }) => request.body,
  operationId: 'createIndividualGroup',
  validateResponse: createSystemSchemaValidator(registerMammalResponse),
})

export const UPDATE_INDIVIDUAL_GROUP = buildEndpointSpec({
  mapBody: userInputBody => {
    return {
      ...userInputBody,
      // TODO: ensure empty array if missing
      featureObservations: userInputBody.featureObservations || [],
      identifications: userInputBody.identifications || [],
      occurrences: userInputBody.occurrences || [],
    }
  },
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
