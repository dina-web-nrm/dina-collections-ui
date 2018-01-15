import * as actionCreators from './actionCreators'
import * as actionTypes from './actionTypes'
import * as components from './components'
import * as constants from './constants'
import * as endpoints from './endpoints'
import * as notifications from './notifications'
import * as selectors from './selectors'
import globalSelectors from './globalSelectors'
import reducer from './reducer'
import translations from './translations.json'

const name = constants.MODULE_NAME

export {
  actionCreators,
  actionTypes,
  components,
  constants,
  endpoints,
  globalSelectors,
  name,
  notifications,
  reducer,
  selectors,
  translations,
}
