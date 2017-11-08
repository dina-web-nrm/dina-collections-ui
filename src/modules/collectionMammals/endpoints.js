import { createSystemSchemaValidator } from 'modules/error/utilities'
import { registerMammalRequest, registerMammalResponse } from './schemas'

export const REGISTER_MAMMAL = {
  inputValidation: createSystemSchemaValidator(registerMammalRequest),
  key: 'REGISTER_MAMMAL',
  mock: ({ requestData }) => requestData.userInput.body,
  outputValidation: createSystemSchemaValidator(registerMammalResponse),
}
