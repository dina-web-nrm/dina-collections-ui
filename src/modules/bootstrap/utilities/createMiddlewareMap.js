export const createMiddlewares = (modules, config = {}) => {
  return modules.reduce((middlewares, module) => {
    const middlewareFactory = module.middleware
    if (!middlewareFactory) {
      return middlewares
    }
    const name = module.name
    const moduleConfig = config[name]
    const moduleMiddlewareConfig = moduleConfig

    const middleware = middlewareFactory(moduleMiddlewareConfig)
    return {
      ...middlewares,
      [name]: middleware,
    }
  }, {})
}

export default function createMiddlewareMap({
  config,
  middlewareMap = {},
  newModules = [],
  removeModules = [],
}) {
  const newMiddlewares = createMiddlewares(newModules, config)
  const newMiddlewareMap = {
    ...middlewareMap,
    ...newMiddlewares,
  }

  removeModules.forEach(module => {
    const name = module.name
    if (newMiddlewareMap[name]) {
      delete newMiddlewareMap[name] // eslint-disable-line no-param-reassign
    }
  })
  return newMiddlewareMap
}
