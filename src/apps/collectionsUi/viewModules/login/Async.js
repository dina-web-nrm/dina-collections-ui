import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'

export default createAsyncView({
  modules: () => {
    return [import('coreModules/form')]
  },
  name: 'login',
  view: () => {
    return import('./index.js')
  },
})
