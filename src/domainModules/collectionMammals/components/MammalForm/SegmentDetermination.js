import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Header, Grid, Segment } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { fieldNamePathFactory } from 'coreModules/form/utilities'
import sizeSelectors from 'coreModules/size/globalSelectors'
import {
  ButtonCopyPasteField,
  Checkbox,
  Field,
  Input,
} from 'coreModules/form/components'
import { TaxonNameSearchInputWithResults } from 'domainModules/taxonomy/components'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const buildPath = fieldNamePathFactory('identifications')

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    identifications: formValueSelector(state, 'identifications'),
    isSmallScreen: sizeSelectors.getIsSmall(state),
  }
}

const propTypes = {
  changeFieldValue: PropTypes.func.isRequired,
  formValueSelector: PropTypes.func.isRequired,
  identifications: PropTypes.arrayOf(
    PropTypes.shape({
      identifiedTaxonNameStandardized: PropTypes.string,
    })
  ),
  isSmallScreen: PropTypes.bool.isRequired,
  taxonNameFieldKey: PropTypes.string.isRequired,
}
const defaultProps = {
  identifications: undefined,
}

const SegmentDetermination = ({
  changeFieldValue,
  formValueSelector,
  identifications,
  isSmallScreen,
  taxonNameFieldKey,
}) => {
  return (
    <Segment color="green">
      <Header size="medium">
        <ModuleTranslate scope="determination" textKey="determination" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column computer={2} mobile={8} tablet={2}>
            <Field
              autoComplete="off"
              component={Checkbox}
              label={
                <ModuleTranslate scope="determination" textKey="isCurrent" />
              }
              module="collectionMammals"
              name={buildPath('isCurrentIdentification')}
              type="checkbox"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={6} mobile={16} tablet={5}>
            <Field
              autoComplete="off"
              component={TaxonNameSearchInputWithResults}
              label={
                <ModuleTranslate scope="determination" textKey="taxonName" />
              }
              module="collectionMammals"
              name={taxonNameFieldKey}
              type="text"
              value={
                identifications &&
                identifications[0] &&
                identifications[0].taxonName
              }
            />
          </Grid.Column>
          <Grid.Column computer={2} mobile={8} tablet={3}>
            <ButtonCopyPasteField
              arrowIcon={`${isSmallScreen ? 'down' : 'right'} arrow`}
              changeFieldValue={changeFieldValue}
              copyField={taxonNameFieldKey}
              fluid={!isSmallScreen}
              formValueSelector={formValueSelector}
              label={
                <ModuleTranslate
                  scope="determination"
                  textKey="copyToVerbatim"
                />
              }
              pasteField={buildPath('identifiedAsVerbatim')}
            />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={Input}
              label={
                <ModuleTranslate
                  scope="determination"
                  textKey="verbatimTaxonName"
                />
              }
              module="collectionMammals"
              name={buildPath('identifiedAsVerbatim')}
              type="text"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Column computer={8} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="remarks" />}
            module="collectionMammals"
            name={buildPath('identificationRemarks')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate scope="determination" textKey="determinedBy" />
            }
            module="collectionMammals"
            name={buildPath('identifiedByAgentText')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate scope="determination" textKey="date" />}
            module="collectionMammals"
            name={buildPath('identifiedDateText')}
            type="text"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

SegmentDetermination.propTypes = propTypes
SegmentDetermination.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(SegmentDetermination)
