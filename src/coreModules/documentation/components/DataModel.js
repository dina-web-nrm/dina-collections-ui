import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Segment, Menu, Grid, Sidebar } from 'semantic-ui-react'

import openApiSpec from 'dina-schema/build/openApi.json'
import { createModuleTranslate } from 'coreModules/i18n/components'
import Model from './Model'
import Nav from './Nav'

const ModuleTranslate = createModuleTranslate('documentation')

const propTypes = {
  something: PropTypes.string.isRequired,
}

const defaultProps = {}

class DataModel extends Component {
  render() {
    const models = Object.keys(openApiSpec.components.schemas).map(key => {
      return { key, ...openApiSpec.components.schemas[key] }
    })
    return (
      <div>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Nav specification={openApiSpec} />
            </Grid.Column>
            <Grid.Column width={13}>
              <div>
                {models.map(model => {
                  return <Model model={model} />
                })}
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

DataModel.propTypes = propTypes
DataModel.defaultProps = defaultProps

export default DataModel

// <div>
//   <Grid divided inverted stackable>
//     <Grid.Row>
//       <Grid.Column width={3}>
//         <Nav />
//       </Grid.Column>
//       <Grid.Column width={13}>
//         <div>
//           {models.map(model => {
//             return <Model model={model} />
//           })}
//         </div>
//       </Grid.Column>
//     </Grid.Row>
//   </Grid>
// </div>
