import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'

export default createAsyncView({
  name: 'home',
  view: () => {
    return import('./index.js')
  },
})
