import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { FixedMenu, Footer, ViewWrap } from 'coreModules/commonUi/components'
import uiSelectors from 'coreModules/commonUi/globalSelectors'

import Docs from '../docs/Async'
import Login from '../login/Async'
import PageNotFound from '../pageNotFound/Async'
import Start from '../start/Async'

const mapStateToProps = state => {
  return {
    fixedMenuVisible: uiSelectors.getFixedMenuIsVisible(state),
  }
}

const propTypes = {
  fixedMenuVisible: PropTypes.bool.isRequired,
}

class Public extends Component {
  render() {
    const { fixedMenuVisible } = this.props
    return (
      <div>
        <ViewWrap>
          {fixedMenuVisible ? <FixedMenu /> : null}
          <Switch>
            <Route component={Login} exact path="/login" />
            <Route component={Start} exact path="/" />
            <Route component={Docs} path="/docs" />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </ViewWrap>
      </div>
    )
  }
}

Public.propTypes = propTypes

export default compose(connect(mapStateToProps))(Public)
