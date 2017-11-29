import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'
import { createSystemSchemaValidator } from 'coreModules/error/utilities'
import {
  lookupMammalsRequest,
  lookupMammalsResponse,
  registerMammalResponse,
} from './schemas'

export const LOOKUP_MAMMALS = {
  mock: ({ request }) => {
    if (
      request &&
      request.queryParams &&
      request.queryParams.catalogNumber &&
      request.queryParams.taxonName
    ) {
      return {
        result: [
          { catalogNumber: 'matching number', taxonName: 'matching taxon' },
        ],
      }
    }

    if (request && request.queryParams && request.queryParams.catalogNumber) {
      return {
        result: [
          { catalogNumber: 'matching number', taxonName: 'Elit Praesent' },
        ],
      }
    }

    if (request && request.queryParams && request.queryParams.taxonName) {
      return {
        result: [{ catalogNumber: '201705005', taxonName: 'matching taxon' }],
      }
    }

    return {
      result: [
        { catalogNumber: '201705001', taxonName: 'Lorem ipsum' },
        { catalogNumber: '201705002', taxonName: 'Dolor Sit Amet' },
        { catalogNumber: '201705003', taxonName: 'Consectetur' },
        { catalogNumber: '201705004', taxonName: 'Adipiscing' },
      ],
    }
  },
  validateBody: createSystemSchemaValidator(lookupMammalsRequest),
  validateResponse: createSystemSchemaValidator(lookupMammalsResponse),
}

export const REGISTER_MAMMAL = buildEndpointSpec({
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
  mock: ({ request }) => request.body,
  operationId: 'createIndividualGroup',
  pathname: '/collections/api/v01/individualGroups',
  validateResponse: createSystemSchemaValidator(registerMammalResponse),
})
