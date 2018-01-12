/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import FormFieldError from './FormFieldError'

storiesOf('coreModules/error/FormFieldError', module).add('Default', () => {
  return setupTestComponent({
    component: (
      <FormFieldError
        error={{
          errorCode: 'SAMPLE_ERROR_CODE',
        }}
        scope="some-scope"
      />
    ),
    mount: false,
  })
})
