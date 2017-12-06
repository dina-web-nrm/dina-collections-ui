/* eslint-disable global-require, import/no-dynamic-require */

const models = [
  'CatalogedUnit',
  'FeatureObservationType',
  'FeatureObservation',
  'Identification',
  'IndividualGroup',
  'Occurrence',
  'PhysicalUnit',
].map(name => {
  return require(`./${name}`)
})

module.exports = function createModels({ config, sequelize }) {
  return Promise.all(
    models.map(modelFactory => {
      return modelFactory({
        config,
        sequelize,
      })
    })
  )
}
