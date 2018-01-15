import {
  BOOTSTRAP_REGISTER_MODULES,
  BOOTSTRAP_UNREGISTER_MODULES,
} from 'coreModules/bootstrap/actionTypes'
import {
  registerModuleProperty,
  unregisterModuleProperty,
} from 'coreModules/bootstrap/utilities'

import {
  NOTIFICATIONS_CREATE_NOTIFICATION,
  NOTIFICATIONS_REMOVE_NOTIFICATION,
} from './actionTypes'
import { NOTIFICATIONS, NOTIFICATIONS_REGISTER } from './constants'

const initState = {
  activeNotifications: {},
  [NOTIFICATIONS_REGISTER]: {},
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case BOOTSTRAP_REGISTER_MODULES: {
      const nextState = registerModuleProperty({
        action,
        customRegisterKey: NOTIFICATIONS_REGISTER,
        ignoreModuleNames: true,
        property: NOTIFICATIONS,
        state,
      })
      return nextState
    }

    case BOOTSTRAP_UNREGISTER_MODULES: {
      const nextState = unregisterModuleProperty({
        action,
        customRegisterKey: NOTIFICATIONS_REGISTER,
        ignoreModuleNames: true,
        property: NOTIFICATIONS,
        state,
      })
      return nextState
    }

    case NOTIFICATIONS_CREATE_NOTIFICATION: {
      const { sequentialId } = action.payload

      return {
        ...state,
        activeNotifications: {
          ...state.activeNotifications,
          [sequentialId]: action.payload,
        },
      }
    }

    case NOTIFICATIONS_REMOVE_NOTIFICATION: {
      const { sequentialId } = action.payload

      const nextState = {
        ...state,
        activeNotifications: {
          ...state.activeNotifications,
        },
      }
      delete nextState.activeNotifications[sequentialId]

      return nextState
    }

    default:
      return state
  }
}
