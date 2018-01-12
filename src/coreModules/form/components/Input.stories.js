/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import { Segment } from 'semantic-ui-react'
import Input from './Input'

storiesOf('coreModules/form/Input', module).add('Default', () => {
  return setupTestComponent({
    component: (
      <Segment size="large" stacked>
        <Input
          input={{}}
          label="This is a label"
          meta={{ touched: false }}
          module="no-module"
          scope="some-scope"
          type="text"
        />
      </Segment>
    ),
    mount: false,
  })
})
