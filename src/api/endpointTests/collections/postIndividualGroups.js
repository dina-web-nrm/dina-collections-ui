import * as endpoints from 'domainModules/collectionMammals/endpoints'

import { createCollectionsClient, login } from '../utilities'

describe('api/endpointTests/collections/postIndividualGroups', () => {
  let authToken
  let collectionsClient

  beforeEach(() => {
    return login()
      .then(loginToken => {
        authToken = loginToken
      })
      .then(() => {
        collectionsClient = createCollectionsClient({
          authToken,
        })
      })
  })
  describe('expected success cases', () => {
    it('Simple case works', () => {
      const testData = {
        data: {
          additionalData: [
            {
              attributes: {
                catalogNumber: 'abc123',
              },
              type: 'catalogedUnit',
            },
          ],
          attributes: {
            featureObservations: [],
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
            ],
            physicalUnits: [
              {
                normalStorageLocation: 'Stockholm',
                physicalUnitText: 'This is a test',
              },
            ],
          },

          type: 'individualGroup',
        },
      }

      return collectionsClient
        .httpPost(endpoints.REGISTER_MAMMAL, { body: testData })
        .then(result => {
          expect(result.data).toBeTruthy()
        })
    })
    it('All attributes as empty arrays', () => {
      const testData = {
        data: {
          additionalData: [
            {
              attributes: { catalogNumber: 'fefefefe' },
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
      return collectionsClient
        .httpPost(endpoints.REGISTER_MAMMAL, { body: testData })
        .then(result => {
          expect(result.data).toBeTruthy()
        })
    })
    fit('All attributes missing', () => {
      const testData = {
        data: {
          additionalData: [
            {
              attributes: { catalogNumber: 'fefefefe' },
              type: 'catalogedUnit',
            },
          ],
          attributes: {},
          type: 'individualGroup',
        },
      }
      return collectionsClient
        .httpPost(endpoints.REGISTER_MAMMAL, { body: testData })
        .then(result => {
          expect(result.data).toBeTruthy()
        })
    })

    it('Form inspired case with featureObservations works', () => {
      const testData = {
        data: {
          additionalData: [
            {
              attributes: { catalogNumber: 'fefefefe' },
              type: 'catalogedUnit',
            },
          ],
          attributes: {
            featureObservations: [
              {
                featureObservationText: 'f',
                featureObservationType: {
                  featureObservationTypeName: 'sex',
                  id: 1,
                },
              },
              {
                featureObservationText: 'f',
                featureObservationType: {
                  featureObservationTypeName: 'age',
                  id: 2,
                },
              },
              {
                featureObservationText: 'f',
                featureObservationType: {
                  featureObservationTypeName: 'ageStage',
                  id: 3,
                },
              },
            ],
            physicalUnits: [{}],
          },
          type: 'individualGroup',
        },
      }
      return collectionsClient
        .httpPost(endpoints.REGISTER_MAMMAL, { body: testData })
        .then(result => {
          expect(result.data).toBeTruthy()
        })
    })
  })

  describe('expected error cases', () => {
    it('Wrong input (no catalogedNumber) gives 400 response', () => {
      const testData = {
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

      return collectionsClient
        .httpPost(endpoints.REGISTER_MAMMAL, { body: testData })
        .then(() => {
          throw new Error('')
        })
        .catch(result => {
          expect(result.status).toBe(400)
        })
    })
  })
})
