import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Markdown } from 'coreModules/i18n/components'

const GeneralDocs = ({ match }) => {
  const docName = match.params.docName || 'general'
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

export default GeneralDocs
