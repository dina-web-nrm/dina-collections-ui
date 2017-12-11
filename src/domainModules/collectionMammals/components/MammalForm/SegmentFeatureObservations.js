import React from 'react'
import { Header, Grid, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { createModuleTranslate } from 'coreModules/i18n/components'
import { Field, Input } from 'coreModules/form/components'
import { fieldNamePathFactory } from 'coreModules/form/utilities'

const ModuleTranslate = createModuleTranslate('collectionMammals', {
  scope: 'featureObservations',
})

const buildPath = fieldNamePathFactory('featureObservations')

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

// prettier-ignore
function SegmentFeatureObservations({ featureObservations }) { // eslint-disable-line no-unused-vars
  return (
    <Segment>
      <Header size="medium">
        <ModuleTranslate textKey="features" />
      </Header>
      <Grid textAlign="left" verticalAlign="top">
        <Grid.Row>
          <Grid.Column computer={4} mobile={16} tablet={8}>
            <Field
              autoComplete="off"
              component={Input}
              label={<ModuleTranslate textKey="sex" />}
              module="collectionMammals"
              name={buildPath('featureObservationText', 0)}
              type="text"
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Column computer={4} mobile={16} tablet={8}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="age" />}
            module="collectionMammals"
            name={buildPath('featureObservationText', 1)}
            type="text"
          />
        </Grid.Column>
        <Grid.Column computer={4} mobile={16}>
          <Field
            autoComplete="off"
            component={Input}
            label={<ModuleTranslate textKey="ageDeterminationMethod" />}
            module="collectionMammals"
            name={buildPath('methodText', 1)}
            type="text"
          />
        </Grid.Column>
        <Grid.Row>
          <Grid.Column computer={4} mobile={16}>
            <Field
              autoComplete="off"
              component={Input}
              label={<ModuleTranslate textKey="ageStage" />}
              module="collectionMammals"
              name={buildPath('featureObservationText', 2)}
              type="text"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

SegmentFeatureObservations.propTypes = propTypes
SegmentFeatureObservations.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(SegmentFeatureObservations)
