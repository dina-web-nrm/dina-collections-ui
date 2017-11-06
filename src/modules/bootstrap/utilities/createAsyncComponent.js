import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default function createAsyncComponent(loadModule) {
  const contextTypes = {
    store: PropTypes.object,
  }

  class AsyncLoader extends Component {
    constructor(props) {
      super(props)
      this.state = { FetchedComponent: null }
    }

    componentDidMount() {
      loadModule().then(({ default: FetchedComponent, modules }) => {
        if (modules) {
          const store = this.context.store
          store.registerModules(modules)
        }

        this.setState({
          FetchedComponent,
        })
      })
    }

    render() {
      const { FetchedComponent } = this.state
      if (FetchedComponent) {
        return <FetchedComponent {...this.props} />
      }

      return <p>Loading component</p>
    }
  }

  AsyncLoader.contextTypes = contextTypes
  return AsyncLoader
}
