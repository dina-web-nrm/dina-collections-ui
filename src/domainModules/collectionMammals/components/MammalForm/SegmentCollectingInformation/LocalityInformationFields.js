import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { Field, Input } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { pathBuilder } from 'coreModules/form/higherOrderComponents'

import { CONTINENTS, COUNTRIES, DISTRICTS, PROVINCES } from '../../../constants'
import globalSelectors from '../../../globalSelectors'
import LocalityDropdownSearch from '../../LocalityDropdownSearch'
import updateLocalityInformationSearchQueryAC from '../../../actionCreators/updateLocalityInformationSearchQuery'

const buildModuleTextKey = textKey =>
  `modules.collectionMammals.occurrences.localityInformation.${textKey}`

const mapDispatchToProps = {
  updateLocalityInformationSearchQuery: updateLocalityInformationSearchQueryAC,
}

const propTypes = {
  getPath: PropTypes.func.isRequired,
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
  updateLocalityInformationSearchQuery: PropTypes.func.isRequired,
}

function LocalityInformationFields({
  getPath,
  i18n: { moduleTranslate },
  updateLocalityInformationSearchQuery,
}) {
  return (
    <Grid textAlign="left" verticalAlign="top">
      <Grid.Column mobile={16}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('localityVerbatim'),
            descriptionKey: buildModuleTextKey('helpTexts.localityVerbatim'),
          }}
          label={moduleTranslate({ textKey: 'localityVerbatim' })}
          module="collectionMammals"
          name={getPath('localityVerbatim')}
          type="text"
        />
      </Grid.Column>
      <Grid.Row>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('continentStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.continentStandardized'
              ),
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'continentStandardized' })}
            module="collectionMammals"
            name={getPath('continentStandardized')}
            options={CONTINENTS}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('countryStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.countryStandardized'
              ),
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'countryStandardized' })}
            module="collectionMammals"
            name={getPath('countryStandardized')}
            options={COUNTRIES}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('provinceStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.provinceStandardized'
              ),
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'provinceStandardized' })}
            module="collectionMammals"
            name={getPath('provinceStandardized')}
            options={PROVINCES}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={LocalityDropdownSearch}
            getSearchQuery={globalSelectors.getLocalityInformationSearchQuery}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('districtStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.districtStandardized'
              ),
            }}
            initialText={moduleTranslate({ textKey: 'choose' })}
            label={moduleTranslate({ textKey: 'districtStandardized' })}
            module="collectionMammals"
            name={getPath('districtStandardized')}
            options={DISTRICTS}
            updateSearchQuery={updateLocalityInformationSearchQuery}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column mobile={16}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('localityStandardized'),
            descriptionKey: buildModuleTextKey(
              'helpTexts.localityStandardized'
            ),
          }}
          label={moduleTranslate({ textKey: 'localityStandardized' })}
          module="collectionMammals"
          name={getPath('localityStandardized')}
          type="text"
        />
      </Grid.Column>
      <Grid.Column computer={8} mobile={16} tablet={8}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('coordinatesVerbatim'),
            descriptionKey: buildModuleTextKey('helpTexts.coordinatesVerbatim'),
          }}
          label={moduleTranslate({ textKey: 'coordinatesVerbatim' })}
          module="collectionMammals"
          name={getPath('coordinatesVerbatim')}
          type="text"
        />
      </Grid.Column>
      <Grid.Row>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('latitudeStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.latitudeStandardized'
              ),
            }}
            label={moduleTranslate({ textKey: 'latitudeStandardized' })}
            module="collectionMammals"
            name={getPath('latitudeStandardized')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('longitudeStandardized'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.longitudeStandardized'
              ),
            }}
            label={moduleTranslate({ textKey: 'longitudeStandardized' })}
            module="collectionMammals"
            name={getPath('longitudeStandardized')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey(
                'coordinateUncertaintyInMeters'
              ),
              descriptionKey: buildModuleTextKey(
                'helpTexts.coordinateUncertaintyInMeters'
              ),
            }}
            label={moduleTranslate({
              textKey: 'coordinateUncertaintyInMeters',
            })}
            module="collectionMammals"
            name={getPath('coordinateUncertaintyInMeters')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey(
                'geodeticDatumStandardized'
              ),
              descriptionKey: buildModuleTextKey(
                'helpTexts.geodeticDatumStandardized'
              ),
            }}
            label={moduleTranslate({ textKey: 'geodeticDatumStandardized' })}
            module="collectionMammals"
            name={getPath('geodeticDatumStandardized')}
            type="text"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column computer={12} mobile={16} tablet={12}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('georeferenceSourcesText'),
            descriptionKey: buildModuleTextKey(
              'helpTexts.georeferenceSourcesText'
            ),
          }}
          label={moduleTranslate({ textKey: 'georeferenceSourcesText' })}
          module="collectionMammals"
          name={getPath('georeferenceSourcesText')}
          type="text"
        />
      </Grid.Column>
      <Grid.Row>
        <Grid.Column computer={3} mobile={8} tablet={3}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey(
                'minimumElevationInMeters'
              ),
              descriptionKey: buildModuleTextKey(
                'helpTexts.minimumElevationInMeters'
              ),
            }}
            label={moduleTranslate({ textKey: 'minimumElevationInMeters' })}
            module="collectionMammals"
            name={getPath('minimumElevationInMeters')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={3} mobile={8} tablet={3}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey(
                'maximumElevationInMeters'
              ),
              descriptionKey: buildModuleTextKey(
                'helpTexts.maximumElevationInMeters'
              ),
            }}
            label={moduleTranslate({ textKey: 'maximumElevationInMeters' })}
            module="collectionMammals"
            name={getPath('maximumElevationInMeters')}
            type="text"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column computer={3} mobile={8} tablet={3}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('minimumDepthInMeters'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.minimumDepthInMeters'
              ),
            }}
            label={moduleTranslate({ textKey: 'minimumDepthInMeters' })}
            module="collectionMammals"
            name={getPath('minimumDepthInMeters')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={3} mobile={8} tablet={3}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey('maximumDepthInMeters'),
              descriptionKey: buildModuleTextKey(
                'helpTexts.maximumDepthInMeters'
              ),
            }}
            label={moduleTranslate({ textKey: 'maximumDepthInMeters' })}
            module="collectionMammals"
            name={getPath('maximumDepthInMeters')}
            type="text"
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column mobile={16}>
        <Field
          autoComplete="off"
          component={Input}
          helpNotificationProps={{
            descriptionHeaderKey: buildModuleTextKey('localityRemarks'),
            descriptionKey: buildModuleTextKey('helpTexts.localityRemarks'),
          }}
          label={moduleTranslate({ textKey: 'localityRemarks' })}
          module="collectionMammals"
          name={getPath('localityRemarks')}
          type="text"
        />
      </Grid.Column>
    </Grid>
  )
}

LocalityInformationFields.propTypes = propTypes

export default compose(
  connect(undefined, mapDispatchToProps),
  withI18n({
    module: 'collectionMammals',
    scope: 'occurrences.localityInformation',
  }),
  pathBuilder({ name: 'localityInformation' })
)(LocalityInformationFields)
