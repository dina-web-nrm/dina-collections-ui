import { createAsyncView } from 'modules/bootstrap/higherOrderComponents'

export default createAsyncView({
  name: 'about',
  view: () => {
    return import('./index.js')
  },
})
