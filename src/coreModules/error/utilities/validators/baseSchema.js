import Ajv from 'ajv'

const defaultOptions = {
  allErrors: true,
  jsonPointers: true, // -> /members/0
  useDefaults: true, // e.g.to may have default empty array
  verbose: true, // to have information about the error.parentSchema
}

export default function createSchemaValidator({
  schema,
  options = defaultOptions,
  errorHandler,
}) {
  const ajv = new Ajv(options)
  return obj => {
    const validate = ajv.compile(schema)
    const valid = validate(obj)

    if (valid) {
      return null
    }
    return errorHandler ? errorHandler(validate.errors) : validate.errors
  }
}
