const createModels = require('./models')
const createControllers = require('./controllers')
const createDb = require('./db')

module.exports = function bootstrapDatalayer({ config }) {
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return createModels({ config, sequelize }).then(models => {
        return createControllers({ config, models, sequelize })
      })
    })
  })
}
