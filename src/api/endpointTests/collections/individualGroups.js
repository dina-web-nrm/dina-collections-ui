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

const fullFormExample = {
  data: {
    additionalData: [
      {
        attributes: {
          catalogNumber: '584028',
        },
        type: 'catalogedUnit',
      },
    ],
    attributes: {
      individualGroup: {
        causeOfDeathStandardized: 'Standardized death cause',
        causeOfDeathText: 'Cause of death ',
        featureObservations: [
          {
            featureObservationText: 'A condition at collecting',
            featureObservationType: {
              featureObservationTypeName: 'conditionAtCollecting',
              id: 2,
            },
          },
          {
            featureObservationAgent: 'JD',
            featureObservationDate: 'A date',
            featureObservationText: 'male',
            featureObservationType: {
              featureObservationTypeName: 'sex',
              id: 1,
            },
            methodText: 'method text',
          },
        ],
        identifications: [
          {
            identificationRemarks: 'some remarks',
            identifiedAsVerbatim: 'Sorex minutus',
            identifiedByAgentText: 'Doe, J.',
            identifiedDateText: 'Date text',
            isCurrentIdentification: true,
          },
        ],
        occurrences: [
          {
            collectorsText: 'Bergström, U',
            dayEnd: 15,
            dayStart: 15,
            establishmentMeansStandardized: 'establishmentMeansStandardized',
            expeditionText: 'Vega Expedition',
            isDeathEvent: true,
            localityInformation: {
              coordinatesVerbatim: 'coord-string',
              coordinateUncertaintyInMeters: '10',
              geodeticDatumStandardized: 'geodeticDatumStandardized text',
              georeferenceSourcesText: 'georeferenceSourcesText text',
              latitudeStandardized: 'latitude-string',
              localityRemarks: 'localityRemarks text',
              localityStandardized: 'Vasastan',
              localityVerbatim: 'Some localityVerbatim text',
              longitudeStandardized: 'longitude-string',
              maximumDepthInMeters: '100',
              maximumElevationInMeters: '100',
              minimumDepthInMeters: '20',
              minimumElevationInMeters: '20',
            },
            localityText: 'localityText',
            monthEnd: 1,
            monthStart: 1,
            occurrenceDateText: '15 jan 1986',
            yearEnd: 1986,
            yearStart: 1986,
          },
        ],
        originStandardized: 'Standardized origin',
        physicalUnits: [
          {
            alternateIdentifiersText: 'alternateIdentifiersText',
            catalogedUnit: {
              catalogNumber: '584028',
              publishRecord: true,
              storedUnderTaxonName: 'Sorex minutus',
            },
            normalStorageLocationText: 'normalStorageLocationText',
            physicalUnitText: 'physicalUnitText',
          },
        ],
      },
    },
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
      testPostSuccess('fullFormExample', { body: fullFormExample }),
      testGetSuccess('getByCatalogNumber fullFormExample with includes', {
        queryParams: {
          'filter[catalogNumber]': '584028',
          include: 'identifications,physicalUnits.catalogedUnit',
        },
      }),
    ],
    collectionsClient
  )
}
