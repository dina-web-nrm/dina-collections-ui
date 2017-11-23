import debounce from 'lodash.debounce'

import createLog from 'utilities/log'
import { fetchTaxonSearchResults } from './actionCreators'
import { TAXONOMY_UPDATE_SEARCH_FILTER_NAME } from './actionTypes'

const log = createLog('domainModules:taxonomy:middleware')

const debounceTaxonSearch = debounce(
  dispatch => {
    log.debug('Debounce fetchTaxonSearchResults')
    dispatch(fetchTaxonSearchResults())
  },
  500,
  {
    maxWait: 1000,
  }
)

export default function taxonomyMiddleware() {
  return ({ dispatch }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case TAXONOMY_UPDATE_SEARCH_FILTER_NAME: {
        if (action.payload) {
          debounceTaxonSearch(dispatch)
        }
        break
      }

      default:
        break
    }
    return result
  }
}
