/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import TranslatedLabel from './TranslatedLabel'

storiesOf('coreModules/commonUi/TranslatedLabel', module).add('Default', () => {
  return setupTestComponent({
    component: (
      <TranslatedLabel color="green" textKey="key-without-translations" />
    ),
    mount: false,
  })
})
