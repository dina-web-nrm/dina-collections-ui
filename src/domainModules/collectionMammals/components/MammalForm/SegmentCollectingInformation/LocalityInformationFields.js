import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Field, Input } from 'coreModules/form/components'
import { fieldNamePathFactory } from 'coreModules/form/utilities'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

import { CONTINENTS, COUNTRIES, DISTRICTS, PROVINCES } from '../../../constants'
import globalSelectors from '../../../globalSelectors'
import LocalityDropdownSearch from '../../LocalityDropdownSearch'
import updateLocalityInformationSearchQueryAC from '../../../actionCreators/updateLocalityInformationSearchQuery'

const buildModuleTextKey = textKey =>
  `modules.collectionMammals.occurrences.localityInformation.${textKey}`
const buildOccurrencePath = fieldNamePathFactory('occurrences')

const mapDispatchToProps = {
  updateLocalityInformationSearchQuery: updateLocalityInformationSearchQueryAC,
}

const propTypes = {
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  index: PropTypes.number,
  updateLocalityInformationSearchQuery: PropTypes.func.isRequired,
}
const defaultProps = {
  index: 0,
}

function LocalityInformationFields({
  i18n: { moduleTranslate },
  index,
  updateLocalityInformationSearchQuery,
}) {
  return (
    <Grid textAlign="left" verticalAlign="top">
      <Grid.Column mobile={16}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotification={{
            componentProps: {
              descriptionHeaderKey: buildModuleTextKey('localityVerbatim'),
              descriptionKey: buildModuleTextKey('helpTexts.localityVerbatim'),
            },
            type: 'HELP_TEXT',
          }}
          label={moduleTranslate({ textKey: 'localityVerbatim' })}
          module="collectionMammals"
          name={buildOccurrencePath('localityVerbatim', index)}
          type="text"
        />
      </Grid.Column>
      <Grid.Row>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'continentStandardized'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.continentStandardized'
                ),
              },
              type: 'HELP_TEXT',
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'continentStandardized' })}
            module="collectionMammals"
            name={buildOccurrencePath('continentStandardized', index)}
            options={CONTINENTS}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey('countryStandardized'),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.countryStandardized'
                ),
              },
              type: 'HELP_TEXT',
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'countryStandardized' })}
            module="collectionMammals"
            name={buildOccurrencePath('countryStandardized', index)}
            options={COUNTRIES}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'provinceStandardized'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.provinceStandardized'
                ),
              },
              type: 'HELP_TEXT',
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'provinceStandardized' })}
            module="collectionMammals"
            name={buildOccurrencePath('provinceStandardized', index)}
            options={PROVINCES}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'districtStandardized'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.districtStandardized'
                ),
              },
              type: 'HELP_TEXT',
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'districtStandardized' })}
            module="collectionMammals"
            name={buildOccurrencePath('districtStandardized', index)}
            options={DISTRICTS}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column mobile={16}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotification={{
            componentProps: {
              descriptionHeaderKey: buildModuleTextKey('localityStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.localityStandardized'
              ),
            },
            type: 'HELP_TEXT',
          }}
          label={moduleTranslate({ textKey: 'localityStandardized' })}
          module="collectionMammals"
          name={buildOccurrencePath('localityStandardized', index)}
          type="text"
        />
      </Grid.Column>
      <Grid.Column computer={8} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotification={{
            componentProps: {
              descriptionHeaderKey: buildModuleTextKey('coordinatesVerbatim'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.coordinatesVerbatim'
              ),
            },
            type: 'HELP_TEXT',
          }}
          label={moduleTranslate({ textKey: 'coordinatesVerbatim' })}
          module="collectionMammals"
          name={buildOccurrencePath('coordinatesVerbatim', index)}
          type="text"
        />
      </Grid.Column>
      <Grid.Row>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'latitudeStandardized'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.latitudeStandardized'
                ),
              },
              type: 'HELP_TEXT',
            }}
            label={moduleTranslate({ textKey: 'latitudeStandardized' })}
            module="collectionMammals"
            name={buildOccurrencePath('latitudeStandardized', index)}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'longitudeStandardized'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.longitudeStandardized'
                ),
              },
              type: 'HELP_TEXT',
            }}
            label={moduleTranslate({ textKey: 'longitudeStandardized' })}
            module="collectionMammals"
            name={buildOccurrencePath('longitudeStandardized', index)}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'coordinateUncertaintyInMeters'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.coordinateUncertaintyInMeters'
                ),
              },
              type: 'HELP_TEXT',
            }}
            label={moduleTranslate({
              textKey: 'coordinateUncertaintyInMeters',
            })}
            module="collectionMammals"
            name={buildOccurrencePath('coordinateUncertaintyInMeters', index)}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'geodeticDatumStandardized'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.geodeticDatumStandardized'
                ),
              },
              type: 'HELP_TEXT',
            }}
            label={moduleTranslate({ textKey: 'geodeticDatumStandardized' })}
            module="collectionMammals"
            name={buildOccurrencePath('geodeticDatumStandardized', index)}
            type="text"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column computer={12} mobile={16} tablet={12}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotification={{
            componentProps: {
              descriptionHeaderKey: buildModuleTextKey(
                'georeferenceSourcesText'
              ),
              descriptionKey: buildModuleTextKey(
                'helpTexts.georeferenceSourcesText'
              ),
            },
            type: 'HELP_TEXT',
          }}
          label={moduleTranslate({ textKey: 'georeferenceSourcesText' })}
          module="collectionMammals"
          name={buildOccurrencePath('georeferenceSourcesText', index)}
          type="text"
        />
      </Grid.Column>
      <Grid.Row>
        <Grid.Column computer={3} mobile={8} tablet={3}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'minimumElevationInMeters'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.minimumElevationInMeters'
                ),
              },
              type: 'HELP_TEXT',
            }}
            label={moduleTranslate({ textKey: 'minimumElevationInMeters' })}
            module="collectionMammals"
            name={buildOccurrencePath('minimumElevationInMeters', index)}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={3} mobile={8} tablet={3}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'maximumElevationInMeters'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.maximumElevationInMeters'
                ),
              },
              type: 'HELP_TEXT',
            }}
            label={moduleTranslate({ textKey: 'maximumElevationInMeters' })}
            module="collectionMammals"
            name={buildOccurrencePath('maximumElevationInMeters', index)}
            type="text"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={3} mobile={8} tablet={3}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'minimumDepthInMeters'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.minimumDepthInMeters'
                ),
              },
              type: 'HELP_TEXT',
            }}
            label={moduleTranslate({ textKey: 'minimumDepthInMeters' })}
            module="collectionMammals"
            name={buildOccurrencePath('minimumDepthInMeters', index)}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={3} mobile={8} tablet={3}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotification={{
              componentProps: {
                descriptionHeaderKey: buildModuleTextKey(
                  'maximumDepthInMeters'
                ),
                descriptionKey: buildModuleTextKey(
                  'helpTexts.maximumDepthInMeters'
                ),
              },
              type: 'HELP_TEXT',
            }}
            label={moduleTranslate({ textKey: 'maximumDepthInMeters' })}
            module="collectionMammals"
            name={buildOccurrencePath('maximumDepthInMeters', index)}
            type="text"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column mobile={16}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotification={{
            componentProps: {
              descriptionHeaderKey: buildModuleTextKey('localityRemarks'),
              descriptionKey: buildModuleTextKey('helpTexts.localityRemarks'),
            },
            type: 'HELP_TEXT',
          }}
          label={moduleTranslate({ textKey: 'localityRemarks' })}
          module="collectionMammals"
          name={buildOccurrencePath('localityRemarks', index)}
          type="text"
        />
      </Grid.Column>
    </Grid>
  )
}

LocalityInformationFields.propTypes = propTypes
LocalityInformationFields.defaultProps = defaultProps

export default compose(
  connect(undefined, mapDispatchToProps),
  withI18n({
    module: 'collectionMammals',
    scope: 'occurrences.localityInformation',
  })
)(LocalityInformationFields)
