import React from 'react'
import { Header, Grid, Segment } from 'semantic-ui-react'
import { Field } from 'redux-form'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Input } from 'coreModules/form/components'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'physicalUnit',
})

export const buildPath = name => {
  return `physicalUnits[0].${name}`
}

export default () => {
  return (
    <Segment>
      <Header size="medium">
        <ModuleTranslate textKey="physicalObjects" />
      </Header>
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="physicalUnitText" />}
            module="collectionMammals"
            name={buildPath('physicalUnitText')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="normalStorageLocation" />}
            module="collectionMammals"
            name={buildPath('normalStorageLocation')}
            type="text"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
