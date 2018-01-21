// const createLog = require('../utilities/log')
const chainPromises = require('../../../utilities/chainPromises')
const createModels = require('./models')
const createControllers = require('./controllers')
const createDb = require('./db')

// const log = createLog('logic')

const syncModels = models => {
  return chainPromises(
    models.map(model => {
      return () => {
        return model.sync({ force: true })
      }
    })
  )
}

const createRelations = sequelize => {
  const {
    CatalogedUnit,
    FeatureObservationType,
    FeatureObservation,
    Identification,
    IndividualGroup,
    Occurrence,
    PhysicalUnit,
  } = sequelize.models

  IndividualGroup.hasMany(FeatureObservation, { as: 'featureObservations' })
  IndividualGroup.hasMany(Identification, { as: 'identifications' })
  IndividualGroup.hasMany(Occurrence, { as: 'occurrences' })
  IndividualGroup.hasMany(PhysicalUnit, { as: 'physicalUnits' })

  FeatureObservation.hasOne(FeatureObservationType)

  Occurrence.hasMany(PhysicalUnit, { as: 'physicalUnits' })

  PhysicalUnit.belongsTo(CatalogedUnit, {
    as: 'catalogedUnit',
    foreignKey: 'catalogedUnitId',
  })

  return chainPromises(
    [
      CatalogedUnit,
      FeatureObservationType,
      FeatureObservation,
      Identification,
      IndividualGroup,
      Occurrence,
      PhysicalUnit,
    ].map(module => {
      return () => {
        return module.sync({ force: true })
      }
    })
  )
}

module.exports = function bootstrapDatalayer({
  config,
  controllerFiles,
  modelFiles,
}) {
  return Promise.resolve().then(() => {
    return createDb({ config }).then(sequelize => {
      return createModels({ config, modelFiles, sequelize }).then(models => {
        return syncModels(models).then(() => {
          return createRelations(sequelize).then(() => {
            return createControllers({
              config,
              controllerFiles,
              models,
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
  })
}
