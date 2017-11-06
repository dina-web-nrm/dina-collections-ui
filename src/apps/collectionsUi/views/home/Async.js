import { createAsyncView } from 'modules/bootstrap/higherOrderComponents'

export default createAsyncView({
  name: 'home',
  view: () => {
    return import('./index.js')
  },
})
