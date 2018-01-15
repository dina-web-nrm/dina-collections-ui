/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import { Segment } from 'semantic-ui-react'
import DefaultWrapper from './DefaultWrapper'

storiesOf('coreModules/bootstrap/DefaultWrapper', module).add('Default', () => {
  const component = (
    <div>
      <DefaultWrapper>
        <Segment>Wrapped content (DefaultWrapper ensure full height )</Segment>
      </DefaultWrapper>
      <p>After DefaultWrapper</p>
    </div>
  )
  return setupStorybookComponent({
    component,
  })
})
