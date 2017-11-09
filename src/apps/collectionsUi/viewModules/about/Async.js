import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'

export default createAsyncView({
  name: 'about',
  view: () => {
    return import('./index.js')
  },
})
