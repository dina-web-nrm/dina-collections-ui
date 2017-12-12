import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuExampleHeaderVertical extends Component {
  handleItemClick = name => this.setState({ activeItem: name })

  render() {
    const { specification } = this.props
    const { activeItem } = this.state || {}
    const schemas = specification.components.schemas
    console.log('schemas', schemas)

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
        (modelParameters, paramenterKey) => {
          return [...modelParameters, `${model.key}.${paramenterKey}`]
        },
        []
      )

      return [...array, ...parameterArray]
    }, [])

    return (
      <Menu
        fluid
        style={{ height: '100%', overflow: 'scroll', position: 'fixed' }}
        vertical
      >
        <h1>docs</h1>
        <Menu.Item>
          <Menu.Header>Models</Menu.Header>
          <Menu.Menu>
            {models.map(model => {
              return (
                <Menu.Item
                  active={activeItem === model.key}
                  href={`#${model.key}`}
                  name={model.key}
                  onClick={this.handleItemClick}
                />
              )
            })}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Parameters</Menu.Header>
          <Menu.Menu>
            {parameters.map(parameterKey => {
              return (
                <Menu.Item
                  active={activeItem === parameterKey}
                  href={`#${parameterKey}`}
                  name={parameterKey}
                  onClick={this.handleItemClick}
                />
              )
            })}
          </Menu.Menu>
        </Menu.Item>
        <Menu.Item>
          <Menu.Header>Parameters</Menu.Header>
          <Menu.Menu>
            {parameters.map(parameterKey => {
              return (
                <Menu.Item
                  active={activeItem === parameterKey}
                  href={`#${parameterKey}`}
                  name={parameterKey}
                  onClick={this.handleItemClick}
                />
              )
            })}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    )
  }
}
