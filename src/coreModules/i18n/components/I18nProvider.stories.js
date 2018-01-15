/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import I18nProvider from './I18nProvider'

storiesOf('coreModules/i18n/I18nProvider', module).add('Default', () => {
  return setupTestComponent({
    component: (
      <I18nProvider>
        <div>Child node</div>
      </I18nProvider>
    ),
    mount: false,
  })
})
