import React from 'react'
import { Header, Grid, Segment } from 'semantic-ui-react'
import { Field } from 'redux-form'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Input } from 'coreModules/form/components'

const ModuleTranslate = createModuleTranslate('collectionMammals')

export default () => {
  return (
    <Segment>
      <Header size="medium">
        <ModuleTranslate scope="determination" textKey="determination" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column computer={3} mobile={16}>
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
            name="identifications[0].identificationText"
            type="text"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
