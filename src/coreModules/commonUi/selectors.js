import { createGetter } from 'utilities/stateHelper'

const sidebarOpenGetter = createGetter(['sidebar', 'isOpen'])
const fixedMenuVisibleGetter = createGetter(['fixedMenu', 'isVisible'])

export const getLocalState = state => state.commonUi

export const getFixedMenuIsVisible = state => fixedMenuVisibleGetter(state)
export const getSidebarIsOpen = state => sidebarOpenGetter(state)
export const getSidebarIsClosed = state => !sidebarOpenGetter(state)
