import * as api from 'coreModules/api'
import * as bootstrap from 'coreModules/bootstrap'
import * as commonUi from 'coreModules/commonUi'
import * as error from 'coreModules/error'
import * as external from 'coreModules/external'
import * as form from 'coreModules/form'
import * as i18n from 'coreModules/i18n'
import * as size from 'coreModules/size'
import * as user from 'coreModules/user'

const externalArray = Object.keys(external).map(key => {
  return external[key]
})

const modules = [
  api,
  bootstrap,
  commonUi,
  error,
  form,
  i18n,
  size,
  user,
  ...externalArray,
]

export default modules
