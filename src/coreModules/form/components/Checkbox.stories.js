/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import Checkbox from './Checkbox'

storiesOf('coreModules/form/Checkbox', module).add('Default', context => {
  return setupStorybookComponent({
    component: (
      <Checkbox
        input={{}}
        meta={{ touched: false }}
        module="no-module"
        scope="some-scope"
        type="checkbox"
      />
    ),
    context,
  })
})
