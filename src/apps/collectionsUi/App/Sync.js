import { createSyncView } from 'modules/bootstrap/higherOrderComponents'
import * as view from './index'

export default createSyncView({
  name: 'app',
  view,
})
