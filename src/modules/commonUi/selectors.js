import { createGetter } from 'utilities/stateHelper'

const sidebarOpenGetter = createGetter(['sidebar', 'isOpen'])

export const getLocalState = state => state.commonUi

export const getSidebarIsOpen = state => sidebarOpenGetter(state)
export const getSidebarIsClosed = state => !sidebarOpenGetter(state)
