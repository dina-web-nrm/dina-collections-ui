import { buildEndpointSpec } from 'coreModules/api/endpointSpecFactory'

export const TAXONOMY_SEARCH = buildEndpointSpec({
  operationId: 'getTaxonomySearchResults',
  pathname: '/taxon/',
})
