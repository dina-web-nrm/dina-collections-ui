/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import ViewWrap from './ViewWrap'

storiesOf('coreModules/commonUi/ViewWrap', module).add('Default', context => {
  return setupStorybookComponent({
    component: (
      <ViewWrap>
        <div>View wrap content</div>
      </ViewWrap>
    ),
    context,
  })
})
