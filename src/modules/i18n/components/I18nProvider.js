import React, { Children, Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import globalSelectors from '../globalSelectors'

const mapStateToProps = state => {
  return {
    language: globalSelectors.getLanguage(state),
    markdown: globalSelectors.getMarkdown(state),
    translations: globalSelectors.getTranslations(state),
  }
}
const childContextTypes = {
  language: PropTypes.string.isRequired,
  markdown: PropTypes.object.isRequired,
  translations: PropTypes.object.isRequired,
}
const propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.string.isRequired,
  markdown: PropTypes.object.isRequired,
  translations: PropTypes.object.isRequired,
}

class I18nProvider extends Component {
  getChildContext() {
    const { language, markdown, translations } = this.props
    return { language, markdown, translations }
  }

  render() {
    return (
      <div key={this.props.language}>{Children.only(this.props.children)}</div>
    )
  }
}

I18nProvider.childContextTypes = childContextTypes
I18nProvider.propTypes = propTypes

export default connect(mapStateToProps)(I18nProvider)
