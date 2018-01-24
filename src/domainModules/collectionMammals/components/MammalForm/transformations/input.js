const INITIAL_VALUES = {
  featureObservations: [
    {
      featureObservationType: {
        featureObservationTypeName: 'conditionAtCollecting',
      },
    },
  ],
  identifications: [{}],
  physicalUnits: [
    {
      catalogedUnit: {
        catalogNumber: '',
      },
    },
  ],
}

export default function transformInput(individualGroup) {
  if (!individualGroup) {
    return INITIAL_VALUES
  }
  const attributes = { ...individualGroup }

  if (attributes.featureObservations) {
    const firstConditionAtCollectingIndex = attributes.featureObservations.findIndex(
      ({ featureObservationType }) => {
        return (
          featureObservationType &&
          featureObservationType.featureObservationTypeName ===
            'conditionAtCollecting'
        )
      }
    )

    if (firstConditionAtCollectingIndex === -1) {
      attributes.featureObservations = [
        INITIAL_VALUES.featureObservations[0],
        ...attributes.featureObservations,
      ]
    } else if (firstConditionAtCollectingIndex > 0) {
      const conditionAtCollectingFeatureObservation =
        attributes.featureObservations[firstConditionAtCollectingIndex]

      // remove conditionAtCollectingFeatureObservation from array
      attributes.featureObservations.splice(firstConditionAtCollectingIndex, 1)
      // add conditionAtCollectingFeatureObservation first in array
      attributes.featureObservations = [
        conditionAtCollectingFeatureObservation,
        ...attributes.featureObservations,
      ]
    }
  } else {
    attributes.featureObservations = INITIAL_VALUES.featureObservations
  }

  if (!attributes.identifications) {
    attributes.identifications = INITIAL_VALUES.identifications
  }

  return attributes
}
