/* eslint-disable no-underscore-dangle, no-console */

module.exports = function createIndividualGroup({ controllers, request }) {
  const { Record } = controllers

  const catalogedUnit = request.body.data.additionalData[0].attributes
  const individualGroup = request.body.data.attributes

  if (individualGroup && individualGroup.physicalUnits) {
    if (!individualGroup.physicalUnits[0]) {
      individualGroup.physicalUnits[0] = {}
    }
    individualGroup.physicalUnits[0].catalogedUnit = catalogedUnit
  }

  const model = new Record({
    ...individualGroup,
    catalogedUnit,
  })

  const { catalogNumber } = catalogedUnit

  return Record.findOne({ 'catalogedUnit.catalogNumber': catalogNumber }).then(
    existingRecord => {
      if (existingRecord) {
        const error = new Error(`Record with id ${catalogNumber} exists`)
        error.status = 400
        throw error
      }
      return model.save().then(({ _id }) => {
        return Record.findById(_id).then(res => {
          const jsonResult = res.toJSON()
          const id = jsonResult._id
          delete jsonResult._id
          delete jsonResult.catalogedUnit
          delete jsonResult.__v
          return {
            data: {
              data: {
                attributes: {
                  ...jsonResult,
                },
                id,
              },
            },
          }
        })
      })
    }
  )
}
