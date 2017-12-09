import objectPath from 'object-path'
import Ajv from 'ajv'
import models from 'dina-schema/build/models.json'

const options = {
  allErrors: true,
  // errorDataPath: 'property',
  jsonPointers: true, // -> /members/0
  useDefaults: true, // e.g.to may have default empty array
  verbose: true, // to have information about the error.parentSchema
}

const ajv = new Ajv(options)

Object.keys(models).forEach(key => {
  ajv.addSchema(models[key], key)
})

// TODO: rename model to modelName
export default function createModelSchemaValidator({
  dataPath,
  schema: customSchema,
  model,
  errorHandler,
  throwOnError,
}) {
  if (model && !models[model]) {
    throw new Error(`Unknown model: ${model}`)
  }

  if (!models[model] && !customSchema) {
    throw new Error(
      'If model not provided have to provide customSchema (key schema)'
    )
  }

  const schema = models[model] || customSchema
  return obj => {
    const objToTest = dataPath && obj ? objectPath.get(obj, dataPath) : obj
    const validate = ajv.compile(schema)

    const valid = validate(objToTest)
    if (valid) {
      return null
    }

    const error = errorHandler ? errorHandler(validate.errors) : validate.errors

    if (throwOnError) {
      throw error
    }

    return error
  }
}
