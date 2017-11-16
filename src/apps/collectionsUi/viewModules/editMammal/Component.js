import { Grid } from 'semantic-ui-react'
import { MammalForm } from 'domainModules/collectionMammals/components'
import { Translate } from 'coreModules/i18n/components'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'
import React from 'react'

const RegisterMammal = () => (
  <PageTemplate>
    <h1>
      <Translate textKey="modules.editMammal.editMammal" />
    </h1>
    <Grid textAlign="left" verticalAlign="middle">
      <Grid.Column>
        <MammalForm />
      </Grid.Column>
    </Grid>
  </PageTemplate>
)

export default RegisterMammal
