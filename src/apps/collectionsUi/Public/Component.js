import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { Footer, ViewWrap } from 'coreModules/commonUi/components'

import Login from '../viewModules/login/Async'
import PageNotFound from '../viewModules/pageNotFound/Async'

class Public extends Component {
  render() {
    return (
      <div>
        <ViewWrap>
          <Switch>
            <Redirect exact from="/" to="/login" />
            <Route component={Login} exact path="/login" />
            <Route component={PageNotFound} />
          </Switch>
          <Footer />
        </ViewWrap>
      </div>
    )
  }
}

export default Public
