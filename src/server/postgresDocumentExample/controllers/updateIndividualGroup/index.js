const validateInput = require('./validateInput')
const transformInput = require('./transformInput')
const transformOutput = require('./transformOutput')

module.exports = function updateIndividualGroup({ models }) {
  return ({ pathParams, body }) => {
    const { data } = body
    validateInput({ data, pathParams })

    return models.IndividualGroup.update({
      doc: transformInput(data),
      id: pathParams.id,
    }).then(transformOutput)
  }
}
