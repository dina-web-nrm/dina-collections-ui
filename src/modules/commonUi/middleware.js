import { LOCATION_CHANGE } from 'react-router-redux'
import { closeSidebar } from './actionCreators'
import globalSelectors from './globalSelectors'

export default function commonUiMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case LOCATION_CHANGE: {
        if (globalSelectors.getSidebarIsOpen(getState())) {
          dispatch(closeSidebar())
        }

        break
      }

      default:
        break
    }
    return result
  }
}
