import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from 'semantic-ui-react'

import { actionCreators as mammalActionCreators } from 'domainModules/collectionMammals'
import { MammalForm } from 'domainModules/collectionMammals/components'
import { Translate } from 'coreModules/i18n/components'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

const mapDispatchToProps = {
  registerMammal: mammalActionCreators.registerMammal,
}

const propTypes = {
  registerMammal: PropTypes.func.isRequired,
}

const RegisterMammal = ({ registerMammal }) => (
  <PageTemplate>
    <h1>
      <Translate textKey="modules.registerMammal.registerMammal" />
    </h1>
    <Grid textAlign="left" verticalAlign="middle">
      <Grid.Column>
        <MammalForm handleFormSubmit={registerMammal} />
      </Grid.Column>
    </Grid>
  </PageTemplate>
)

RegisterMammal.propTypes = propTypes

export default connect(null, mapDispatchToProps)(RegisterMammal)
