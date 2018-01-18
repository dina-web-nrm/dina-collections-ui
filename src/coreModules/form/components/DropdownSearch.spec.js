/* eslint-disable no-console */
import React from 'react'
import setupTestComponent from 'utilities/test/setupTestComponent'
import DropdownSearch from './DropdownSearch'

let counter = 1
const getUniqueValue = (asNumber = false) => {
  counter += 1

  return asNumber ? counter : String(counter)
}
const optionFactory = (value = getUniqueValue()) => {
  return { key: value, text: value, value }
}
const emptyFunction = () => {}

describe('domainModules/collectionMammals/components/MammalForm', () => {
  it('renders without crashing', () => {
    setupTestComponent({
      component: (
        <DropdownSearch
          input={{ name: 'name' }}
          meta={{ touched: false }}
          onChange={emptyFunction}
          onSearchChange={emptyFunction}
          options={[optionFactory()]}
        />
      ),
      mount: true,
    })
  })

  it('Submit fail when catalog number not provided', () => {
    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: (
        <DropdownSearch
          input={{ name: 'name' }}
          meta={{ touched: false }}
          onChange={emptyFunction}
          onSearchChange={emptyFunction}
          options={[optionFactory('ABC'), optionFactory('BCD')]}
        />
      ),
      fullExport: true,
      mount: true,
    })

    console.log(mountedComponent.debug())
    const Dropdown = mountedComponent.find('Dropdown')
    Dropdown.simulate('click')
    expect(mountedComponent.contains(['ABC', 'BCD'])).toBe(true)
  })

  // it('Submit success when catalog number provided', () => {
  //   const handleFormSubmit = data => {
  //     return Promise.resolve(data)
  //   }
  //   const { store, rootComponent: mountedComponent } = setupTestComponent({
  //     component: <MammalForm handleFormSubmit={handleFormSubmit} />,
  //     fullExport: true,
  //     mount: true,
  //   })

  //   const form = mountedComponent.find('form')
  //   const catalogedNumberInput = form
  //     .find({
  //       name: 'physicalUnits[0].catalogedUnit.catalogNumber',
  //     })
  //     .hostNodes()

  //   catalogedNumberInput.simulate('change', { target: { value: 'xxxxxx' } })

  //   form.simulate('submit')

  //   expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  // })

  // it('Submit success when loaded with existing individual group', () => {
  //   const handleFormSubmit = data => {
  //     return Promise.resolve(data)
  //   }

  //   const individualGroup = {
  //     attributes: {
  //       featureObservations: [
  //         {
  //           featureObservationText: 'female',
  //           featureObservationType: {
  //             featureObservationTypeName: 'sex',
  //             id: 1,
  //           },
  //         },
  //       ],
  //       identifications: [
  //         {
  //           identificationText: 'Water opossum',
  //           identifiedByAgentText: 'Doe, J.',
  //           identifiedTaxonNameStandardized: 'Chironectes minimus',
  //         },
  //       ],
  //       occurrences: [
  //         {
  //           id: 1,
  //           localityText: 'Hemsö',
  //         },
  //       ],
  //       physicalUnits: [
  //         {
  //           catalogedUnit: {
  //             catalogNumber: '444444',
  //           },
  //         },
  //       ],
  //     },
  //     id: 2,
  //     type: 'individualGroup',
  //   }

  //   const { rootComponent: mountedComponent, store } = setupTestComponent({
  //     component: (
  //       <MammalForm
  //         handleFormSubmit={handleFormSubmit}
  //         individualGroupAttributes={individualGroup.attributes}
  //         individualGroupId={2}
  //         transformOutputForUpdate
  //       />
  //     ),
  //     fullExport: true,
  //     mount: true,
  //   })

  //   const form = mountedComponent.find('form')
  //   const catalogedNumberInput = form
  //     .find({
  //       name: 'physicalUnits[0].catalogedUnit.catalogNumber',
  //     })
  //     .hostNodes()

  //   expect(catalogedNumberInput.props().value).toBe('444444')
  //   form.simulate('submit')

  //   expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  // })
})
