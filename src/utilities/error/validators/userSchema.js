import { compose } from 'redux'
import createSchemaValidator from './baseSchema'
import userErrorFactory from '../errorFactories/user'
import ajvErrorMapper from '../errorMappers/ajv'

export const errorHandler = compose(ajvErrorMapper, userErrorFactory)

export default function createUserSchemaValidator(schema) {
  return createSchemaValidator({
    errorHandler,
    schema,
  })
}
