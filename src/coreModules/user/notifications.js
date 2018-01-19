import { Flash } from 'coreModules/notifications/components'
import { FIXED } from 'coreModules/notifications/constants'

const LOG_IN_SUCCESS = {
  component: Flash,
  componentProps: {
    headerKey: 'modules.user.welcomeBack',
  },
  displayType: FIXED,
  priority: 10,
  ttl: 3000,
  type: 'LOG_IN_SUCCESS',
}

export { LOG_IN_SUCCESS }
