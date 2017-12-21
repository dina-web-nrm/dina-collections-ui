import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Container, Image, Menu } from 'semantic-ui-react'

import logo from './logo.png'

const FixedMenu = () => (
  <Menu fixed="top" size="large" style={{ zIndex: 150 }}>
    <Container>
      <NavLink className="item" exact to="/">
        <Image centered size="tiny" src={logo} />
      </NavLink>
      <a
        className="item"
        href="https://github.com/DINA-Web/documentation/wiki/User-Manual"
      >
        User manual
      </a>
      <NavLink className="item" to="/docs">
        Data model docs
      </NavLink>
      <Menu.Menu position="right">
        <NavLink className="item" to="/login">
          <Button>Login</Button>
        </NavLink>
      </Menu.Menu>
    </Container>
  </Menu>
)

export default FixedMenu
