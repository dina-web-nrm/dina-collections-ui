const path = require('path')
/* eslint-disable global-require, import/no-dynamic-require */

module.exports = function createModels({
  basePath = '../../../postgresExample/models/',
  config,
  modelFiles,
  sequelize,
}) {
  const models = modelFiles.map(name => {
    const modelPath = path.join(basePath, name)
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
