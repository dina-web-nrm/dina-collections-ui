const createRelations = ({ sequelize }) => {
  const {
    CatalogedUnit,
    FeatureObservationType,
    FeatureObservation,
    Identification,
    IndividualGroup,
    Occurrence,
    PhysicalUnit,
  } = sequelize.models

  IndividualGroup.hasMany(FeatureObservation, { as: 'featureObservations' })
  IndividualGroup.hasMany(Identification, { as: 'identifications' })
  IndividualGroup.hasMany(Occurrence, { as: 'occurrences' })
  IndividualGroup.hasMany(PhysicalUnit, { as: 'physicalUnits' })

  FeatureObservation.hasOne(FeatureObservationType)

  Occurrence.hasMany(PhysicalUnit, { as: 'physicalUnits' })

  PhysicalUnit.belongsTo(CatalogedUnit, {
    as: 'catalogedUnit',
    foreignKey: 'catalogedUnitId',
  })

  return chainPromises(
    [
      CatalogedUnit,
      FeatureObservationType,
      FeatureObservation,
      Identification,
      IndividualGroup,
      Occurrence,
      PhysicalUnit,
    ].map(module => {
      return () => {
        return module.sync({ force: true })
      }
    })
  )
}
