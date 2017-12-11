import immutable from 'object-path-immutable'
import {
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_FAIL,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_REQUEST,
  COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS,
} from '../actionTypes'
import { REGISTER_MAMMAL } from '../endpoints'

export default function registerMammal(formData, throwError = true) {
  const meta = {
    catalogNumber: formData.physicalUnits[0].catalogedUnit.catalogNumber,
    formData,
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_REQUEST,
    })

    const { catalogedUnit } = formData.physicalUnits[0]
    let attributes = formData
    attributes = immutable.set(
      attributes,
      'physicalUnits',
      formData.physicalUnits.map(physicalUnit => {
        return immutable.del(physicalUnit, 'catalogedUnit')
      })
    )

    attributes = immutable.set(
      attributes,
      'featureObservations',
      formData.featureObservations &&
        formData.featureObservations.filter(featureObservation => {
          return featureObservation.featureObservationText
        })
    )

    attributes = {
      featureObservations: [],
      identifications: [],
      occurrences: [],
      physicalUnits: [],
      ...attributes,
    }

    const body = {
      data: {
        additionalData: [
          {
            attributes: catalogedUnit,
            type: 'catalogedUnit',
          },
        ],
        attributes: {
          ...attributes,
        },
      },
    }

    return apiClient
      .call(REGISTER_MAMMAL, {
        body,
      })
      .then(
        response => {
          dispatch({
            meta,
            payload: response,
            type: COLLECTION_MAMMALS_REGISTER_NEW_MAMMAL_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            meta,
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
