import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'

import GeneralDocs from 'coreModules/documentation/components/GeneralDocs'
import DataModel from 'coreModules/documentation/components/DataModel'
import Nav from 'coreModules/documentation/components/Nav'

const propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
}

class Docs extends Component {
  render() {
    const { match } = this.props
    return (
      <div>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Nav />
            </Grid.Column>
            <Grid.Column width={13}>
              <Switch>
                <Route component={GeneralDocs} exact path={`${match.url}`} />
                <Route
                  component={GeneralDocs}
                  exact
                  path={`${match.url}/:docName`}
                />
                <Route
                  component={DataModel}
                  exact
                  path={`${
                    match.url
                  }/models/:schemaVersion/:modelId/:parameterId`}
                />
                <Route
                  component={DataModel}
                  path={`${match.url}/models/:schemaVersion/:modelId`}
                />
              </Switch>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

Docs.propTypes = propTypes

export default Docs
