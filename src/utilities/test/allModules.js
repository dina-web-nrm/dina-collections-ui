import * as api from 'modules/api'
import * as bootstrap from 'modules/bootstrap'
import * as commonUi from 'modules/commonUi'
import * as error from 'modules/error'
import * as external from 'modules/external'
import * as form from 'modules/form'
import * as i18n from 'modules/i18n'
import * as size from 'modules/size'
import * as user from 'modules/user'

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
