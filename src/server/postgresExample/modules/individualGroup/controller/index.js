const transformInput = require('./transformInput')
const transformInputSearch = require('./transformInputSearch')
const transformInputUpdate = require('./transformInputUpdate')
const transformOutput = require('./transformOutput')
const transformOutputArray = require('./transformOutputArray')
const validateQueryInput = require('./validateQueryInput')
const validateUpdateBody = require('./validateUpdateBody')

module.exports = function individualGroupController({ models }) {
  const create = ({ data }) => {
    return models.individualGroup
      .create(transformInput(data))
      .then(transformOutput)
  }

  const getByQueryParams = ({ queryParams }) => {
    validateQueryInput(queryParams)
    const {
      catalogNumber,
      identifiedTaxonNameStandardized,
    } = transformInputSearch(queryParams)
    if (catalogNumber) {
      return models.individualGroup.Model.findAll({
        where: {
          'document.catalogedUnit.catalogNumber': catalogNumber,
        },
      }).then(transformOutputArray)
    }

    if (identifiedTaxonNameStandardized) {
      return models.individualGroup.Model.findAll({
        where: {
          'document.identifications.0.identifiedTaxonNameStandardized': identifiedTaxonNameStandardized,
        },
      }).then(transformOutputArray)
    }

    throw new Error('Not implemented')
  }

  const update = ({ id, data }) => {
    validateUpdateBody({ data, id })
    return models.individualGroup
      .update({
        doc: transformInputUpdate(data),
        id,
      })
      .then(transformOutput)
  }

  return {
    create,
    getByQueryParams,
    update,
  }
}
