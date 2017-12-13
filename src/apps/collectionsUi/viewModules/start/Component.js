import React from 'react'
import { Image } from 'semantic-ui-react'
import { requireLoggedOut } from 'coreModules/user/higherOrderComponents'
import PageTemplate from 'coreModules/commonUi/components/PageTemplate'

import logo from './logo.png'

const Login = () => (
  <PageTemplate>
    Start
    <Image centered src={logo} style={{ height: 70, marginBottom: 20 }} />
  </PageTemplate>
)

export default requireLoggedOut(Login)
