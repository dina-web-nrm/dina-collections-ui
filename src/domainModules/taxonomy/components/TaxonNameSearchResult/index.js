import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  content: PropTypes.shape({
    attributes: PropTypes.shape({
      scientific_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

function TaxonomyAutocompleteResult({ content }) {
  const scientificName =
    content && content.attributes && content.attributes.scientific_name

  return scientificName ? <div>{scientificName}</div> : null
}

TaxonomyAutocompleteResult.propTypes = propTypes

export default TaxonomyAutocompleteResult
