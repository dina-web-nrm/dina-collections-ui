import { compose } from 'redux'
import createSchemaValidator from './baseSchema'
import systemErrorFactory from '../errorFactories/system'
import ajvErrorMapper from '../errorMappers/ajv'

export const errorHandler = compose(systemErrorFactory, ajvErrorMapper)

export default function createSystemSchemaValidator(schema) {
  return createSchemaValidator({
    errorHandler,
    schema,
  })
}
