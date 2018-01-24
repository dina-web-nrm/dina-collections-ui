/* eslint-disable no-param-reassign */
const validateInput = queryParams => {
  const { catalogNumber, identifiedTaxonNameStandardized } =
    queryParams.filter || {}

  if (!catalogNumber && !identifiedTaxonNameStandardized) {
    const error = new Error(
      'Provide catalogNumber or identifiedTaxonNameStandardized'
    )
    error.status = 400
    throw error
  }

  if (catalogNumber && identifiedTaxonNameStandardized) {
    const error = new Error(
      'Provide only one of catalogNumber or identifiedTaxonNameStandardized'
    )
    error.status = 400
    throw error
  }
}

const transformInput = queryParams => {
  const { catalogNumber, identifiedTaxonNameStandardized } =
    queryParams.filter || {}

  return {
    catalogNumber,
    identifiedTaxonNameStandardized,
  }
}

const tranformOutput = output => {
  if (!output || !output.length) {
    return []
  }

  return output.map(model => {
    const { dataValues } = model
    delete dataValues.document.catalogedUnit
    return {
      id: dataValues.id,
      ...dataValues.document,
    }
  })
}

module.exports = function getIndividualGroups({ sequelize }) {
  const { models } = sequelize

  return queryParams => {
    validateInput(queryParams)

    const { catalogNumber, identifiedTaxonNameStandardized } = transformInput(
      queryParams
    )
    if (catalogNumber) {
      return models.IndividualGroup.findAll({
        where: {
          'document.catalogedUnit.catalogNumber': catalogNumber,
        },
      }).then(result => {
        return tranformOutput(result)
      })
    }

    if (identifiedTaxonNameStandardized) {
      return models.IndividualGroup.findAll({
        where: {
          'document.identifications.0.identifiedTaxonNameStandardized': identifiedTaxonNameStandardized,
        },
      }).then(result => {
        return tranformOutput(result)
      })
    }

    throw new Error('Not implemented')
  }
}
