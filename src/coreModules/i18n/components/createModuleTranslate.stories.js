/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
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
  .add('Default', () => {
    const ModuleTranslate = createModuleTranslate('testModule')
    return setupTestComponent({
      component: <ModuleTranslate textKey="firstName" />,
      initialState,
      mount: false,
    })
  })
  .add('Not existing', () => {
    const ModuleTranslate = createModuleTranslate('notExisting')
    return setupTestComponent({
      component: <ModuleTranslate textKey="firstName" />,
      initialState,
      mount: false,
    })
  })
