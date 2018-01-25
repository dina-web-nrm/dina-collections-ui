/* eslint-disable no-param-reassign */

const validateInput = ({ data, pathParams }) => {
  if (!pathParams || !pathParams.id) {
    const error = new Error('pathParams.id is required')
    error.status = 400
    throw error
  }

  if (!data) {
    const error = new Error('body is required')
    error.status = 400
    throw error
  }
}

const transformInput = data => {
  const individualGroup = data.attributes

  // TODO - This is not the correct input format
  if (individualGroup && individualGroup.physicalUnits) {
    if (
      individualGroup.physicalUnits[0].catalogedUnit &&
      individualGroup.physicalUnits[0].catalogedUnit.attributes
    ) {
      individualGroup.physicalUnits[0].catalogedUnit =
        individualGroup.physicalUnits[0].catalogedUnit.attributes
    }
  }

  return {
    ...individualGroup,
    catalogedUnit: individualGroup.physicalUnits[0].catalogedUnit,
  }
}

const tranformOutput = ({ dataValues }) => {
  delete dataValues.document.catalogedUnit
  return {
    id: dataValues.id,
    ...dataValues.document,
  }
}

module.exports = function updateIndividualGroup({ sequelize }) {
  const { models } = sequelize

  return ({ pathParams, body }) => {
    const { data } = body
    validateInput({ data, pathParams })

    return models.IndividualGroup.findOne({
      order: [['id', 'DESC']],
      where: {
        documentId: pathParams.id,
      },
    }).then(individualGroup => {
      if (!individualGroup) {
        const error = new Error(
          `IndividualGroup not found for id ${pathParams.id}`
        )
        error.status = 404
        throw error
      }
      const newVersionIndividualGroup = individualGroup.get()
      delete newVersionIndividualGroup.id
      newVersionIndividualGroup.document = transformInput(data)
      console.log('newVersionIndividualGroup', newVersionIndividualGroup)
      return models.IndividualGroup.create(newVersionIndividualGroup).then(
        result => {
          return tranformOutput(result)
        }
      )
    })
  }
}
