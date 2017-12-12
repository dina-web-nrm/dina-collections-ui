import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Header, Grid, Segment } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { fieldNamePathFactory } from 'coreModules/form/utilities'
import { Field, Input, InputDatePart } from 'coreModules/form/components'
import { DAY, MONTH, YEAR } from 'coreModules/form/constants'
import { TaxonNameSearchInputWithResults } from 'domainModules/taxonomy/components'

const ModuleTranslate = createModuleTranslate('collectionMammals')

const buildPath = fieldNamePathFactory('identifications')

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    identifications: formValueSelector(state, 'identifications'),
  }
}

const propTypes = {
  identifications: PropTypes.arrayOf(
    PropTypes.shape({
      identifiedDay: PropTypes.number,
      identifiedMonth: PropTypes.number,
      identifiedTaxonNameStandardized: PropTypes.string,
      identifiedYear: PropTypes.number,
    })
  ).isRequired,
  taxonNameFieldKey: PropTypes.string.isRequired,
}
const defaultProps = {
  identifications: undefined,
}

const SegmentDetermination = ({ identifications, taxonNameFieldKey }) => {
  return (
    <Segment>
      <Header size="medium">
        <ModuleTranslate scope="determination" textKey="determination" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
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

        <Grid.Column computer={8} mobile={16} tablet={8}>
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

        <Grid.Row>
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
          <Grid.Column computer={2} mobile={4}>
            <Field
              autoComplete="off"
              component={InputDatePart}
              datePart={YEAR}
              label={<ModuleTranslate textKey="year" />}
              module="collectionMammals"
              name={buildPath('identifiedYear')}
              type="numberAsText"
              value={
                identifications &&
                identifications[0] &&
                identifications[0].identifiedYear
              }
            />
          </Grid.Column>
          <Grid.Column computer={2} mobile={4}>
            <Field
              autoComplete="off"
              component={InputDatePart}
              datePart={MONTH}
              label={<ModuleTranslate textKey="month" />}
              module="collectionMammals"
              name={buildPath('identifiedMonth')}
              type="numberAsText"
              value={
                identifications &&
                identifications[0] &&
                identifications[0].identifiedMonth
              }
            />
          </Grid.Column>
          <Grid.Column computer={2} mobile={4}>
            <Field
              autoComplete="off"
              component={InputDatePart}
              datePart={DAY}
              label={<ModuleTranslate textKey="day" />}
              module="collectionMammals"
              name={buildPath('identifiedDay')}
              type="numberAsText"
              value={
                identifications &&
                identifications[0] &&
                identifications[0].identifiedDay
              }
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
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
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

SegmentDetermination.propTypes = propTypes
SegmentDetermination.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(SegmentDetermination)
