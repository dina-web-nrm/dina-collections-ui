const path = require('path')
/* eslint-disable global-require, import/no-dynamic-require */

module.exports = function createModels({
  basePath,
  config,
  modelFiles,
  sequelize,
}) {
  const models = modelFiles.map(name => {
    const modelPath = path.join(basePath, 'models', name)
    return require(modelPath)
  })

  return Promise.all(
    models.map(modelFactory => {
      return modelFactory({
        config,
        sequelize,
      })
    })
  )
}
