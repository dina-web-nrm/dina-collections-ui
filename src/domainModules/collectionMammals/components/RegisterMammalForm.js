import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
import { createFormSchemaValidator } from 'coreModules/error/utilities'
import createLog from 'utilities/log'
import { createModuleTranslate } from 'coreModules/i18n/components'
import { Input } from 'coreModules/form/components'
import { registerMammal } from '../actionCreators'
import { registerMammalRequest } from '../schemas'

const log = createLog('modules:collectionMammals:RegisterMammal')
const ModuleTranslate = createModuleTranslate('collectionMammals')

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
  submitFailed: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

const defaultProps = {
  error: '',
}

class RawRegisterMammal extends Component {
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
    } = this.props

    log.render()
    return (
      <Form
        error={!!error || submitFailed}
        onSubmit={handleSubmit(this.handleRegisterMammal)}
        success={submitSucceeded}
      >
        <Segment>
          <Grid textAlign="left" verticalAlign="middle">
            <Grid.Column computer={3} mobile={16}>
              <Field
                autoComplete="off"
                component={Input}
                helpText={
                  <ModuleTranslate textKey="registerMammalForm.sixOrEightDigits" />
                }
                label={
                  <ModuleTranslate textKey="registerMammalForm.catalogNumber" />
                }
                module="collectionMammals"
                name="catalogNumber"
                required
                type="text"
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Header size="medium">
            <ModuleTranslate textKey="registerMammalForm.determination" />
          </Header>
          <Field
            autoComplete="off"
            component={Input}
            label={
              <ModuleTranslate textKey="registerMammalForm.taxonNameEtc" />
            }
            module="collectionMammals"
            name="determination"
            type="text"
          />
        </Segment>
        <Segment>
          <Header size="medium">
            <ModuleTranslate textKey="registerMammalForm.collectingInformation" />
          </Header>
          <Grid textAlign="left" verticalAlign="middle">
            <Grid.Column computer={8} mobile={16}>
              <Field
                autoComplete="off"
                component={Input}
                label={
                  <ModuleTranslate textKey="registerMammalForm.locality" />
                }
                module="collectionMammals"
                name="locality"
                type="text"
              />
            </Grid.Column>
            <Grid.Column computer={3} mobile={16}>
              <Field
                autoComplete="off"
                component={Input}
                label={
                  <ModuleTranslate textKey="registerMammalForm.collectingDate" />
                }
                module="collectionMammals"
                name="collectingDate"
                type="text"
              />
            </Grid.Column>
            <Grid.Column computer={5} mobile={16}>
              <Field
                autoComplete="off"
                component={Input}
                label={
                  <ModuleTranslate textKey="registerMammalForm.collectors" />
                }
                module="collectionMammals"
                name="collectors"
                type="text"
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Header size="medium">
            <ModuleTranslate textKey="registerMammalForm.features" />
          </Header>
          <Grid textAlign="left" verticalAlign="middle">
            <Grid.Column computer={8} mobile={16}>
              <Field
                autoComplete="off"
                component={Input}
                label={<ModuleTranslate textKey="registerMammalForm.sex" />}
                module="collectionMammals"
                name="sex"
                type="text"
              />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment>
          <Header size="medium">
            <ModuleTranslate textKey="registerMammalForm.physicalObjects" />
          </Header>
          <Grid textAlign="left" verticalAlign="middle">
            <Grid.Column computer={8} mobile={16}>
              <Field
                autoComplete="off"
                component={Input}
                label={
                  <ModuleTranslate textKey="registerMammalForm.description" />
                }
                module="collectionMammals"
                name="description"
                type="text"
              />
            </Grid.Column>
            <Grid.Column computer={8} mobile={16}>
              <Field
                autoComplete="off"
                component={Input}
                label={
                  <ModuleTranslate textKey="registerMammalForm.normalStorageLocation" />
                }
                module="collectionMammals"
                name="normalStorageLocation"
                type="text"
              />
            </Grid.Column>
          </Grid>
        </Segment>
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

RawRegisterMammal.propTypes = propTypes
RawRegisterMammal.defaultProps = defaultProps

export const RegisterMammal = reduxForm({
  form: 'registerMammal',
  validate: createFormSchemaValidator(registerMammalRequest),
})(RawRegisterMammal)

export default compose(connect(null, mapDispatchToProps))(RegisterMammal)
