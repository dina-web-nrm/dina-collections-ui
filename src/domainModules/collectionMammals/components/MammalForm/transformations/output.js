import immutable from 'object-path-immutable'

export default function transformOutput(formData) {
  let individualGroup = formData

  if (individualGroup.occurrences && individualGroup.occurrences.length) {
    individualGroup.occurrences = individualGroup.occurrences.map(
      occurrence => {
        const { dayStart, monthStart, yearStart } = occurrence
        return {
          ...occurrence,
          dayEnd: dayStart,
          monthEnd: monthStart,
          yearEnd: yearStart,
        }
      }
    )
  }

  const { catalogedUnit } = individualGroup.physicalUnits[0]
  individualGroup = immutable.set(
    individualGroup,
    'physicalUnits',
    individualGroup.physicalUnits.map(physicalUnit => {
      return immutable.del(physicalUnit, 'catalogedUnit')
    })
  )

  individualGroup = immutable.set(
    individualGroup,
    'featureObservations',
    individualGroup.featureObservations &&
      individualGroup.featureObservations.filter(featureObservation => {
        return featureObservation.featureObservationText
      })
  )

  individualGroup = {
    featureObservations: [],
    identifications: [],
    occurrences: [],
    physicalUnits: [],
    ...individualGroup,
  }

  return {
    catalogedUnit,
    individualGroup,
  }
}
