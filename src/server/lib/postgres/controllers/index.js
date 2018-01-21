const path = require('path')
/* eslint-disable global-require, import/no-dynamic-require */

module.exports = function createControllers({
  basePath = '../../../postgresExample/controllers/',
  config,
  controllerFiles,
  models,
  sequelize,
}) {
  const controllers = controllerFiles.reduce((obj, name) => {
    const controllerPath = path.join(basePath, name)
    return {
      ...obj,
      [name]: require(controllerPath),
    }
  }, {})

  return Promise.resolve(
    Object.keys(controllers).reduce((obj, key) => {
      return {
        ...obj,
        [key]: controllers[key]({ config, models, sequelize }),
      }
    }, {})
  )
}
