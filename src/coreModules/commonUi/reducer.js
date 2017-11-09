import { createSetter } from 'utilities/stateHelper'

import { COMMON_UI_CLOSE_SIDEBAR, COMMON_UI_OPEN_SIDEBAR } from './actionTypes'

const initState = {
  sidebar: {
    isOpen: false,
  },
}

const sidebarOpenSetter = createSetter(['sidebar', 'isOpen'])

export default function reducer(state = initState, action) {
  switch (action.type) {
    case COMMON_UI_CLOSE_SIDEBAR: {
      return sidebarOpenSetter(state, false)
    }
    case COMMON_UI_OPEN_SIDEBAR: {
      return sidebarOpenSetter(state, true)
    }

    default:
      return state
  }
}
