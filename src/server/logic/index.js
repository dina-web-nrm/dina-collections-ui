// const createLog = require('../utilities/log')
const createModels = require('./models')
const createControllers = require('./controllers')
const createDb = require('./db')

// const log = createLog('logic')

const syncModels = models => {
  return Promise.all(
    models.map(model => {
      return model.sync({ force: true })
    })
  )
}

const createRelations = sequelize => {
  const { featureObservation, featureObservationType } = sequelize.models
  featureObservation.hasOne(featureObservationType)

  return featureObservation.sync({ force: true }).then(() => {
    return featureObservationType.sync({ force: true })
  })
}

module.exports = function bootstrapDatalayer({ config }) {
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return createModels({ config, sequelize }).then(models => {
        return syncModels(models).then(() => {
          return createRelations(sequelize).then(() => {
            return createControllers({ config, models, sequelize }).then(
              controllers => {
                return {
                  controllers,
                  models,
                }
              }
            )
          })
        })
      })
    })
  })
}
