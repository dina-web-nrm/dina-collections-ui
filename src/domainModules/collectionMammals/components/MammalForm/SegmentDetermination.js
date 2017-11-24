import React from 'react'
import PropTypes from 'prop-types'
import { Header, Grid, Segment } from 'semantic-ui-react'
import { Field } from 'redux-form'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Checkbox, Input } from 'coreModules/form/components'
import { TaxonNameSearchInputWithResults } from 'domainModules/taxonomy/components'

const ModuleTranslate = createModuleTranslate('collectionMammals')

export const buildPath = name => {
  return `identifications[0].${name}`
}

const propTypes = {
  taxonName: PropTypes.string.isRequired,
  taxonNameFieldKey: PropTypes.string.isRequired,
}

const SegmentDetermination = ({ taxonName, taxonNameFieldKey }) => {
  return (
    <Segment>
      <Header size="medium">
        <ModuleTranslate scope="determination" textKey="determination" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="determination"
                textKey="identificationText"
              />
            }
            module="collectionMammals"
            name={buildPath('identificationText')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={TaxonNameSearchInputWithResults}
            label={
              <ModuleTranslate scope="determination" textKey="taxonName" />
            }
            module="collectionMammals"
            name={buildPath(taxonNameFieldKey)}
            taxonName={taxonName}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
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
            component={Input}
            label={<ModuleTranslate textKey="remarks" />}
            module="collectionMammals"
            name={buildPath('identificationRemarks')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16} tablet={8}>
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
        <Grid.Column computer={3} mobile={16}>
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
        <Grid.Row>
          <Grid.Column computer={5} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={<ModuleTranslate textKey="year" />}
              module="collectionMammals"
              name={buildPath('identifiedYear')}
              type="text"
            />
          </Grid.Column>
          <Grid.Column computer={5} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={<ModuleTranslate textKey="month" />}
              module="collectionMammals"
              name={buildPath('identifiedMonth')}
              type="text"
            />
          </Grid.Column>

          <Grid.Column computer={5} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={<ModuleTranslate textKey="day" />}
              module="collectionMammals"
              name={buildPath('identifiedDay')}
              type="text"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

SegmentDetermination.propTypes = propTypes

export default SegmentDetermination
