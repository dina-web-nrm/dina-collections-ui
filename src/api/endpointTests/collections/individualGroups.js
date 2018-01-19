const chainPromises = require('../../../utilities/chainPromises')
const {
  createErrorRequestTestFactory,
  createSuccessRequestTestFactory,
} = require('../utilities')

const testGetSuccess = createSuccessRequestTestFactory('getIndividualGroups')
const testPatchError = createErrorRequestTestFactory('updateIndividualGroup')
const testPatchSuccess = createSuccessRequestTestFactory(
  'updateIndividualGroup'
)
const testPostError = createErrorRequestTestFactory('createIndividualGroup')
const testPostSuccess = createSuccessRequestTestFactory('createIndividualGroup')

const onlyCatalogedUnit = {
  data: {
    additionalData: [
      {
        attributes: {
          catalogNumber: 'abc123',
        },
        type: 'catalogedUnit',
      },
    ],
    attributes: {},
    type: 'individualGroup',
  },
}

const allAttributesAsEmptyArrays = {
  data: {
    additionalData: [
      {
        attributes: { catalogNumber: 'fefefe' },
        type: 'catalogedUnit',
      },
    ],
    attributes: {
      featureObservations: [],
      identifications: [],
      occurrences: [],
      physicalUnits: [],
    },
    type: 'individualGroup',
  },
}

const validCatalogNumber = '123456'
const validTaxonName = 'Chironectes minimus'

const withIndividualGroup = {
  data: {
    additionalData: [
      {
        attributes: {
          catalogNumber: validCatalogNumber,
        },
        type: 'catalogedUnit',
      },
    ],
    attributes: {
      causeOfDeathStandardized: 'causeOfDeathStandardized',
      causeOfDeathText: 'causeOfDeathText',
      featureObservations: [
        {
          featureObservationText: '21',
          featureObservationType: {
            featureObservationTypeName: 'age',
            id: 1,
          },
        },
      ],
      identifications: [
        {
          identifiedTaxonNameStandardized: validTaxonName,
        },
      ],
      occurrences: [
        {
          collectorsText: 'Ida Li',
          localityText: 'Sollentuna, Sweden',
          occurrenceDateText: '2017-10-12',
        },
      ],
      originStandardized: 'originStandardized',
      physicalUnits: [
        {
          normalStorageLocationText: 'Stockholm',
          physicalUnitText: 'This is a test',
        },
      ],
    },
    type: 'individualGroup',
  },
}

const badRequestMissingCatalogNumber = {
  data: {
    additionalData: [
      {
        attributes: {},
        type: 'catalogedUnit',
      },
    ],
    attributes: {
      featureObservations: [],
      identifications: [],
      occurrences: [],
      physicalUnits: [],
    },
    type: 'individualGroup',
  },
}

const updateValidIndividualGroup = {
  data: {
    attributes: {
      causeOfDeathStandardized: 'causeOfDeathStandardized',
      causeOfDeathText: 'causeOfDeathText',
      featureObservations: [
        {
          featureObservationText: '22',
          featureObservationType: {
            featureObservationTypeName: 'age',
            id: 1,
          },
        },
      ],
      identifications: [
        {
          identificationText: 'This is a test',
        },
      ],
      occurrences: [
        {
          collectorsText: 'Ida Li',
          localityText: 'Sollentuna, Sweden',
          occurrenceDateText: '2017-10-12',
        },
        {
          collectorsText: 'Ada Lovelace',
          localityText: 'Sollentuna, Sweden',
          occurrenceDateText: '2017-11-11',
        },
      ],
      originStandardized: 'originStandardized',
      physicalUnits: [
        {
          catalogedUnit: {
            attributes: {
              catalogNumber: validCatalogNumber,
            },
            type: 'catalogedUnit',
          },
          normalStorageLocationText: 'Stockholm',
          physicalUnitText: 'Updated text',
        },
      ],
    },
    type: 'individualGroup',
  },
}

const updateValidIndividualGroupOnePhysicalUnitWithId = {
  data: {
    attributes: {
      featureObservations: [],
      identifications: [],
      occurrences: [],
      physicalUnits: [
        {
          id: 138,
        },
      ],
    },
    type: 'individualGroup',
  },
}

module.exports = function createIndividualGroup({ collectionsClient }) {
  return chainPromises(
    [
      testPostSuccess('onlyCatalogedUnit', { body: onlyCatalogedUnit }),
      testPostSuccess('allAttributesAsEmptyArrays', {
        body: allAttributesAsEmptyArrays,
      }),
      testPostSuccess('withIndividualGroup', { body: withIndividualGroup }),
      testPostError('missingCatalogNumber', {
        body: badRequestMissingCatalogNumber,
        statusCode: 400,
      }),
      testPatchSuccess('updateValidIndividualGroup', {
        body: updateValidIndividualGroup,
        pathParams: { id: '1' }, // there will be at least one individualGroup after the above POST requests
      }),
      testPatchSuccess(
        'updateValidIndividualGroup with one empty physicalUnit',
        {
          body: updateValidIndividualGroupOnePhysicalUnitWithId,
          pathParams: { id: '1' }, // there will be at least one individualGroup after the above POST requests
        }
      ),
      testPatchError('missingBody', {
        pathParams: { id: '1' },
        statusCode: 400,
      }),
      testPatchError('invalidId', {
        pathParams: { id: '-1' },
        statusCode: 400,
      }),
      testGetSuccess('getByCatalogNumber', {
        queryParams: { 'filter[catalogNumber]': validCatalogNumber },
      }),
      testGetSuccess('getByCatalogNumber with includes', {
        queryParams: {
          'filter[catalogNumber]': validCatalogNumber,
          include: 'identifications,physicalUnits.catalogedUnit',
        },
      }),
      testGetSuccess('getByIdentifiedTaxonNameStandardized', {
        queryParams: {
          'filter[identifiedTaxonNameStandardized]': validTaxonName,
        },
      }),
      testGetSuccess('getByIdentifiedTaxonNameStandardized with includes', {
        queryParams: {
          'filter[identifiedTaxonNameStandardized]': validTaxonName,
          include: 'identifications,physicalUnits.catalogedUnit',
        },
      }),
    ],
    collectionsClient
  )
}
