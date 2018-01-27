const chainPromises = require('../../../utilities/chainPromises')
const createModels = require('./models')
const createControllers = require('./controllers')
const createDb = require('./db')

const syncModels = models => {
  return chainPromises(
    Object.keys(models).map(modelName => {
      const model = models[modelName]
      return () => {
        return model.Model.sync({ force: true })
      }
    })
  )
}

module.exports = function bootstrapDatalayer({ config, modules }) {
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return createModels({ config, modules, sequelize }).then(models => {
        return syncModels(models).then(() => {
          return createControllers({
            config,
            models,
            modules,
            sequelize,
          }).then(controllers => {
            return {
              controllers,
              models,
            }
          })
        })
      })
    })
  })
}
