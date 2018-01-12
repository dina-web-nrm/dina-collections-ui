/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupTestComponent from 'utilities/test/setupTestComponent'
import FormSchemaError from './FormSchemaError'

storiesOf('coreModules/error/FormSchemaError', module).add('Default', () => {
  return setupTestComponent({
    component: (
      <FormSchemaError
        errors={[
          {
            errorCode: 'SAMPLE_ERROR_CODE',
          },
        ]}
        scope="some-scope"
      />
    ),
    mount: false,
  })
})
