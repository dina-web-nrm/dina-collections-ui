/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import LanguageSelect from './LanguageSelect'

storiesOf('coreModules/i18n/LanguageSelect', module)
  .add('Default', () => {
    return setupStorybookComponent({
      component: <LanguageSelect />,
    })
  })
  .add('Green color', () => {
    return setupStorybookComponent({
      component: <LanguageSelect color="green" />,
    })
  })
