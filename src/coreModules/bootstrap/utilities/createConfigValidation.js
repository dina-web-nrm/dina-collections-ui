import { createSystemSchemaValidator } from 'coreModules/error/utilities'

export const extractConfigSchemas = modules => {
  return modules.reduce((validations, module) => {
    const moduleSchemas = module.schemas
    const moduleConfigSchema = moduleSchemas && moduleSchemas.config
    if (!moduleConfigSchema) {
      return validations
    }

    const moduleName = module.name

    return {
      ...validations,
      [moduleName]: moduleConfigSchema,
    }
  }, {})
}

export const extractRequiredEndpoints = modules => {
  return modules.reduce((endpoints, module) => {
    const moduleEndpoints = module.endpoints
    if (!endpoints) {
      return moduleEndpoints
    }

    return {
      ...endpoints,
      ...moduleEndpoints,
    }
  }, {})
}

export const validateConfigWithSchema = (config, configSchemas) => {
  Object.keys(configSchemas).forEach(moduleName => {
    const moduleSchema = configSchemas[moduleName]
    const moduleConfig = config[moduleName]
    const validate = createSystemSchemaValidator(moduleSchema)
    const errors = validate(moduleConfig)
    if (errors) {
      const errorMessage = `Validating config for module: ${moduleName}: ${JSON.stringify(
        errors,
        null,
        2
      )}`
      throw new Error(errorMessage)
    }
  })
}

export const validateEndpoints = (config, endpoints) => {
  const endpointKeyPathnameMap =
    (config.api && config.api && config.api.endpointKeyPathnameMap) || {}

  Object.keys(endpoints).forEach(endpointKey => {
    if (!(endpointKeyPathnameMap && endpointKeyPathnameMap[endpointKey])) {
      throw new Error(`Api not configured for ${endpointKey}`)
    }
  })
}

export default function createConfigValidation(modules) {
  const configSchemas = extractConfigSchemas(modules)
  const endpoints = extractRequiredEndpoints(modules)
  return (config = {}) => {
    validateConfigWithSchema(config, configSchemas)
    validateEndpoints(config, endpoints)
  }
}
