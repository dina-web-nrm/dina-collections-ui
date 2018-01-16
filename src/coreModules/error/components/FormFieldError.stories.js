/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import FormFieldError from './FormFieldError'

storiesOf('coreModules/error/FormFieldError', module).add(
  'Default',
  context => {
    return setupStorybookComponent({
      component: (
        <FormFieldError
          error={{
            errorCode: 'SAMPLE_ERROR_CODE',
          }}
          scope="some-scope"
        />
      ),
      context,
    })
  }
)
