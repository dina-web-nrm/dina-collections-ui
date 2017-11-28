import React from 'react'
import { Header, Grid, Segment } from 'semantic-ui-react'
import { Field } from 'redux-form'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Input } from 'coreModules/form/components'
import { fieldNamePathFactory } from 'coreModules/form/utilities'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'occurrences',
})

const buildPath = fieldNamePathFactory('occurrences')

export default () => {
  return (
    <Segment>
      <Header size="medium">
        <ModuleTranslate textKey="collectingInformation" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="localityText" />}
            module="collectionMammals"
            name={buildPath('localityText')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="expeditionText" />}
            module="collectionMammals"
            name={buildPath('expeditionText')}
            type="text"
          />
        </Grid.Column>
      </Grid>
      <Header size="small">
        <ModuleTranslate textKey="startTime" />
      </Header>
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Column computer={5} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="yearStart" />}
            module="collectionMammals"
            name={buildPath('yearStart')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={5} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="monthStart" />}
            module="collectionMammals"
            name={buildPath('monthStart')}
            type="text"
          />
        </Grid.Column>

        <Grid.Column computer={5} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="dayStart" />}
            module="collectionMammals"
            name={buildPath('dayStart')}
            type="text"
          />
        </Grid.Column>
      </Grid>
      <Header size="small">
        <ModuleTranslate textKey="endTime" />
      </Header>
      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Column computer={5} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="yearEnd" />}
            module="collectionMammals"
            name={buildPath('yearEnd')}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={5} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="monthEnd" />}
            module="collectionMammals"
            name={buildPath('monthEnd')}
            type="text"
          />
        </Grid.Column>

        <Grid.Column computer={5} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="dayEnd" />}
            module="collectionMammals"
            name={buildPath('dayEnd')}
            type="text"
          />
        </Grid.Column>
      </Grid>

      <Grid textAlign="left" verticalAlign="middle">
        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="occurrenceDateText" />}
            module="collectionMammals"
            name={buildPath('occurrenceDateText')}
            type="text"
          />
        </Grid.Column>

        <Grid.Column computer={8} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="collectorsText" />}
            module="collectionMammals"
            name={buildPath('collectorsText')}
            type="text"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
