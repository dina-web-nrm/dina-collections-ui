import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Header, Segment, Table } from 'semantic-ui-react'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Field, FormTable, Input } from 'coreModules/form/components'
import { fieldNamePathFactory } from 'coreModules/form/utilities'
import FeatureTypeNameDropdown from '../../FeatureTypeNameDropdown'
import Footer from './Footer'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'featureObservations',
})

const buildPath = fieldNamePathFactory('featureObservations')

const columnHeaderTextKeys = [
  'modules.collectionMammals.featureObservations.feature',
  'modules.collectionMammals.featureObservations.value',
  'modules.collectionMammals.featureObservations.method',
  'modules.collectionMammals.featureObservations.agent',
  'modules.collectionMammals.featureObservations.date',
]

const mapStateToProps = (state, { formValueSelector }) => {
  return {
    featureObservations: formValueSelector(state, 'featureObservations'),
  }
}

const propTypes = {
  featureObservations: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
}
const defaultProps = {
  featureObservations: undefined,
}

class SegmentFeatureObservations extends Component {
  // prettier-ignore
  getTableRow(index) { // eslint-disable-line class-methods-use-this
    return [
      <Table.Cell
        key={buildPath(
          'featureObservationType.featureObservationTypeName',
          index
        )}
      >
        <Field
          autoComplete="off"
          className="transparent"
          component={FeatureTypeNameDropdown}
          module="collectionMammals"
          name={buildPath(
            'featureObservationType.featureObservationTypeName',
            index
          )}
          type="text"
        />
      </Table.Cell>,
      <Table.Cell key={buildPath('featureObservationValue', index)}>
        <Field
          autoComplete="off"
          className="transparent"
          component={Input}
          module="collectionMammals"
          name={buildPath('featureObservationText', index)}
          type="text"
        />
      </Table.Cell>,
      <Table.Cell key={buildPath('methodText', index)}>
        <Field
          autoComplete="off"
          className="transparent"
          component={Input}
          module="collectionMammals"
          name={buildPath('methodText', index)}
          type="text"
        />
      </Table.Cell>,
      <Table.Cell key={buildPath('featureObservationAgent', index)}>
        <Field
          autoComplete="off"
          className="transparent"
          component={Input}
          module="collectionMammals"
          name={buildPath('featureObservationAgent', index)}
          type="text"
        />
      </Table.Cell>,
      <Table.Cell key={buildPath('featureObservationDate', index)}>
        <Field
          autoComplete="off"
          className="transparent"
          component={Input}
          module="collectionMammals"
          name={buildPath('featureObservationDate', index)}
          type="text"
        />
      </Table.Cell>,
    ]
  }

  render() {
    const { featureObservations } = this.props

    return (
      <Segment color="green">
        <Header size="medium">
          <ModuleTranslate textKey="features" />
        </Header>
        <FormTable
          columnHeaderTextKeys={columnHeaderTextKeys}
          footer={<Footer />}
          getRowCells={this.getTableRow}
          numberOfItemsToSkip={1}
          numberOfRows={
            (featureObservations && featureObservations.length) || 0
          }
        />
      </Segment>
    )
  }
}

SegmentFeatureObservations.propTypes = propTypes
SegmentFeatureObservations.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(SegmentFeatureObservations)
