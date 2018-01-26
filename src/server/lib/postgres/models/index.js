const path = require('path')
/* eslint-disable global-require, import/no-dynamic-require */

module.exports = function createModels({
  basePath,
  config,
  modelFiles,
  sequelize,
}) {
  const rawModels = modelFiles.map(name => {
    const modelPath = path.join(basePath, 'models', name)
    return {
      modelFactory: require(modelPath),
      name,
    }
  })

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
