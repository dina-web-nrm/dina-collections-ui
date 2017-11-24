import React from 'react'
import { Header, Grid, Segment } from 'semantic-ui-react'
import { Field } from 'redux-form'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Input } from 'coreModules/form/components'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'featureObservation',
})

export const buildPath = (name, index = 0) => {
  return `featureObservations[${index}].${name}`
}

export default () => {
  return (
    <Segment>
      <Header size="medium">
        <ModuleTranslate textKey="features" />
      </Header>
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="sex" />}
            module="collectionMammals"
            name={buildPath('featureObservationText', 0)}
            type="text"
          />
          <Field
            autoComplete="off"
            component={Input}
            module="collectionMammals"
            name={buildPath('type', 0)}
            style={{ display: 'none' }}
            type="text"
            value="sex"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="age" />}
            module="collectionMammals"
            name={buildPath('featureObservationText', 1)}
            type="text"
          />
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="ageDeterminationMethod" />}
            module="collectionMammals"
            name={buildPath('methodText', 1)}
            type="text"
          />
          <Field
            autoComplete="off"
            component={Input}
            module="collectionMammals"
            name={buildPath('type', 1)}
            style={{ display: 'none' }}
            type="text"
            value="sex"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
