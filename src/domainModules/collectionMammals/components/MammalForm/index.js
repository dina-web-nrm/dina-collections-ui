import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Form, Message, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {
  formValueSelector as formValueSelectorFactory,
  getFormSyncErrors,
  reduxForm,
  SubmissionError,
} from 'redux-form'
import { createFormModelSchemaValidator } from 'coreModules/error/utilities'
import { FormSchemaError } from 'coreModules/error/components'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { registerMammal } from '../../actionCreators'
import SegmentCatalogedUnit from './SegmentCatalogedUnit'
import SegmentDetermination from './SegmentDetermination'
import SegmentFeatureObservations from './SegmentFeatureObservations'
import SegmentOccurrences from './SegmentOccurrences'
import SegmentPhysicalUnits from './SegmentPhysicalUnits'

const log = createLog('modules:collectionMammals:MammalForm')
const ModuleTranslate = createModuleTranslate('collectionMammals')

const FORM_NAME = 'mammalForm'
const TAXON_NAME_FIELD_KEY = 'identifiedTaxonNameStandardized'

const formValueSelector = formValueSelectorFactory(FORM_NAME)
const getFormSyncErrorsSelector = getFormSyncErrors(FORM_NAME)

const mapStateToProps = state => {
  const syncErrors = getFormSyncErrorsSelector(state)

  return {
    schemaErrors: syncErrors && syncErrors.schemaErrors,
    taxonName: formValueSelector(state, TAXON_NAME_FIELD_KEY),
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
  schemaErrors: PropTypes.arrayOf(
    PropTypes.shape({ errorCode: PropTypes.string.isRequired })
  ),
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  taxonName: PropTypes.string,
}

const defaultProps = {
  error: '',
  schemaErrors: [],
  taxonName: '',
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
      schemaErrors,
      submitting,
      submitFailed,
      submitSucceeded,
      taxonName,
    } = this.props

    log.render()
    return (
      <Form
        error={!!error || submitFailed}
        onSubmit={handleSubmit(this.handleRegisterMammal)}
        success={submitSucceeded}
      >
        <SegmentCatalogedUnit />
        <SegmentDetermination
          taxonName={taxonName}
          taxonNameFieldKey={TAXON_NAME_FIELD_KEY}
        />
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
            {schemaErrors && <FormSchemaError errors={schemaErrors} />}
            {invalid &&
              submitFailed && (
                <Message
                  error
                  header={<ModuleTranslate textKey="formContainsErrors" />}
                />
              )}
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
  form: FORM_NAME,
  initialValues: {
    featureObservations: [
      { featureObservationType: { featureObservationTypeName: 'sex', id: 1 } },
      { featureObservationType: { featureObservationTypeName: 'age', id: 2 } },
      {
        featureObservationType: {
          featureObservationTypeName: 'ageStage',
          id: 3,
        },
      },
    ],
    physicalUnits: [
      {
        catalogedUnit: {
          catalogNumber: '',
        },
      },
    ],
  },
  validate: createFormModelSchemaValidator({
    model: 'individualGroup',
  }),
})(RawMammalForm)

export default compose(connect(mapStateToProps, mapDispatchToProps))(MammalForm)
