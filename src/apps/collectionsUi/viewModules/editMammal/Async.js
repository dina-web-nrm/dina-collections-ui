import { createAsyncView } from 'coreModules/bootstrap/higherOrderComponents'

export default createAsyncView({
  modules: () => {
    return [
      import('coreModules/form'),
      import('domainModules/collectionMammals'),
    ]
  },
  name: 'EditMammal',
  view: () => {
    return import('./index.js')
  },
})
