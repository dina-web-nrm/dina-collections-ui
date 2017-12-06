module.exports = function testController({ sequelize }) {
  const { models } = sequelize

  return () => {
    return models.IndividualGroup.create(
      {
        featureObservations: [
          {
            identificationText: 'Some identificationText',
          },
        ],
        identifications: [
          {
            identifiedAsVerbatim: 'Some identifiedAsVerbatim text',
          },
        ],

        version: '1234',
      },
      {
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
            model: models.PhysicalUnit,
          },
        ],
      }
    )
      .then(result => {
        return Promise.resolve(result)
      })
      .catch(err => {
        throw err
      })
  }
}
