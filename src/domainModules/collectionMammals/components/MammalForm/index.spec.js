/* eslint-disable no-console */
import React from 'react'
import setupTestComponent from 'utilities/test/setupTestComponent'
import simulateFormFieldChanges from 'utilities/test/simulateFormFieldChanges'
import MammalForm from 'domainModules/collectionMammals/components/MammalForm'
import transformOutput from './transformations/output'

describe('domainModules/collectionMammals/components/MammalForm', () => {
  let handleFormSubmit
  beforeEach(() => {
    handleFormSubmit = data => {
      return Promise.resolve(data)
    }
  })

  it('renders without crashing', () => {
    setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      mount: true,
    })
  })

  it('Is initialized in form state', () => {
    const { store } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    expect(store.getState().form.mammalForm).toBeTruthy()
  })

  it('Submit fail when catalog number not provided', () => {
    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    expect(store.getState().form.mammalForm).toBeTruthy()

    expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)

    const form = mountedComponent.find('form')
    form.simulate('submit')

    expect(store.getState().form.mammalForm.submitFailed).toBe(true)
  })

  it('Submit success when catalog number provided', () => {
    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    const form = mountedComponent.find('form')
    simulateFormFieldChanges(form, [
      {
        name: 'physicalUnits[0].catalogedUnit.catalogNumber',
        value: 'xxxxxx',
      },
    ])
    form.simulate('submit')
    expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  })

  it('Submit success when all fields set', () => {
    const mutations = [
      {
        name: 'physicalUnits[0].catalogedUnit.catalogNumber',
        value: '584028',
      },
      {
        name: 'physicalUnits[0].catalogedUnit.storedUnderTaxonName',
        value: 'Sorex minutus',
      },
      {
        name: 'physicalUnits[0].catalogedUnit.publishRecord',
        value: true,
      },
      // Determination
      {
        name: 'identifications[0].isCurrentIdentification',
        value: true,
      },

      {
        name: 'identifications[0].identifiedTaxonNameStandardized',
        value: 'Chironectes minimus',
      },
      {
        name: 'identifications[0].identifiedAsVerbatim',
        value: 'Sorex minutus',
      },
      {
        name: 'identifications[0].identificationRemarks',
        value: 'some remarks',
      },
      {
        name: 'identifications[0].identifiedByAgentText',
        value: 'Doe, J.',
      },
      {
        name: 'identifications[0].identifiedDateText',
        value: 'Date text',
      },
      {
        name: 'occurrences[0].localityInformation.localityVerbatim',
        value: 'Some localityVerbatim text',
      },
      {
        name: 'occurrences[0].localityInformation.continentStandardized',
        value: 'Europe',
      },
      {
        name: 'occurrences[0].localityInformation.countryStandardized',
        value: 'Sweden',
      },
      {
        name: 'occurrences[0].localityInformation.provinceStandardized',
        value: 'Stockholm',
      },
      {
        name: 'occurrences[0].localityInformation.districtStandardized',
        value: 'Vasastan',
      },
      {
        name: 'occurrences[0].localityInformation.localityStandardized',
        value: 'Vasastan',
      },
      {
        name: 'occurrences[0].localityInformation.coordinatesVerbatim',
        value: 'coord-string',
      },
      {
        name: 'occurrences[0].localityInformation.latitudeStandardized',
        value: 'latitude-string',
      },
      {
        name: 'occurrences[0].localityInformation.longitudeStandardized',
        value: 'longitude-string',
      },
      {
        name:
          'occurrences[0].localityInformation.coordinateUncertaintyInMeters',
        value: '10',
      },

      {
        name: 'occurrences[0].localityInformation.geodeticDatumStandardized',
        value: 'geodeticDatumStandardized text',
      },
      {
        name: 'occurrences[0].localityInformation.georeferenceSourcesText',
        value: 'georeferenceSourcesText text',
      },
      {
        name: 'occurrences[0].localityInformation.minimumElevationInMeters',
        value: '20',
      },
      {
        name: 'occurrences[0].localityInformation.maximumElevationInMeters',
        value: '100',
      },
      {
        name: 'occurrences[0].localityInformation.minimumDepthInMeters',
        value: '20',
      },
      {
        name: 'occurrences[0].localityInformation.maximumDepthInMeters',
        value: '100',
      },
      {
        name: 'occurrences[0].localityInformation.localityRemarks',
        value: 'localityRemarks text',
      },

      // Collecting information
      {
        name: 'occurrences[0].collectorsText',
        value: 'Bergström, U',
      },
      {
        name: 'occurrences[0].expeditionText',
        value: 'Vega Expedition',
      },
      {
        name: 'occurrences[0].yearStart',
        value: '1986',
      },
      {
        name: 'occurrences[0].monthStart',
        value: '1',
      },
      {
        name: 'occurrences[0].dayStart',
        value: '15',
      },
      {
        name: 'occurrences[0].occurrenceDateText',
        value: '15 jan 1986',
      },
      {
        name: 'occurrences[0].isDeathEvent',
        value: true,
      },
      {
        name: 'causeOfDeathStandardized',
        value: 'Standardized death cause',
      },
      {
        name: 'causeOfDeathText',
        value: 'Cause of death ',
      },
      {
        name: 'featureObservations[0].featureObservationText',
        value: 'A condition at collecting',
      },
      {
        name: 'originStandardized',
        value: 'Standardized origin',
      },
      {
        name: 'occurrences[0].localityText',
        value: 'localityText',
      },
      {
        name: 'occurrences[0].establishmentMeansStandardized',
        value: 'establishmentMeansStandardized',
      },
      {
        name: 'physicalUnits[0].physicalUnitText',
        value: 'physicalUnitText',
      },
      {
        name: 'physicalUnits[0].normalStorageLocationText',
        value: 'normalStorageLocationText',
      },
      {
        name: 'physicalUnits[0].alternateIdentifiersText',
        value: 'alternateIdentifiersText',
      },
      {
        id: 'add-feature-observation',
        interaction: 'click',
      },
      {
        name:
          'featureObservations[1].featureObservationType.featureObservationTypeName',
        selector: ({ form, name }) => {
          const first = form.find({ name })
          return first.find('input').hostNodes()
        },
        value: 'sex',
      },
      {
        name: 'featureObservations[1].featureObservationText',
        value: 'male',
      },
      {
        name: 'featureObservations[1].methodText',
        value: 'method text',
      },
      {
        name: 'featureObservations[1].featureObservationAgent',
        value: 'JD',
      },
      {
        name: 'featureObservations[1].featureObservationDate',
        value: 'A date',
      },
    ]

    const expectedOutput = {
      catalogedUnit: {
        catalogNumber: '584028',
        publishRecord: true,
        storedUnderTaxonName: 'Sorex minutus',
      },
      individualGroup: {
        causeOfDeathStandardized: 'Standardized death cause',
        causeOfDeathText: 'Cause of death ',
        featureObservations: [
          {
            featureObservationText: 'A condition at collecting',
            featureObservationType: {
              featureObservationTypeName: 'conditionAtCollecting',
            },
          },
          {
            featureObservationAgent: 'JD',
            featureObservationDate: 'A date',
            featureObservationText: 'male',
            // TODO - fix after FeatureTypeNameDropdown is tested
            // This should be set but is not atm
            // featureObservationType: {
            //   featureObservationTypeName: 'sex',
            // },
            methodText: 'method text',
          },
        ],
        identifications: [
          {
            identificationRemarks: 'some remarks',
            identifiedAsVerbatim: 'Sorex minutus',
            identifiedByAgentText: 'Doe, J.',
            identifiedDateText: 'Date text',
            isCurrentIdentification: true,
          },
        ],
        occurrences: [
          {
            collectorsText: 'Bergström, U',
            dayEnd: 15,
            dayStart: 15,
            establishmentMeansStandardized: 'establishmentMeansStandardized',
            expeditionText: 'Vega Expedition',
            isDeathEvent: true,
            localityInformation: {
              coordinatesVerbatim: 'coord-string',
              coordinateUncertaintyInMeters: '10',
              geodeticDatumStandardized: 'geodeticDatumStandardized text',
              georeferenceSourcesText: 'georeferenceSourcesText text',
              latitudeStandardized: 'latitude-string',
              localityRemarks: 'localityRemarks text',
              localityStandardized: 'Vasastan',
              localityVerbatim: 'Some localityVerbatim text',
              longitudeStandardized: 'longitude-string',
              maximumDepthInMeters: '100',
              maximumElevationInMeters: '100',
              minimumDepthInMeters: '20',
              minimumElevationInMeters: '20',
            },
            localityText: 'localityText',
            monthEnd: 1,
            monthStart: 1,
            occurrenceDateText: '15 jan 1986',
            yearEnd: 1986,
            yearStart: 1986,
          },
        ],
        originStandardized: 'Standardized origin',
        physicalUnits: [
          {
            alternateIdentifiersText: 'alternateIdentifiersText',
            catalogedUnit: {
              catalogNumber: '584028',
              publishRecord: true,
              storedUnderTaxonName: 'Sorex minutus',
            },
            normalStorageLocationText: 'normalStorageLocationText',
            physicalUnitText: 'physicalUnitText',
          },
        ],
      },
    }

    const { store, rootComponent: mountedComponent } = setupTestComponent({
      component: <MammalForm handleFormSubmit={handleFormSubmit} />,
      fullExport: true,
      mount: true,
    })

    const form = mountedComponent.find('form')
    simulateFormFieldChanges(mountedComponent, mutations)

    form.simulate('submit')

    const formState = store.getState().form.mammalForm
    const { registeredFields, submitFailed, syncErrors, values } = formState

    expect(
      mutations.map(mutation => mutation.name).filter(name => !!name)
    ).toMatchObject(Object.keys(registeredFields))

    expect(transformOutput(values)).toEqual(expectedOutput)
    expect(syncErrors).toBe(undefined)
    expect(submitFailed).toBe(undefined)
  })

  it('Submit success when loaded with existing individual group', () => {
    const individualGroup = {
      attributes: {
        featureObservations: [
          {
            featureObservationText: 'female',
            featureObservationType: {
              featureObservationTypeName: 'sex',
              id: 1,
            },
          },
        ],
        identifications: [
          {
            identificationText: 'Water opossum',
            identifiedByAgentText: 'Doe, J.',
            identifiedTaxonNameStandardized: 'Chironectes minimus',
          },
        ],
        occurrences: [
          {
            id: 1,
            localityText: 'Hemsö',
          },
        ],
        physicalUnits: [
          {
            catalogedUnit: {
              catalogNumber: '444444',
            },
          },
        ],
      },
      id: 2,
      type: 'individualGroup',
    }

    const { rootComponent: mountedComponent, store } = setupTestComponent({
      component: (
        <MammalForm
          handleFormSubmit={handleFormSubmit}
          individualGroupAttributes={individualGroup.attributes}
          individualGroupId={2}
          transformOutputForUpdate
        />
      ),
      fullExport: true,
      mount: true,
    })

    const form = mountedComponent.find('form')
    const catalogedNumberInput = form
      .find({
        name: 'physicalUnits[0].catalogedUnit.catalogNumber',
      })
      .hostNodes()

    expect(catalogedNumberInput.props().value).toBe('444444')
    form.simulate('submit')

    expect(store.getState().form.mammalForm.submitFailed).toBe(undefined)
  })
})
