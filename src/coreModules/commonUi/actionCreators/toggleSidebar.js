import openSidebar from './openSidebar'
import closeSidebar from './closeSidebar'
import globalSelectors from '../globalSelectors'

export default function toggeSidebar() {
  return (dispatch, getState) => {
    const sidebarIsOpen = globalSelectors.getSidebarIsOpen(getState())
    if (sidebarIsOpen) {
      return dispatch(closeSidebar())
    }
    return dispatch(openSidebar())
  }
}
