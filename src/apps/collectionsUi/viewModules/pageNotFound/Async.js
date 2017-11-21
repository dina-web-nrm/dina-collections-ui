import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'
import { name } from './index'

export default createAsyncView({
  name,
  view: () => {
    return import('./index.js')
  },
})
