import { compose } from 'redux'
import createSchemaValidator from 'utilities/jsonSchema/createValidator'
import systemErrorFactory from '../errorFactories/system'
import ajvErrorMapper from '../errorMappers/ajv'

export const errorHandler = compose(systemErrorFactory, ajvErrorMapper)

export default function createSystemSchemaValidator(schema) {
  return createSchemaValidator({
    errorHandler,
    schema,
  })
}
