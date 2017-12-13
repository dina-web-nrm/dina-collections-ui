import MarkdownToHtmlAsync from 'coreModules/i18n/components/MarkdownToHtmlAsync'
import React from 'react'
import { Segment } from 'semantic-ui-react'

const specifications = require('dina-schema/build/versions')

const VersionOverview = ({ match }) => {
  const activeVersion = match.params.schemaVersion
  if (!activeVersion) {
    return <div>Unknown version: {match.params.schemaVersion}</div>
  }
  const specification = specifications[match.params.schemaVersion].openApi
  return (
    <div>
      <h2>Version: {activeVersion}</h2>
      <Segment>
        <MarkdownToHtmlAsync markdown={specification.info.versionInfo} />
      </Segment>
    </div>
  )
}

export default VersionOverview
