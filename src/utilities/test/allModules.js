import * as api from 'coreModules/api'
import * as bootstrap from 'coreModules/bootstrap'
import * as commonUi from 'coreModules/commonUi'
import * as error from 'coreModules/error'
import * as form from 'coreModules/form'
import * as i18n from 'coreModules/i18n'
import * as size from 'coreModules/size'
import * as user from 'coreModules/user'
import * as devToolsExtension from 'coreModules/devToolsExtension'
import * as localStorage from 'coreModules/localStorage'
import * as logger from 'coreModules/logger'
import * as routing from 'coreModules/routing'

const modules = [
  api,
  bootstrap,
  commonUi,
  error,
  form,
  i18n,
  size,
  user,
  devToolsExtension,
  localStorage,
  logger,
  routing,
]

export default modules
