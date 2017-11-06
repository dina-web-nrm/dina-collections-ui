import { actionCreators as localStorageAC } from 'redux-module-local-storage'
import { KEYBOARD_SHORTCUTS_TRIGGER } from 'modules/keyboardShortcuts/actionTypes'
import { BOOTSTRAP_BOOTSTRAP_APPLICATION } from '../bootstrap/actionTypes'
import { setLanguage } from '../i18n/actionCreators'

import { logout as logoutShortcut } from './shortcuts'

import {
  USER_GET_USER_FAIL,
  USER_GET_USER_PREFERENCES_SUCCESS,
  USER_GET_USER_SUCCESS,
  USER_LOG_IN_SUCCESS,
} from './actionTypes'
import { AUTH_TOKEN_KEY } from './constants'
import globalSelectors from './globalSelectors'
import { getUserPreferences, getUser, logout } from './actionCreators'

const { getAuthToken } = globalSelectors
const { getUserPreferencesLanguage } = globalSelectors

export default function userMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const result = next(action)
    switch (action.type) {
      case USER_LOG_IN_SUCCESS: {
        dispatch(localStorageAC.setItem(AUTH_TOKEN_KEY, action.payload))
        dispatch(getUser())
        break
      }

      case USER_GET_USER_SUCCESS: {
        dispatch(getUserPreferences())
        break
      }

      case USER_GET_USER_FAIL: {
        dispatch(logout())
        break
      }
      // might make sense to move this to the app level
      case USER_GET_USER_PREFERENCES_SUCCESS: {
        const preferedLanguage = getUserPreferencesLanguage(getState())
        if (preferedLanguage) {
          dispatch(setLanguage(preferedLanguage))
        }

        break
      }

      case BOOTSTRAP_BOOTSTRAP_APPLICATION: {
        const authToken = getAuthToken(getState())
        if (authToken) {
          dispatch(getUser())
        } else {
          dispatch(logout())
        }

        break
      }
      // inject this action instead
      case KEYBOARD_SHORTCUTS_TRIGGER: {
        if (action.payload.code === logoutShortcut.code) {
          dispatch(logout())
        }
        break
      }
      default:
        break
    }
    return result
  }
}
