import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm, SubmissionError, getFormSyncErrors } from 'redux-form'
import { createFormModelSchemaValidator } from 'coreModules/error/utilities'
import { FormSchemaError } from 'coreModules/error/components'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { registerMammal } from '../../actionCreators'

import SegmentCatalogedUnit from './SegmentCatalogedUnit'
import SegmentDetermination from './SegmentDetermination'
import SegmentOccurrences from './SegmentOccurrences'
import SegmentFeatureObservations from './SegmentFeatureObservations'
import SegmentPhysicalUnits from './SegmentPhysicalUnits'

const log = createLog('modules:collectionMammals:MammalForm')
const ModuleTranslate = createModuleTranslate('collectionMammals')

const mapStateToProps = state => {
  const syncErrors = getFormSyncErrors('mammalForm')(state)
  return {
    schemaErrors: (syncErrors && syncErrors.schemaErrors) || [],
  }
}

const mapDispatchToProps = {
  registerMammal,
}

const propTypes = {
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  pristine: PropTypes.bool.isRequired,
  registerMammal: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  schemaErrors: PropTypes.array,
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  error: '',
}

class RawMammalForm extends Component {
  constructor(props) {
    super(props)
    this.handleRegisterMammal = this.handleRegisterMammal.bind(this)
  }

  handleRegisterMammal(data) {
    return this.props.registerMammal(data).catch(error => {
      throw new SubmissionError({
        _error: error.error_description,
      })
    })
  }

  render() {
    const {
      error,
      handleSubmit,
      invalid,
      pristine,
      reset,
      submitting,
      submitFailed,
      submitSucceeded,
      schemaErrors,
    } = this.props

    log.render()
    return (
      <Form
        error={!!error || submitFailed || !!schemaErrors.length}
        onSubmit={handleSubmit(this.handleRegisterMammal)}
        success={submitSucceeded}
      >
        <SegmentCatalogedUnit />
        <SegmentDetermination />
        <SegmentOccurrences />
        <SegmentFeatureObservations />
        <SegmentPhysicalUnits />

        <Segment>
          <div>
            <Button
              disabled={pristine || submitting}
              size="large"
              type="submit"
            >
              <ModuleTranslate textKey="save" />
            </Button>
            <Button
              basic
              disabled={pristine || submitting}
              onClick={reset}
              size="large"
            >
              <ModuleTranslate textKey="cancel" />
            </Button>
            {invalid &&
              submitFailed && (
                <Message
                  error
                  header={<ModuleTranslate textKey="formContainsErrors" />}
                />
              )}

            {!!schemaErrors.length && <FormSchemaError errors={schemaErrors} />}

            {!invalid &&
              submitFailed &&
              error && (
                <Message
                  content={error}
                  error
                  header={<ModuleTranslate textKey="submitFailed" />}
                />
              )}
            {submitSucceeded && (
              <Message header={<ModuleTranslate textKey="saved" />} success />
            )}
          </div>
        </Segment>
      </Form>
    )
  }
}

RawMammalForm.propTypes = propTypes
RawMammalForm.defaultProps = defaultProps

export const MammalForm = reduxForm({
  form: 'mammalForm',
  validate: createFormModelSchemaValidator({
    model: 'individualGroup',
  }),
})(RawMammalForm)

export default compose(connect(mapStateToProps, mapDispatchToProps))(MammalForm)
