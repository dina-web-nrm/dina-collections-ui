import React from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react'
import { Markdown } from 'coreModules/i18n/components'

const propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      docName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const GeneralDocs = ({ match }) => {
  const { match: { params: { docName = 'general' } } } = this.props

  return (
    <div>
      <h2>{docName}</h2>
      <Segment>
        <Markdown
          fallbackLanguage="en"
          textKey={`modules.docs.overview.${docName}`}
        />
      </Segment>
    </div>
  )
}
GeneralDocs.propTypes = propTypes

export default GeneralDocs
