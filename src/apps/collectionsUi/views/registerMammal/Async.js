import { createAsyncView } from 'modules/bootstrap/higherOrderComponents'

export default createAsyncView({
  modules: () => {
    return [import('modules/form'), import('modules/collectionMammals')]
  },
  name: 'RegisterMammal',
  view: () => {
    return import('./index.js')
  },
})
