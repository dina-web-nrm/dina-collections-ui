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

  return individualGroup
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
    console.log('IN updateIndividualGroup')
    const { data } = body
    validateInput({ data, pathParams })

    return models.IndividualGroup.findById(pathParams.id).then(
      individualGroup => {
        console.log(
          'individualGroup',
          JSON.stringify(individualGroup.dataValues, null, 2)
        )
        if (!individualGroup) {
          const error = new Error(
            `IndividualGroup not found for id ${pathParams.id}`
          )
          error.status = 404
          throw error
        }
        return individualGroup
          .update({
            document: transformInput(data),
          })
          .then(result => {
            console.log('result', JSON.stringify(result, null, 2))
            return tranformOutput(result)
          })
      }
    )
  }
}
