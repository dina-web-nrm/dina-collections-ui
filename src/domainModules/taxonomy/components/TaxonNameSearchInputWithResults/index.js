import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import SearchInputWithResults from 'coreModules/form/components/SearchInputWithResults'
import TaxonNameSearchResult from '../TaxonNameSearchResult'
import globalSelectors from '../../globalSelectors'
import {
  clearTaxonSearch,
  updateTaxonSearchFilterName,
} from '../../actionCreators'

const mapStateToProps = state => {
  return {
    taxonSearchName: globalSelectors.getLookupSearchFilterName(state),
    taxonSearchResults: globalSelectors.getLookupResult(state),
    taxonSearchResultsLoading: globalSelectors.getLookupLoading(state),
  }
}

const mapDispatchToProps = { clearTaxonSearch, updateTaxonSearchFilterName }

const propTypes = {
  clearTaxonSearch: PropTypes.func.isRequired,
  errorScope: PropTypes.string,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  required: PropTypes.bool,
  results: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  taxonName: PropTypes.string.isRequired,
  taxonSearchName: PropTypes.string,
  taxonSearchResults: PropTypes.arrayOf(
    PropTypes.shape({
      attributes: PropTypes.shape({
        scientific_name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  taxonSearchResultsLoading: PropTypes.bool.isRequired,
  updateTaxonSearchFilterName: PropTypes.func.isRequired,
}

const defaultProps = {
  errorScope: undefined,
  helpText: undefined,
  label: undefined,
  required: false,
  taxonSearchName: '',
}

class TaxonNameSearchInputWithResults extends Component {
  constructor(props) {
    super(props)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentDidMount() {
    if (this.props.taxonName && !this.props.input.value) {
      this.props.input.onChange(this.props.taxonName)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.taxonName !== nextProps.taxonName) {
      this.props.input.onChange(nextProps.taxonName)
    }
  }

  handleResultSelect(event, { result }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    if (result && result.attributes && result.attributes.scientific_name) {
      this.props.input.onBlur(result.attributes.scientific_name)
      this.props.clearTaxonSearch()
    }
  }

  handleSearchChange(event, { value }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    this.props.updateTaxonSearchFilterName(value)
  }

  render() {
    const {
      errorScope,
      helpText,
      input,
      label,
      meta,
      required,
      taxonName,
      taxonSearchName,
      taxonSearchResults,
      taxonSearchResultsLoading,
      ...rest
    } = this.props

    return (
      <SearchInputWithResults
        errorScope={errorScope}
        handleResultSelect={this.handleResultSelect}
        handleSearchChange={this.handleSearchChange}
        helpText={helpText}
        input={{
          name: input.name,
          value: taxonSearchName || taxonName || '',
        }}
        isLoading={taxonSearchResultsLoading}
        label={label}
        meta={meta}
        required={required}
        resultRenderer={TaxonNameSearchResult}
        results={taxonSearchResults}
        {...rest}
      />
    )
  }
}

TaxonNameSearchInputWithResults.propTypes = propTypes
TaxonNameSearchInputWithResults.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(
  TaxonNameSearchInputWithResults
)
