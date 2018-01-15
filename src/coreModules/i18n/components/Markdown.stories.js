/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import Markdown from './Markdown'

const initialState = {
  i18n: {
    availableLanguages: ['en', 'sv'],
    defaultLanguage: 'sv',
    language: 'sv',
    markdown: {
      example: {
        en: '<p>This is compiled markdown</p>',
        sv: '<p>Detta är kompilerad markdown</p>',
      },
      otherExample: {
        en: '<p>This is compiled markdown in fallback language en</p>',
      },
    },
  },
}

storiesOf('coreModules/i18n/Markdown', module)
  .add('Default', () => {
    return setupStorybookComponent({
      component: <Markdown textKey="example" />,
      initialState,
    })
  })
  .add('Fallback language', () => {
    return setupStorybookComponent({
      component: <Markdown fallbackLanguage="en" textKey="otherExample" />,
      initialState,
    })
  })
