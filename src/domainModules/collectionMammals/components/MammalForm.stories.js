/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import createStoryDecorator from 'utilities/test/createStoryDecorator'
import { action } from '@storybook/addon-actions'
import withInfo from 'utilities/test/customStorybookWithInfo'
import MammalForm from './MammalForm'

storiesOf('domainModules/collectionMammals/MammalForm', module)
  .addDecorator(createStoryDecorator())
  .add(
    'Default',
    withInfo()(() => {
      return (
        <MammalForm
          handleFormSubmit={data => {
            action('handleFormSubmit')(data)
            return Promise.resolve(data)
          }}
        />
      )
    })
  )
