const validateInput = require('./validateInput')
const transformInput = require('./transformInput')
const transformOutput = require('./transformOutput')

module.exports = function createIndividualGroup({ models }) {
  return ({ body }) => {
    const { data } = body
    validateInput(data)

    return models.IndividualGroup.create(transformInput(data)).then(
      transformOutput
    )
  }
}
