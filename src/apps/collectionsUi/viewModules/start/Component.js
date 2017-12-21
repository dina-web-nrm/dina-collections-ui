import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react'

import {
  hideFixedMenu,
  showFixedMenu,
} from 'coreModules/commonUi/actionCreators'
import { Markdown } from 'coreModules/i18n/components'

import logo from './logo.png'

const mapDispatchToProps = { hideFixedMenu, showFixedMenu }

const propTypes = {
  hideFixedMenu: PropTypes.func.isRequired,
  showFixedMenu: PropTypes.func.isRequired,
}

class Start extends Component {
  componentWillMount() {
    this.props.hideFixedMenu()
  }

  componentWillUnmount() {
    this.props.showFixedMenu()
  }

  render() {
    return (
      <div>
        <Segment
          style={{
            background: '#fbfcfa',
            minHeight: 700,
            padding: '1em 0em',
          }}
          textAlign="center"
          vertical
        >
          <Visibility
            onBottomPassed={this.props.showFixedMenu}
            onBottomVisible={this.props.hideFixedMenu}
            once={false}
          >
            <Container>
              <Menu pointing secondary size="large">
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
              </Menu>
            </Container>
          </Visibility>

          <Container text>
            <Header
              as="h1"
              content="DINA Collections UI"
              style={{
                fontSize: '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '3em',
              }}
            />
            <Header
              as="h2"
              content="The DINA project develops an open-source Web-based information management system for natural history data"
              style={{ fontSize: '1.7em', fontWeight: 'normal' }}
            />
            <NavLink to="/login">
              <Button color="green" size="huge">
                Login
                <Icon name="right arrow" />
              </Button>
            </NavLink>
          </Container>
        </Segment>

        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="top">
            <Grid.Row>
              <Grid.Column width={8}>
                <Header as="h3" style={{ fontSize: '2em' }}>
                  Collection management for large installations
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  {`At the core of the system is support for assembling, managing
                  and sharing data associated with natural history collections
                  and their curation ("collection management"). Target
                  collections include zoological, botanical, geological and
                  paleontological collections, living collections, biodiversity
                  inventories, observation records, and molecular data. DINA is
                  primarily intended for large installations servicing the
                  collection management needs of a country, a region, or a large
                  institution.`}
                </p>
                <Divider horizontal />
                <Header as="h3" style={{ fontSize: '2em' }}>
                  An international partnership for open-source development
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                  {`DINA is developed by the DINA consortium, an unincorporated
                  international partnership among organizations and individuals
                  for collaborative open-source development. The DINA consortium
                  was founded in 2014 by six natural history collection
                  institutions in Europe and North America and is open to
                  additional members as detailed below. The DINA acronym stands
                  for "DIgital Information system for NAtural history data", and
                  has its roots in a Swedish initiative to replace a
                  heterogeneous collection of unsustainable in-house databases
                  with a modern, web-based national collection management
                  system.`}
                </p>
              </Grid.Column>
              <Grid.Column floated="right" width={6}>
                <Markdown textKey="modules.start.changelog" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

Start.propTypes = propTypes

export default compose(connect(undefined, mapDispatchToProps))(Start)
