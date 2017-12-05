/* eslint-disable global-require, import/no-dynamic-require */

const controllers = ['testController'].reduce((obj, name) => {
  return {
    ...obj,
    [name]: require(`./${name}`),
  }
}, {})

module.exports = function createControllers({ config, models, sequelize }) {
  return Promise.resolve(
    Object.keys(controllers).reduce((obj, key) => {
      return {
        ...obj,
        [key]: controllers[key]({ config, models, sequelize }),
      }
    }, {})
  )
}
