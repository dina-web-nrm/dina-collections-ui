import { LOCATION_CHANGE } from 'react-router-redux'
import { SIZE_SET_BREAKPOINT } from 'coreModules/size/actionTypes'
import { COLLISION_REPLACE, INLINE } from 'coreModules/notifications/constants'
import HelpTextNotification from '../components/HelpTextNotification'

const fieldHelpTextDefaults = {
  collision: COLLISION_REPLACE,
  component: HelpTextNotification,
  displayType: INLINE,
  priority: 10,
  terminateActions: [LOCATION_CHANGE, SIZE_SET_BREAKPOINT],
  type: 'HELP_TEXT',
}

const HELP_TEXT = {
  ...fieldHelpTextDefaults,
}

export { HELP_TEXT }
