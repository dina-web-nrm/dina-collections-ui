import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { Field } from 'redux-form'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Checkbox, Input } from 'coreModules/form/components'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'catalogedUnit',
})

export default () => {
  return (
    <Segment>
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column computer={7} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            helpText={<ModuleTranslate textKey="sixOrEightDigits" />}
            label={<ModuleTranslate textKey="catalogNumber" />}
            module="collectionMammals"
            name="physicalUnits[0].catalogedUnit.catalogNumber"
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={6} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            disabled
            label={<ModuleTranslate textKey="storedUnderTaxonName" />}
            module="collectionMammals"
            name="physicalUnits[0].catalogedUnit.storedUnderTaxonName"
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={3} mobile={16}>
          <Field
            autoComplete="off"
            component={Checkbox}
            label={<ModuleTranslate textKey="isPublic" />}
            module="collectionMammals"
            name="physicalUnits[0].catalogedUnit.isPublic"
            type="checkbox"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
