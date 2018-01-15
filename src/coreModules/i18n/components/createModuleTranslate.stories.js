/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import createModuleTranslate from './createModuleTranslate'

const initialState = {
  i18n: {
    availableLanguages: ['en', 'sv'],
    defaultLanguage: 'sv',
    language: 'sv',
    translations: {
      modules: {
        testModule: {
          firstName: {
            en: 'first name',
            sv: 'förnamn',
          },
          lastName: {
            en: 'lastname',
            sv: 'efternamn',
          },
        },
      },
    },
  },
}

storiesOf('coreModules/i18n/createModuleTranslate', module)
  .add('Default', context => {
    const ModuleTranslate = createModuleTranslate('testModule')
    return setupStorybookComponent({
      component: <ModuleTranslate textKey="firstName" />,
      context,
      initialState,
    })
  })
  .add('Not existing', context => {
    const ModuleTranslate = createModuleTranslate('notExisting')
    return setupStorybookComponent({
      component: <ModuleTranslate textKey="firstName" />,
      context,
      initialState,
    })
  })
