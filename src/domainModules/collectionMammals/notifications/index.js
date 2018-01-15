import { Modal } from 'coreModules/notifications/components'
import { FIXED } from 'coreModules/notifications/constants'

const buildModuleTextKey = textKey => `modules.collectionMammals.${textKey}`

const fieldHelpTextDefaults = {
  component: Modal,
  displayType: FIXED,
  priority: 10,
}

const HELP_TEXT_CATALOG_NUMBER = {
  ...fieldHelpTextDefaults,
  componentProps: {
    descriptionHeaderKey: buildModuleTextKey('catalogedUnit.catalogNumber'),
    descriptionKey: buildModuleTextKey('catalogedUnit.sixOrEightDigits'),
    linkTextKey: buildModuleTextKey('seeDataModelDocs'),
    linkTo: '/docs/0.1.0/models/catalogedUnit/catalogNumber',
    size: 'mini',
  },
}

export { HELP_TEXT_CATALOG_NUMBER }
