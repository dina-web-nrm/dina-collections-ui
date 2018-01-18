import { Modal } from 'coreModules/notifications/components'
import { FIXED } from 'coreModules/notifications/constants'

const fieldHelpTextDefaults = {
  component: Modal,
  displayType: FIXED,
  priority: 10,
}

const HELP_TEXT = {
  ...fieldHelpTextDefaults,
}

export { HELP_TEXT }
