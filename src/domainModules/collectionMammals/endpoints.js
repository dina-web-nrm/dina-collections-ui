import { createSystemSchemaValidator } from 'coreModules/error/utilities'
import {
  lookupMammalsRequest,
  lookupMammalsResponse,
  registerMammalRequest,
  registerMammalResponse,
} from './schemas'

export const LOOKUP_MAMMALS = {
  inputBodyValidation: createSystemSchemaValidator(lookupMammalsRequest),
  key: 'LOOKUP_MAMMALS',
  mock: ({ requestData }) => {
    if (
      requestData.userInput &&
      requestData.userInput.queryParams &&
      requestData.userInput.queryParams.catalogNumber &&
      requestData.userInput.queryParams.taxonName
    ) {
      return {
        result: [
          { catalogNumber: 'matching number', taxonName: 'matching taxon' },
        ],
      }
    }

    if (
      requestData.userInput &&
      requestData.userInput.queryParams &&
      requestData.userInput.queryParams.catalogNumber
    ) {
      return {
        result: [
          { catalogNumber: 'matching number', taxonName: 'Elit Praesent' },
        ],
      }
    }

    if (
      requestData.userInput &&
      requestData.userInput.queryParams &&
      requestData.userInput.queryParams.taxonName
    ) {
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
  outputValidation: createSystemSchemaValidator(lookupMammalsResponse),
}

export const REGISTER_MAMMAL = {
  inputBodyValidation: createSystemSchemaValidator(registerMammalRequest),
  key: 'REGISTER_MAMMAL',
  mock: ({ requestData }) => requestData.userInput.body,
  outputValidation: createSystemSchemaValidator(registerMammalResponse),
}
