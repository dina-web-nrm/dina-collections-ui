import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'
import { createDeleter, createSetter } from 'utilities/stateHelper'

const setScientificName = createSetter(['attributes', 'scientificName'])
const deleteScientificUnderscoreName = createDeleter([
  'attributes',
  'scientific_name',
])

export const TAXONOMY_SEARCH = buildEndpointSpec({
  mapResponse: json => {
    const parsedResult = {
      ...json,
      data:
        json.data &&
        json.data.map(item => {
          return deleteScientificUnderscoreName(
            setScientificName(item, item.attributes.scientific_name)
          )
        }),
    }

    return parsedResult
  },
  operationId: 'getTaxaByName',
  pathname: '/taxon',
})
