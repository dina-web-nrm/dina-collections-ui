import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'

export default createAsyncView({
  modules: () => {
    return [import('domainModules/collectionMammals')]
  },
  name: 'LookupMammals',
  view: () => {
    return import('./index.js')
  },
})
