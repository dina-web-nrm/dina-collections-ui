import createConfigValidation from './createConfigValidation'

export default function createModuleMap({
  availableModules,
  availableViews,
  config,
  moduleMap = {},
  newModules = [],
  removeModules = [],
}) {
  const validateConfig = createConfigValidation(newModules)
  validateConfig(config)

  const newModuleMap = {
    ...moduleMap,
  }
  newModules.forEach(module => {
    const { name } = module

    if (!availableModules[name] && !availableViews[name]) {
      throw new Error(`Module or view with name ${name} is unknown`)
    }

    if (!newModuleMap[name]) {
      newModuleMap[name] = module // eslint-disable-line no-param-reassign
    }
  })

  removeModules.forEach(module => {
    const { name } = module
    if (newModuleMap[name]) {
      delete newModuleMap[name] // eslint-disable-line no-param-reassign
    }
  })

  return newModuleMap
}
