import immutable from 'object-path-immutable'

export const getFeatureObservationTypeId = ({ featureObservationTypeName }) => {
  switch (featureObservationTypeName) {
    case 'sex': {
      return 1
    }
    case 'length': {
      return 2
    }
    case 'age': {
      return 3
    }
    case 'weight': {
      return 4
    }
    case 'conditionAtCollecting': {
      return 5
    }
    case 'ageStage': {
      return 6
    }
    default: {
      throw new Error(
        `Unknown featureObservationTypeName: ${featureObservationTypeName}`
      )
    }
  }
}

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
    'featureObservations',
    individualGroup.featureObservations &&
      individualGroup.featureObservations
        .filter(featureObservation => {
          return featureObservation.featureObservationText
        })
        .map(({ featureObservationType, ...rest }) => {
          return {
            ...rest,
            featureObservationType: {
              ...featureObservationType,
              id: getFeatureObservationTypeId(featureObservationType),
            },
          }
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
