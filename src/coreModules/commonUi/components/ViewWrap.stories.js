/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import ViewWrap from './ViewWrap'

storiesOf('coreModules/commonUi/ViewWrap', module).add('Default', () => {
  return setupTestComponent({
    component: (
      <ViewWrap>
        <div>View wrap content</div>
      </ViewWrap>
    ),
    mount: false,
  })
})
