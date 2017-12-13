import { createSetter } from 'utilities/stateHelper'

import {
  COMMON_UI_CLOSE_SIDEBAR,
  COMMON_UI_HIDE_FIXED_MENU,
  COMMON_UI_OPEN_SIDEBAR,
  COMMON_UI_SHOW_FIXED_MENU,
} from './actionTypes'

const initState = {
  fixedMenu: {
    isVisible: true,
  },
  sidebar: {
    isOpen: false,
  },
}

const fixedMenuVisibleSetter = createSetter(['fixedMenu', 'isVisible'])
const sidebarOpenSetter = createSetter(['sidebar', 'isOpen'])

export default function reducer(state = initState, action) {
  switch (action.type) {
    case COMMON_UI_HIDE_FIXED_MENU: {
      return fixedMenuVisibleSetter(state, false)
    }
    case COMMON_UI_CLOSE_SIDEBAR: {
      return sidebarOpenSetter(state, false)
    }
    case COMMON_UI_SHOW_FIXED_MENU: {
      return fixedMenuVisibleSetter(state, true)
    }
    case COMMON_UI_OPEN_SIDEBAR: {
      return sidebarOpenSetter(state, true)
    }

    default:
      return state
  }
}
