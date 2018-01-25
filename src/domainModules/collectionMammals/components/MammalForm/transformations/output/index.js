import transformOccurrences from './occurrences'
import transformFeatureObservations from './featureObservations'
import transformIdentifications from './identifications'
import transformPhysicalUnits from './physicalUnits'

export default function transformOutput(formData) {
  const { catalogedUnit } = formData.physicalUnits[0]
  const occurrences = transformOccurrences(formData.occurrences)
  const featureObservations = transformFeatureObservations(
    formData.featureObservations
  )
  const identifications = transformIdentifications(formData.identifications)
  const physicalUnits = transformPhysicalUnits(formData.physicalUnits)

  const individualGroup = {
    ...formData,
    featureObservations,
    identifications,
    occurrences,
    physicalUnits,
  }

  return {
    catalogedUnit,
    individualGroup,
  }
}
