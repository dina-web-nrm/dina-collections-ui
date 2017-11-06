import { BOOTSTRAP_REGISTER_MODULES } from '../bootstrap/actionTypes'

const initState = {
  endpoints: {},
}

export default function reducer(state = initState, action) {
  switch (action.type) {
    case BOOTSTRAP_REGISTER_MODULES: {
      if (
        action.payload &&
        action.payload.modules &&
        action.payload.modules.api
      ) {
        const apiConfig =
          action.payload && action.payload && action.payload.config.api
        if (!apiConfig) {
          return state
        }

        return {
          ...state,
          endpoints: apiConfig.endpoints,
        }
      }
      return state
    }

    default:
      return state
  }
}
