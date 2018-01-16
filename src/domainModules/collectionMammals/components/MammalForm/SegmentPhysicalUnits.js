import React from 'react'
import { Header, Grid, Segment } from 'semantic-ui-react'
import { Field } from 'redux-form'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Input } from 'coreModules/form/components'
import { fieldNamePathFactory } from 'coreModules/form/utilities'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'physicalUnit',
})

const buildPath = fieldNamePathFactory('physicalUnits')

export default () => {
  return (
    <Segment color="green">
      <Header size="medium">
        <ModuleTranslate textKey="physicalObjects" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="physicalUnits"
                textKey="physicalUnitText"
              />
            }
            module="collectionMammals"
            name={buildPath('physicalUnitText')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="physicalUnits"
                textKey="normalStorageLocationText"
              />
            }
            module="collectionMammals"
            name={buildPath('normalStorageLocationText')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate
                scope="physicalUnits"
                textKey="alternateIdentifiersText"
              />
            }
            module="collectionMammals"
            name={buildPath('alternateIdentifiersText')}
            type="text"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
