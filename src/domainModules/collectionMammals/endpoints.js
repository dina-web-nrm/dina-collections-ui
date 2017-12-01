import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'
import { createSystemSchemaValidator } from 'coreModules/error/utilities'
import { createLookupMammalsResponse } from './mockData'

import {
  lookupMammalsRequest,
  lookupMammalsResponse,
  registerMammalResponse,
} from './schemas'

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
