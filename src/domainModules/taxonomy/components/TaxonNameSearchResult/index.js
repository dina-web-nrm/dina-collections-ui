import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  attributes: PropTypes.shape({
    scientific_name: PropTypes.string.isRequired,
  }).isRequired,
}

function TaxonomyAutocompleteResult({ attributes }) {
  const scientificName = attributes.scientific_name
  return <div key={scientificName}>{scientificName}</div>
}

TaxonomyAutocompleteResult.propTypes = propTypes

export default TaxonomyAutocompleteResult
