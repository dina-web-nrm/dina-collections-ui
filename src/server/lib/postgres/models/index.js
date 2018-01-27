const extractModelsFromModules = modules => {
  return Object.keys(modules)
    .map(moduleName => {
      return {
        modelFactory: modules[moduleName].model,
        name: moduleName,
      }
    })
    .filter(({ modelFactory }) => !!modelFactory)
}

module.exports = function createModels({ config, modules, sequelize }) {
  const rawModels = extractModelsFromModules(modules)
  return Promise.all(
    rawModels.map(({ name, modelFactory }) => {
      const model = modelFactory({
        config,
        sequelize,
      })
      return {
        model,
        name,
      }
    })
  ).then(models => {
    return models.reduce((obj, { model, name }) => {
      return {
        ...obj,
        [name]: model,
      }
    }, {})
  })
}
