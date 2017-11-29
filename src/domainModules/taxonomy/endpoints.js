import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'
import { createDeleter, createSetter } from 'utilities/stateHelper'

const setScientificName = createSetter(['attributes', 'scientificName'])
const deleteScientificUnderscoreName = createDeleter([
  'attributes',
  'scientific_name',
])

export const TAXONOMY_SEARCH = buildEndpointSpec({
  operationId: 'getTaxaByName',
  pathname: '/taxon',
  responseParser: result => {
    const parsedResult = {
      ...result,
      data:
        result.data &&
        result.data.map(item => {
          return deleteScientificUnderscoreName(
            setScientificName(item, item.attributes.scientific_name)
          )
        }),
    }

    return parsedResult
  },
})
