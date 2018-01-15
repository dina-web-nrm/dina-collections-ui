/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import 'semantic-ui/dist/semantic.css' // eslint-disable-line
import setupStorybookComponent from 'utilities/test/setupStorybookComponent'
import MarkdownToHtmlAsync from './MarkdownToHtmlAsync'

storiesOf('coreModules/i18n/MarkdownToHtmlAsync', module).add('Default', () => {
  return setupStorybookComponent({
    component: <MarkdownToHtmlAsync markdown="# This is a markdown header" />,
  })
})
