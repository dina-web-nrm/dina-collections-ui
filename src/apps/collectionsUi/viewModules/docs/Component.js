import React, { Component } from 'react'
import { ViewWrap } from 'coreModules/commonUi/components'
import DataModel from 'coreModules/documentation/components/DataModel'

class Docs extends Component {
  render() {
    return (
      <div>
        <ViewWrap>
          <h1>docs</h1>
          <DataModel />
        </ViewWrap>
      </div>
    )
  }
}

export default Docs
