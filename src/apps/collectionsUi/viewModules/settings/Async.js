import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'

export default createAsyncView({
  name: 'settings',
  view: () => {
    return import('./index.js')
  },
})
