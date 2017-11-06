import React from 'react'
import { Grid, Image, Message } from 'semantic-ui-react'
import { LoginForm } from 'modules/user/components'
import PageTemplate from 'modules/commonUi/components/PageTemplate'
import logo from './logo.png'

const Login = () => (
  <PageTemplate>
    <div className="login-form">
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ marginTop: 100, maxWidth: 450 }}>
          <Image centered src={logo} style={{ height: 70, marginBottom: 20 }} />
          <LoginForm />
          <Message>Common Login!</Message>
        </Grid.Column>
      </Grid>
    </div>
  </PageTemplate>
)

export default Login
