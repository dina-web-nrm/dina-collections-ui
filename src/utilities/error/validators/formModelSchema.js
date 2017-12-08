import { compose } from 'redux'
import createSchemaValidator from './baseModelSchema'
import formErrorFactory from '../errorFactories/form'
import ajvErrorMapper from '../errorMappers/ajv'

export const errorHandler = compose(formErrorFactory, ajvErrorMapper)

export default function createFormModelSchemaValidator({ model, schema }) {
  return createSchemaValidator({
    errorHandler,
    model,
    schema,
  })
}
