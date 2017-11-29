import Ajv from 'ajv'
import models from 'dina-schema/build/models.json'

const options = {
  allErrors: true,
  jsonPointers: true, // -> /members/0
  useDefaults: true, // e.g.to may have default empty array
  verbose: true, // to have information about the error.parentSchema
}

const ajv = new Ajv(options)

Object.keys(models).forEach(key => {
  ajv.addSchema(models[key], key)
})

export default function createModelSchemaValidator({
  schema: customSchema,
  model,
  errorHandler,
}) {
  if (model && !models[model]) {
    throw new Error(`Unkown model: ${model}`)
  }

  if (!models[model] && !customSchema) {
    throw new Error(
      'If model not provided have to provide customSchema (key schema)'
    )
  }

  const schema = models[model] || customSchema

  return obj => {
    const validate = ajv.compile(schema)
    const valid = validate(obj)
    if (valid) {
      return null
    }
    return errorHandler ? errorHandler(validate.errors) : validate.errors
  }
}
