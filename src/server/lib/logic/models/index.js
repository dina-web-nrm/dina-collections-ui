/* eslint-disable global-require, import/no-dynamic-require */

module.exports = function createModels({ config, modelFiles, sequelize }) {
  const models = modelFiles.map(name => {
    return require(`../../../models/${name}`)
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
