import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { compose } from 'redux'
import { connect } from 'react-redux'

import i18nSelectors from 'coreModules/i18n/globalSelectors'
import specification from 'dina-schema/build/openApi.json'

import createModelLink from '../utilities/createModelLink'
import createParameterLink from '../utilities/createParameterLink'

const mapStateToProps = state => {
  return {
    markdownKeys: i18nSelectors.getMarkdownKeysByPath(state, 'docs.overview'),
  }
}

class Nav extends Component {
  render() {
    const schemas = specification.components.schemas

    const models = Object.keys(schemas)
      .map(key => {
        return {
          ...schemas[key],
          key,
        }
      })
      .filter(model => model['x-modelType'] === 'model')

    const parameters = models.reduce((array, model) => {
      const parameterArray = Object.keys(model.properties || []).reduce(
        (modelParameters, parameterKey) => {
          return [...modelParameters, { modelKey: model.key, parameterKey }]
        },
        []
      )

      return [...array, ...parameterArray]
    }, [])

    return (
      <Menu
        style={{
          height: '100%',
          overflow: 'scroll',
          position: 'fixed',
          width: '300px',
        }}
        vertical
      >
        <Menu.Item>
          <Menu.Header>Overview</Menu.Header>
          <Menu.Menu>
            {this.props.markdownKeys.map(markdownKey => {
              return (
                <NavLink
                  activeClassName="active"
                  className="item"
                  exact
                  to={`/docs/${markdownKey}`}
                >
                  {markdownKey}
                </NavLink>
              )
            })}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Entities</Menu.Header>
          <Menu.Menu>
            {models.map(model => {
              return (
                <NavLink
                  activeClassName="active"
                  className="item"
                  key={createModelLink({ modelName: model.key })}
                  to={createModelLink({ modelName: model.key })}
                >
                  {model.key}
                </NavLink>
              )
            })}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Attributes</Menu.Header>
          <Menu.Menu>
            {parameters.map(({ modelKey, parameterKey }) => {
              return (
                <NavLink
                  activeClassName="active"
                  className="item"
                  exact
                  key={createParameterLink({
                    modelName: modelKey,
                    parameterName: parameterKey,
                  })}
                  to={createParameterLink({
                    modelName: modelKey,
                    parameterName: parameterKey,
                  })}
                >
                  {`${modelKey} -> ${parameterKey}`}
                </NavLink>
              )
            })}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
  }
}

export default compose(connect(mapStateToProps))(Nav)
