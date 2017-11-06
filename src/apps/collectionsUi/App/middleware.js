import Dependor from 'utilities/Dependor'
import { push } from 'react-router-redux'

import { KEYBOARD_SHORTCUTS_TRIGGER } from 'modules/keyboardShortcuts/actionTypes'
import {
  navigateToAbout,
  navigateToHome,
  navigateToSettings,
} from './shortcuts'

export const dep = new Dependor({
  push,
})

export default function createKeyboardShortcuts() {
  const routingShortcutCodes = {
    [navigateToAbout.code]: navigateToAbout,
    [navigateToHome.code]: navigateToHome,
    [navigateToSettings.code]: navigateToSettings,
  }
  return ({ dispatch }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case KEYBOARD_SHORTCUTS_TRIGGER: {
        const navigateShortcut = routingShortcutCodes[action.payload.code]
        if (navigateShortcut) {
          dispatch(dep.push(action.payload.path))
        }
        break
      }

      default:
        break
    }
    return result
  }
}
