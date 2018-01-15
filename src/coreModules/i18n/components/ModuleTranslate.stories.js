/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import ModuleTranslate from './ModuleTranslate'

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

storiesOf('coreModules/i18n/ModuleTranslate', module)
  .add('Default', () => {
    return setupTestComponent({
      component: <ModuleTranslate module="testModule" textKey="firstName" />,
      initialState,
      mount: false,
    })
  })
  .add('Not existing', () => {
    return setupTestComponent({
      component: <ModuleTranslate module="notExisting" textKey="firstName" />,
      initialState,
      mount: false,
    })
  })
  .add('Multile modules', () => {
    return setupTestComponent({
      component: (
        <ModuleTranslate
          modules={['notExisting', 'testModule']}
          textKey="firstName"
        />
      ),
      initialState,
      mount: false,
    })
  })
