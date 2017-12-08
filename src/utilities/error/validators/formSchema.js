import { compose } from 'redux'
import createSchemaValidator from 'utilities/jsonSchema/createValidator'
import formErrorFactory from '../errorFactories/form'
import ajvErrorMapper from '../errorMappers/ajv'

export const errorHandler = compose(formErrorFactory, ajvErrorMapper)

export default function createFormSchemaValidator(schema) {
  return createSchemaValidator({
    errorHandler,
    schema,
  })
}
