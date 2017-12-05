const initializeUser = require('./user')

module.exports = function createModels({ config, sequelize }) {
  return Promise.resolve({
    user: initializeUser({
      config,
      sequelize,
    }),
  })
}
