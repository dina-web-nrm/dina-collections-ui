import React, { Component } from 'react'
import PropTypes from 'prop-types'
import createLog from 'utilities/log'

export default function createSyncView({ modules = [], name, view, Wrapper }) {
  const log = createLog(`modules:bootstrap:createSyncView:${name}`)

  const contextTypes = {
    store: PropTypes.object,
  }

  class SyncLoader extends Component {
    componentWillMount() {
      log.mount('Start')
      const { store } = this.context
      store.registerModules([view, ...modules])
      log.mount('Done')
    }

    componentWillUnmount() {
      log.unmount('Start')
      const { store } = this.context
      store.unregisterModules([view, ...modules])
      log.unmount('Done')
    }

    render() {
      log.render('Render')
      const SyncComponent = view.Component

      if (!Wrapper) {
        return <SyncComponent {...this.props} />
      }
      return <Wrapper>{<SyncComponent {...this.props} />}</Wrapper>
    }
  }

  SyncLoader.contextTypes = contextTypes
  return SyncLoader
}
