export const catalogedUnit = {
  additionalProperties: false,
  properties: {
    catalogNumber: { type: 'string' },
    id: { type: 'integer' },
    publishRecord: { type: 'boolean' },
    storedUnderTaxonName: { type: 'string' },
    version: { type: 'integer' },
  },
  required: ['catalogNumber'],
}

export const featureObservation = {
  additionalProperties: false,
  properties: {
    appliesToIndividualGroupId: { type: 'integer' },
    featureObservationText: { type: 'string' },
    id: { type: 'integer' },
    isOfFeatureObservationTypeId: { type: 'integer' },
    version: { type: 'integer' },
  },
  required: ['featureObservationText', 'isOfFeatureObservationTypeId'],
}

export const identification = {
  additionalProperties: false,
  properties: {
    appliesToIndividualGroupId: { type: 'integer' },
    id: { type: 'integer' },
    identificationText: { type: 'string' },
    version: { type: 'integer' },
  },
  required: ['identificationText'],
}

export const individualGroup = {
  additionalProperties: false,
  properties: {
    id: { type: 'integer' },
    version: { type: 'integer' },
  },
  required: [],
}

export const occurrence = {
  additionalProperties: false,
  properties: {
    collectorsText: { type: 'string' },
    dayEnd: { type: 'string' },
    dayStart: { type: 'string' },
    id: { type: 'integer' },
    involvesIndividualGroupId: { type: 'integer' },
    localityText: { type: 'string' },
    monthEnd: { type: 'string' },
    monthStart: { type: 'string' },
    occurrenceDateText: { type: 'string' },
    version: { type: 'integer' },
    yearEnd: { type: 'string' },
    yearStart: { type: 'string' },
  },
  required: [],
}

export const physicalUnit = {
  additionalProperties: false,
  properties: {
    belongsToCatalogedUnitId: { type: 'integer' },
    id: { type: 'integer' },
    isCollectedAtOccurrenceId: { type: 'integer' },
    normalStorageLocation: { type: 'string' },
    physicalUnitText: { type: 'string' },
    representsIndividualGroupId: { type: 'integer' },
    version: { type: 'integer' },
  },
  required: [],
}
