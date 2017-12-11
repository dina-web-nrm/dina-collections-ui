import createValidator from './createValidator'

const defaultOptions = {
  throwOnError: false,
}

export default function validateAgainstSchema(
  schema,
  object,
  options = defaultOptions
) {
  const validator = createValidator({
    options: {
      allErrors: true,
      // errorDataPath: 'property',
      jsonPointers: true, // -> /members/0
      useDefaults: true, // e.g.to may have default empty array
      verbose: false, // to have information about the error.parentSchema
    },
    schema,
    throwOnError: options.throwOnError,
  })
  return validator(object)
}
