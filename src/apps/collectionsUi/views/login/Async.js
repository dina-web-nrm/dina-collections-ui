import { createAsyncView } from 'modules/bootstrap/higherOrderComponents'

export default createAsyncView({
  modules: () => {
    return [import('modules/form')]
  },
  name: 'login',
  view: () => {
    return import('./index.js')
  },
})
