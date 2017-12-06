/* eslint-disable global-require, import/no-dynamic-require */

module.exports = function createControllers({
  config,
  controllerFiles,
  models,
  sequelize,
}) {
  const controllers = controllerFiles.reduce((obj, name) => {
    return {
      ...obj,
      [name]: require(`../../../controllers/${name}`),
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
