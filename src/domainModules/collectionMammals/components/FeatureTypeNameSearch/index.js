import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  SearchInputWithResults,
  TranslateSearchResult,
} from 'coreModules/form/components'
import { withTranslate } from 'coreModules/i18n/higherOrderComponents'
import { FEATURE_OBSERVATION_TYPE_NAMES } from '../../constants'

const results = FEATURE_OBSERVATION_TYPE_NAMES.map(typeName => {
  return {
    key: typeName,
    textKey: `modules.collectionMammals.featureObservations.${typeName}`,
    value: typeName,
  }
})

const propTypes = {
  controlledValue: PropTypes.number,
  errorScope: PropTypes.string,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  required: PropTypes.bool,
  translate: PropTypes.func.isRequired,
}

const defaultProps = {
  controlledValue: undefined,
  errorScope: undefined,
  helpText: undefined,
  label: undefined,
  required: false,
}

class FeatureTypeNameSearch extends Component {
  constructor(props) {
    super(props)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleResultSelect(event, { result }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    if (result && result.content && result.content.value) {
      this.props.input.onBlur(result.content.value)
    }
  }

  handleSearchChange(event, { value }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    this.props.input.onChange(value)
  }

  render() {
    const {
      controlledValue,
      errorScope,
      helpText,
      input,
      label,
      meta,
      required,
      translate,
      ...rest
    } = this.props

    const { value } = input

    return (
      <SearchInputWithResults
        errorScope={errorScope}
        handleResultSelect={this.handleResultSelect}
        handleSearchChange={this.handleSearchChange}
        helpText={helpText}
        input={{
          name: input.name,
          value: translate({
            textKey: `modules.collectionMammals.featureObservations.${value}`,
          }),
        }}
        label={label}
        meta={meta}
        required={required}
        resultRenderer={TranslateSearchResult}
        results={results}
        {...rest}
      />
    )
  }
}

FeatureTypeNameSearch.propTypes = propTypes
FeatureTypeNameSearch.defaultProps = defaultProps

export default withTranslate(FeatureTypeNameSearch)
