import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import {
  NavigationSidebar,
  Footer,
  ViewWrap,
} from 'modules/commonUi/components'

import { ShortcutsDisplay } from 'modules/keyboardShortcuts/components'

const propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
}

class App extends Component {
  render() {
    const { routes } = this.props
    return (
      <div>
        <ViewWrap>
          {routes.map(({ component, exact, path }) => (
            <Route component={component} exact={exact} key={path} path={path} />
          ))}
          <Footer />
        </ViewWrap>
        <NavigationSidebar navItems={routes} />
        <ShortcutsDisplay />
      </div>
    )
  }
}

App.propTypes = propTypes

export default App
