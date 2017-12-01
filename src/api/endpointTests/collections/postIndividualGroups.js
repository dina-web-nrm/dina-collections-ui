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
})
