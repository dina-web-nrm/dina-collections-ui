import {
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_FAIL,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_REQUEST,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS,
} from '../actionTypes'
import { REGISTER_MAMMAL } from '../endpoints'

export default function registerMammal(body, throwError = true) {
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_REQUEST,
    })
    return apiClient
      .httpPost(REGISTER_MAMMAL, {
        body,
      })
      .then(
        response => {
          dispatch({
            payload: response,
            type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            payload: error,
            type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_FAIL,
          })
          // for redux form
          if (throwError) {
            throw error
          }
        }
      )
  }
}
