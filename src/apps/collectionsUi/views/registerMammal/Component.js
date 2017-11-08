import { Grid } from 'semantic-ui-react'
import { RegisterMammalForm } from 'modules/collectionMammals/components'
import { Translate } from 'modules/i18n/components'
import PageTemplate from 'modules/commonUi/components/PageTemplate'
import React from 'react'

const RegisterMammal = () => (
  <PageTemplate>
    <h1>
      <Translate textKey="modules.registerMammal.registerMammal" />
    </h1>
    <Grid textAlign="left" verticalAlign="middle">
      <Grid.Column>
        <RegisterMammalForm />
      </Grid.Column>
    </Grid>
  </PageTemplate>
)

export default RegisterMammal
