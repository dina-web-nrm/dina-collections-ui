import { compose } from 'redux'
import createSchemaValidator from 'utilities/jsonSchema/createValidator'
import systemErrorFactory from '../errorFactories/system'
import ajvErrorMapper from '../errorMappers/ajv'

export const errorHandler = compose(systemErrorFactory, ajvErrorMapper)

export default function createSystemModelSchemaValidator({
  model,
  schema,
  throwOnError,
}) {
  return createSchemaValidator({
    errorHandler,
    model,
    schema,
    throwOnError,
  })
}
