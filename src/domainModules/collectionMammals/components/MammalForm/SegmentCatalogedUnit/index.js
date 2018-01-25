import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Checkbox, Field, Input } from 'coreModules/form/components'

const buildModuleTextKey = textKey => `modules.collectionMammals.${textKey}`
const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'catalogedUnit',
})

export default () => {
  return (
    <Segment color="green">
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Column computer={7} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            helpNotificationProps={{
              descriptionHeaderKey: buildModuleTextKey(
                'catalogedUnit.catalogNumber'
              ),
              descriptionKey: buildModuleTextKey(
                'catalogedUnit.sixOrEightDigits'
              ),
              linkTextKey: buildModuleTextKey('seeDataModelDocs'),
              linkTo: '/docs/0.1.0/models/catalogedUnit/catalogNumber', // TODO: make this link go to latest docs version
            }}
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
            name="physicalUnits[0].catalogedUnit.publishRecord"
            type="checkbox"
          />
        </Grid.Column>
      </Grid>
    </Segment>
  )
}
