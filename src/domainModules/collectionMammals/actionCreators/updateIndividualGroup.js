import immutable from 'object-path-immutable'

import {
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_FAIL,
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_REQUEST,
  COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_SUCCESS,
} from '../actionTypes'
import { UPDATE_INDIVIDUAL_GROUP } from '../endpoints'
import getIndividualGroupByCatalogNumber from './getIndividualGroupByCatalogNumber'

export default function updateIndividualGroup(formData, throwError = true) {
  const meta = {
    catalogNumber: formData.physicalUnits[0].catalogedUnit.catalogNumber,
    formData,
    individualGrouId: formData.id,
  }
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_REQUEST,
    })

    let attributes = formData

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
        attributes,
      },
    }

    return apiClient
      .call(UPDATE_INDIVIDUAL_GROUP, {
        body,
        pathParams: { id: attributes.id },
      })
      .then(
        response => {
          dispatch({
            meta,
            payload: response,
            type: COLLECTION_MAMMALS_UPDATE_INDIVIDUAL_GROUP_SUCCESS,
          })
          dispatch(
            getIndividualGroupByCatalogNumber(meta.catalogNumber, {
              include: [
                'identifications',
                'featureObservations.featureObservationType',
                'occurrences',
                'physicalUnits.catalogedUnit',
              ].join(),
            })
          )
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
