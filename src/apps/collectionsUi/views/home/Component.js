import React from 'react'

import { Markdown, Translate } from 'modules/i18n/components'
import PageTemplate from 'modules/commonUi/components/PageTemplate'

const Home = () => (
  <PageTemplate>
    <h1>Home</h1>
    <h2>
      <Translate textKey="modules.home.regularTranslation" />
    </h2>
    <p>
      <Translate textKey="modules.home.body" />
    </p>
    <h2>
      <Translate textKey="modules.home.markdownTranslation" />
    </h2>
    <Markdown textKey="modules.home.introduction.hero" />
  </PageTemplate>
)

export default Home
