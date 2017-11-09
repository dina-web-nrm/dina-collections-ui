import { createSyncView } from 'coreModules/bootstrap/higherOrderComponents'
import * as view from './index'

export default createSyncView({
  name: 'app',
  view,
})
