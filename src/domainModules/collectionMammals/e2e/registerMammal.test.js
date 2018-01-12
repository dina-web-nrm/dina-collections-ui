/* eslint-disable no-console */
import React from 'react'
import { actionCreators } from 'domainModules/collectionMammals'
import MammalForm from 'domainModules/collectionMammals/components/MammalForm'
import setupTestComponent from 'utilities/test/setupTestComponent'

describe('domainModules/collectionMammals/e2e/registerMammal', () => {
  it('Submit success and valid api call is made when cataloged number provided', done => {
    let store

    const handleFormSubmit = formOutput => {
      store
        .dispatch(actionCreators.registerMammal(formOutput))
        .then(response => {
          expect(response.data).toBeTruthy()
          done()
        })
        .catch(err => {
          console.log('Error that will result in a timeout', err)
        })
      return Promise.resolve(formOutput)
    }

    const component = <MammalForm handleFormSubmit={handleFormSubmit} />

    const {
      store: bootstrapedStore,
      rootComponent: mountedComponent,
    } = setupTestComponent({
      component,
      fullExport: true,
      mount: true,
    })

    store = bootstrapedStore

    const form = mountedComponent.find('form')
    const catalogedNumberInput = form
      .find({
        name: 'physicalUnits[0].catalogedUnit.catalogNumber',
      })
      .hostNodes()

    catalogedNumberInput.simulate('change', { target: { value: 'xxxxxx' } })

    form.simulate('submit')

    expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  })
})
