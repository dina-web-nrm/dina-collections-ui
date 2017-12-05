/* eslint-disable global-require, import/no-dynamic-require */

const models = [
  'catalogedUnit',
  'featureObservationType',
  'featureObservation',
  'identification',
  'individualGroup',
  'occurrence',
  'physicalUnit',
  'user',
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
