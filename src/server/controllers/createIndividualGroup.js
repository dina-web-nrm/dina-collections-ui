module.exports = function createIndividualGroup({ sequelize }) {
  const { models } = sequelize

  return data => {
    const catalogedUnit = data.additionalData[0].attributes
    return models.CatalogedUnit.create(catalogedUnit)
      .then(createdCatalogedUnit => {
        const catalogedUnitId = createdCatalogedUnit.get('id')

        const individualGroup = data.attributes
        individualGroup.physicalUnits = (
          individualGroup.physicalUnits || []
        ).map(physicalUnit => {
          return {
            catalogedUnitId,
            ...physicalUnit,
          }
        })
        return models.IndividualGroup.create(individualGroup, {
          include: [
            {
              as: 'featureObservations',
              model: models.FeatureObservation,
            },
            {
              as: 'identifications',
              model: models.Identification,
            },
            {
              as: 'occurrences',
              model: models.Occurrence,
            },
            {
              as: 'physicalUnits',
              include: [
                {
                  as: 'catalogedUnit',
                  model: models.CatalogedUnit,
                },
              ],
              model: models.PhysicalUnit,
            },
          ],
        })
      })
      .then(result => {
        return Promise.resolve(result)
      })
      .catch(err => {
        if (
          err.name === 'SequelizeValidationError' ||
          err.name === 'SequelizeUniqueConstraintError'
        ) {
          err.status = 400
        }
        throw err
      })
  }
}
