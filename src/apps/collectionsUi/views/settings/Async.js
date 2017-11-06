import { createAsyncView } from 'modules/bootstrap/higherOrderComponents'

export default createAsyncView({
  name: 'settings',
  view: () => {
    return import('./index.js')
  },
})
