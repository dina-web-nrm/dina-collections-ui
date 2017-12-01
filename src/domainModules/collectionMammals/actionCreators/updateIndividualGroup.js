import {
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_FAIL,
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_REQUEST,
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_SUCCESS,
} from '../actionTypes'
import { UPDATE_INDIVIDUAL_GROUP } from '../endpoints'

export default function updateIndividualGroup(body, throwError = true) {
  const meta = {
    body,
    catalogNumber: body.physicalUnits[0].catalogedUnit.catalogNumber,
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_REQUEST,
    })
    return apiClient
      .httpPost(UPDATE_INDIVIDUAL_GROUP, {
        body,
      })
      .then(
        response => {
          dispatch({
            meta,
            payload: response,
            type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            meta,
            payload: error,
            type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_FAIL,
          })
          // for redux form
          if (throwError) {
            throw error
          }
        }
      )
  }
}
