import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

import i18nSelectors from 'coreModules/i18n/globalSelectors'
import specification from 'dina-schema/build/openApi.json'

import createModelLink from '../utilities/createModelLink'

import getAvailableSchemaVersions from '../utilities/getAvailableSchemaVersions'

const mapStateToProps = state => {
  return {
    markdownKeys: i18nSelectors.getMarkdownKeysByPath(state, 'docs.overview'),
  }
}

const propTypes = {
  markdownKeys: PropTypes.array.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      schemaVersion: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

class Nav extends Component {
  render() {
    const { match: { params: { schemaVersion: version } } } = this.props
    const { schemas } = specification.components

    const availableVersions = getAvailableSchemaVersions()

    const models = Object.keys(schemas)
      .map(key => {
        return {
          ...schemas[key],
          key,
        }
      })
      .filter(model => model['x-modelType'] === 'model')

    return (
      <Menu
        inverted
        size="large"
        style={{
          height: '100%',
          overflow: 'scroll',
          position: 'fixed',
          width: '300px',
        }}
        vertical
      >
        <Menu.Item>
          <Menu.Header>
            <NavLink activeClassName="active" className="item" exact to="/docs">
              Home
            </NavLink>
          </Menu.Header>
          <Menu.Menu style={{ paddingLeft: '20px' }}>
            {this.props.markdownKeys.map(markdownKey => {
              return (
                <NavLink
                  activeClassName="active"
                  className="item"
                  exact
                  to={`/docs/${version}/${markdownKey}`}
                >
                  {markdownKey}
                </NavLink>
              )
            })}
          </Menu.Menu>
        </Menu.Item>

        <Menu.Item>
          <Menu.Header>
            <NavLink
              activeClassName="active"
              className="item"
              exact
              to={`/docs/${version}`}
            >
              Versions
            </NavLink>
          </Menu.Header>
          <Menu.Menu style={{ paddingLeft: '20px' }}>
            {availableVersions.map(availableVersion => {
              return (
                <NavLink
                  activeClassName="active"
                  className="item"
                  to={`/docs/${availableVersion}`}
                >
                  {availableVersion}
                </NavLink>
              )
            })}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>
            <NavLink
              activeClassName="active"
              className="item"
              exact
              to={`/docs/${version}/models`}
            >
              Entities
            </NavLink>
          </Menu.Header>

          <Menu.Menu style={{ paddingLeft: '20px' }}>
            {models.map(model => {
              return (
                <NavLink
                  activeClassName="active"
                  className="item"
                  key={createModelLink({ modelName: model.key, version })}
                  to={createModelLink({ modelName: model.key, version })}
                >
                  {model.key}
                </NavLink>
              )
            })}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
  }
}

Nav.propTypes = propTypes

export default compose(connect(mapStateToProps))(Nav)
