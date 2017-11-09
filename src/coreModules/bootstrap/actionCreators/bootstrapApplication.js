import { BOOTSTRAP_BOOTSTRAP_APPLICATION } from '../actionTypes'

export default function bootstrapApplication(config) {
  return {
    // wrapping config in object to have same shape as registerModules
    payload: { config },
    type: BOOTSTRAP_BOOTSTRAP_APPLICATION,
  }
}
