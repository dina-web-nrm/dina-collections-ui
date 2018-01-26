const validateInput = require('./validateInput')
const transformInput = require('./transformInput')
const transformOutput = require('./transformOutput')

module.exports = function getIndividualGroups({ models }) {
  return queryParams => {
    validateInput(queryParams)

    const { catalogNumber, identifiedTaxonNameStandardized } = transformInput(
      queryParams
    )
    if (catalogNumber) {
      return models.IndividualGroup.Model.findAll({
        where: {
          'document.catalogedUnit.catalogNumber': catalogNumber,
        },
      }).then(transformOutput)
    }

    if (identifiedTaxonNameStandardized) {
      return models.IndividualGroup.Model.findAll({
        where: {
          'document.identifications.0.identifiedTaxonNameStandardized': identifiedTaxonNameStandardized,
        },
      }).then(transformOutput)
    }

    throw new Error('Not implemented')
  }
}
