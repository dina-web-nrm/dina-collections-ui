/* eslint-disable no-param-reassign */

const validateInput = data => {
  if (!data) {
    const error = new Error('body is required')
    error.status = 400
    throw error
  }
  const catalogedUnit = data.additionalData[0].attributes

  if (!catalogedUnit.catalogNumber) {
    const error = new Error('catalogNumber is required')
    error.status = 400
    throw error
  }
}

const transformInput = data => {
  const catalogedUnit = data.additionalData[0].attributes
  const individualGroup = data.attributes

  if (individualGroup && individualGroup.physicalUnits) {
    if (!individualGroup.physicalUnits[0]) {
      individualGroup.physicalUnits[0] = {}
    }
    individualGroup.physicalUnits[0].catalogedUnit = catalogedUnit
  }

  return {
    ...individualGroup,
    catalogedUnit,
  }
}

const tranformOutput = output => {
  delete output.document.catalogedUnit
  return {
    id: output.id,
    ...output.document,
  }
}

module.exports = function createIndividualGroup({ sequelize }) {
  const { models } = sequelize

  return ({ body }) => {
    const { data } = body
    validateInput(data)

    const individualGroupData = {
      document: transformInput(data),
    }

    return models.IndividualGroup.create(individualGroupData).then(newModel => {
      newModel.set('documentId', newModel.get('id'))
      return newModel.save().then(result => {
        return tranformOutput(result.dataValues)
      })
    })
  }
}
