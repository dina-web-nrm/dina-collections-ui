/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import LanguageSelect from './LanguageSelect'

storiesOf('coreModules/i18n/LanguageSelect', module)
  .add('Default', () => {
    return setupTestComponent({
      component: <LanguageSelect />,
      mount: false,
    })
  })
  .add('Green color', () => {
    return setupTestComponent({
      component: <LanguageSelect color="green" />,
      mount: false,
    })
  })
